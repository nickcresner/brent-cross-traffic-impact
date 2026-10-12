"""Matched controlled before/after differences, not a validated causal model."""
import argparse
import csv
import json
import math
import re
from collections import defaultdict
from pathlib import Path
from statistics import mean

FIELDS = {"segment_id", "group", "period", "weekday", "time_band", "direction", "travel_time_s", "sample_size"}
WEEKDAYS = {"MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"}


def validate_band(band):
    match = re.fullmatch(r"(\d{2}):(\d{2})-(\d{2}):(\d{2})", band)
    if not match:
        raise ValueError("time_band must be HH:MM-HH:MM")
    h1, m1, h2, m2 = map(int, match.groups())
    if not (0 <= h1 < 24 and 0 <= m1 < 60 and 0 <= h2 <= 24 and 0 <= m2 < 60):
        raise ValueError("invalid time_band clock time")
    if (h2 == 24 and m2 != 0) or h1 * 60 + m1 >= h2 * 60 + m2:
        raise ValueError("time_band must increase within one day")


def estimate(rows, min_samples=5):
    if not isinstance(min_samples, int) or min_samples < 1:
        raise ValueError("min_samples must be a positive integer")
    pairs = defaultdict(dict)
    segment_groups = {}
    count = 0
    for number, row in enumerate(rows, start=2):
        if not FIELDS.issubset(row):
            raise ValueError(f"row {number}: missing required columns")
        row = {key: str(row[key]).strip() if row[key] is not None else "" for key in FIELDS}
        if row["group"] not in {"treated", "control"} or row["period"] not in {"pre", "post"}:
            raise ValueError(f"row {number}: invalid group or period")
        if not row["segment_id"] or not row["direction"] or row["weekday"] not in WEEKDAYS:
            raise ValueError(f"row {number}: invalid segment, direction or weekday")
        validate_band(row["time_band"])
        duration = float(row["travel_time_s"])
        if not math.isfinite(duration) or duration <= 0:
            raise ValueError(f"row {number}: travel time must be finite and positive")
        if not re.fullmatch(r"\d+", row["sample_size"]):
            raise ValueError(f"row {number}: sample_size must be a nonnegative integer")
        samples = int(row["sample_size"])
        segment = row["segment_id"]
        if segment in segment_groups and segment_groups[segment] != row["group"]:
            raise ValueError(f"row {number}: segment has conflicting groups")
        segment_groups[segment] = row["group"]
        key = (segment, row["group"], row["weekday"], row["time_band"], row["direction"])
        if row["period"] in pairs[key]:
            raise ValueError(f"row {number}: duplicate aggregate for segment and stratum")
        pairs[key][row["period"]] = (duration, samples)
        count += 1
    if not count:
        raise ValueError("no observations supplied")

    eligible, exclusions = {}, []
    for key, periods in sorted(pairs.items()):
        reason = None
        if set(periods) != {"pre", "post"}:
            reason = "missing_pre_or_post"
        elif min(value[1] for value in periods.values()) < min_samples:
            reason = "insufficient_samples"
        if reason:
            exclusions.append({"segment_id": key[0], "stratum": list(key[2:]), "reason": reason})
        else:
            eligible[key] = periods

    controls = defaultdict(list)
    for key, periods in eligible.items():
        if key[1] == "control":
            controls[key[2:]].append((key[0], periods["post"][0] - periods["pre"][0]))
    results = []
    for key, periods in sorted(eligible.items()):
        if key[1] != "treated":
            continue
        matched = controls.get(key[2:], [])
        if not matched:
            exclusions.append({"segment_id": key[0], "stratum": list(key[2:]), "reason": "no_eligible_matched_controls"})
            continue
        change = periods["post"][0] - periods["pre"][0]
        comparison_change = mean(item[1] for item in matched)
        results.append({
            "segment_id": key[0], "weekday": key[2], "time_band": key[3], "direction": key[4],
            "pre_travel_time_s": periods["pre"][0], "post_travel_time_s": periods["post"][0],
            "observed_change_s": change, "comparison_change_s": comparison_change,
            "exploratory_adjusted_change_s": change - comparison_change,
            "control_segment_ids": [item[0] for item in matched],
            "pre_sample_size": periods["pre"][1], "post_sample_size": periods["post"][1],
        })
    return {
        "status": "exploratory_not_causally_validated", "units": "seconds", "min_samples": min_samples,
        "uncertainty_intervals": None,
        "limitations": ["Pre-trends and diversion spillover require separate validation.",
                        "Aggregate input cannot support calibrated uncertainty intervals.",
                        "No results is insufficient evidence, not zero impact."],
        "results": results, "exclusions": exclusions,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--min-samples", type=int, default=5)
    args = parser.parse_args()
    try:
        with args.input.open(newline="", encoding="utf-8-sig") as stream:
            result = estimate(csv.DictReader(stream), args.min_samples)
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(result, indent=2, allow_nan=False) + "\n", encoding="utf-8")
    except (ValueError, OSError) as error:
        parser.exit(2, f"Input/output error: {error}\n")
    print(f"{len(result['results'])} estimates; {len(result['exclusions'])} excluded comparisons. Written to {args.output}")


if __name__ == "__main__":
    main()
