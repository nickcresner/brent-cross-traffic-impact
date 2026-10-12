# Study protocol

Version 0.1 · 12 October 2026 · Proposed methodology; no impact results yet.

## Scope and phase register

Start with the A41/A406 interchange and surrounding Hendon, Golders Green, Finchley, Cricklewood and Staples Corner network. Expand observation boundaries when queues or diversion effects reach the edge; a fixed radius is not an impact boundary.

Use the actual restriction implementation times. TfL currently identifies 30 September 2026 as the works start. Audit earlier surveys and preparatory restrictions before choosing a baseline. Record every subsequent lane layout, closure and traffic-signal change. A pause in construction is not necessarily removal of restrictions and cannot automatically serve as a no-works experiment.

## Observations

Obtain historical speed and travel-time data for both directions and matched weekday/time bands. Use several comparable term-time weeks before the restrictions and sufficient post-change weeks. Add same-season prior-year evidence where available, while checking changes in demand and road layout.

Track sample coverage, source map version and segment matching. Use a common segment definition or length-normalised rates when geometry changes; split or merged segments must not be joined by name alone. Keep licensed extracts outside the public repository.

## Confounders

Record other roadworks, incidents, weather, school and public holidays, locally important holidays and large events. Flag or model these consistently. Changes in route choice and departure time are part of the network response and should be measured separately from fixed-route delay.

## Estimating the additional effect

First publish observed before/after changes with no causal label. Then compare those changes with a weighted set of candidate roads that had similar pre-work trends and are unlikely to receive diverted traffic. Nearby roads are not automatically valid controls.

For a matched weekday/time/direction stratum, the exploratory estimator is:

`estimated difference = (local post − local pre) − (comparison post − comparison pre)`

Causal interpretation requires credible comparable trends, absence of substantial spillover and suitable handling of concurrent shocks. Test sensitivity to baseline weeks, alternative controls, exclusions and segment matching. Use a longer observation panel and placebo dates before making attribution claims. A poor comparison group can make a precise-looking result misleading.

## Starter estimator limitations

`analysis/estimate_impact.py` validates paired segment observations and computes the formula above. It uses equal weighting across eligible comparison segments within each stratum. It reports unsupported treated strata separately. Provider sample size is used as a coverage threshold, not as a population vehicle count or a weighting scheme.

Input records are aggregate pre/post values, so this scaffold cannot test pre-trends, estimate clustered uncertainty, model traffic assignment or establish causality. The next analysis version should retain daily/weekly observations, estimate uncertainty by appropriate time/segment clustering and reserve periods for validation. Do not derive a route percentile by summing road-segment percentiles.

## Metrics and public communication

- Additional minutes and percentage change by segment and matched time.
- Journey-level typical and high-percentile durations from route observations.
- Coverage, uncertainty and eligibility for attribution.
- Estimated geographic footprint by time band, with uncertainty at its edge.
- Optional total vehicle-hours only when appropriate traffic volumes are available; floating-car sample counts alone are insufficient.

## Forecasting and appointment advice

Use a calibrated network model for future construction scenarios, including junction capacity and route redistribution. Validate it against independent journey times and counts. Recalibrate after phase changes and changing driver behaviour.

Arrival-time advice uses traffic at the proposed departure, plus parking/walking time and an explicit safety margin. Measure achieved on-time arrival and forecast error. Live routing services need not share the same licence as historical analytics; verify display, caching and derivative-publication rights before public release.

## References

- [DfT highway assignment modelling guidance](https://www.gov.uk/government/publications/tag-unit-m3-1-highway-assignment-modelling)
- [HM Treasury evaluation quality guidance](https://www.gov.uk/government/publications/the-magenta-book/quality-in-policy-impact-evaluation-qpie-html)
- [TomTom historical traffic statistics](https://docs.tomtom.com/traffic-stats/documentation/product-information/introduction)
