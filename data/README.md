# Observation contract

No measured traffic observations are included. Raw and derived folders are ignored by Git. Road geometry is separately embedded in `web/index.html` under OSM attribution.

The starter estimator accepts UTF-8 CSV with these headers:

```csv
segment_id,group,period,weekday,time_band,direction,travel_time_s,sample_size
```

| Field | Contract |
| --- | --- |
| segment_id | Stable source segment identifier; common geometry in pre/post |
| group | `treated` or `control`; candidate designation, not proof of exposure |
| period | `pre` or `post`; exactly one aggregate per segment and stratum per period |
| weekday | `MON`, `TUE`, `WED`, `THU`, `FRI`, `SAT`, `SUN` |
| time_band | Local Europe/London `HH:MM-HH:MM`, increasing, within one day |
| direction | Stable nonempty direction label, consistent pre/post |
| travel_time_s | Finite, positive aggregate duration in seconds |
| sample_size | Nonnegative integer observation count; not total traffic volume |

Supplier normalised sample coverage is not an observation count. If only normalised coverage is supplied, extend the contract and eligibility rule rather than fabricating a count. Daylight-saving timestamps must be resolved before aggregation.

Pairs must match on segment, weekday, time band and direction. The minimum sample threshold applies to both periods. Treated and comparison segments must match weekday/time/direction; candidate controls use equal weighting. Missing pairs and unsupported strata are excluded with explicit reasons.

Record source date ranges, units, map version, extraction settings, exclusion rules and licence in a sidecar manifest. The current estimator does not ingest the sidecar, so this must be reviewed separately. Route-level inputs and repeated daily observations will need a richer schema in the next milestone.
