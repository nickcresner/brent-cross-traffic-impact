"""Synthetic fixtures verify arithmetic and rejection behaviour, not local findings."""
import unittest
from analysis.estimate_impact import estimate


def observation(segment, group, period, seconds, samples=10, band="08:00-09:00"):
    return dict(segment_id=segment, group=group, period=period, travel_time_s=str(seconds),
                sample_size=str(samples), weekday="MON", time_band=band, direction="WB")


def panel():
    return [observation("local", "treated", "pre", 300), observation("local", "treated", "post", 600),
            observation("comparison", "control", "pre", 200), observation("comparison", "control", "post", 260)]


class ImpactTests(unittest.TestCase):
    def test_subtracts_background_change(self):
        result = estimate(panel())
        self.assertEqual(result["results"][0]["exploratory_adjusted_change_s"], 240)
        self.assertEqual(result["results"][0]["observed_change_s"], 300)
        self.assertIsNone(result["uncertainty_intervals"])

    def test_negative_effect_is_preserved(self):
        rows = panel()
        rows[1]["travel_time_s"] = "250"
        self.assertEqual(estimate(rows)["results"][0]["exploratory_adjusted_change_s"], -110)

    def test_controls_use_equal_weights(self):
        rows = panel() + [observation("other", "control", "pre", 200, 100), observation("other", "control", "post", 300, 100)]
        self.assertEqual(estimate(rows)["results"][0]["exploratory_adjusted_change_s"], 220)

    def test_missing_control_pair_prevents_estimate(self):
        result = estimate(panel()[:-1])
        self.assertFalse(result["results"])
        self.assertIn("no_eligible_matched_controls", [x["reason"] for x in result["exclusions"]])

    def test_low_sample_control_prevents_estimate(self):
        rows = panel()
        rows[-1]["sample_size"] = "1"
        self.assertFalse(estimate(rows)["results"])

    def test_unmatched_time_bands_not_compared(self):
        rows = panel()
        for row in rows[2:]:
            row["time_band"] = "09:00-10:00"
        self.assertFalse(estimate(rows)["results"])

    def test_duplicate_rejected(self):
        with self.assertRaises(ValueError):
            estimate(panel() + [panel()[0]])

    def test_bad_duration_rejected(self):
        for bad in ["nan", "inf", "-2", "0"]:
            with self.subTest(bad=bad), self.assertRaises(ValueError):
                rows = panel()
                rows[0]["travel_time_s"] = bad
                estimate(rows)

    def test_bad_band_rejected(self):
        for bad in ["24:00-25:00", "09:00-08:00", "8am", "23:00-24:01"]:
            with self.subTest(bad=bad), self.assertRaises(ValueError):
                rows = panel()
                rows[0]["time_band"] = bad
                estimate(rows)

    def test_invalid_sample_rejected(self):
        rows = panel()
        rows[0]["sample_size"] = "0.5"
        with self.assertRaises(ValueError):
            estimate(rows)

    def test_conflicting_groups_rejected(self):
        rows = panel()
        rows[1]["group"] = "control"
        with self.assertRaises(ValueError):
            estimate(rows)

    def test_empty_input_rejected(self):
        with self.assertRaises(ValueError):
            estimate([])


if __name__ == "__main__":
    unittest.main()
