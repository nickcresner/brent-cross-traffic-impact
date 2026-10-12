# Next steps: replace the demonstration with observations

Updated 12 October 2026. Study extent: seven miles (11,265.408 metres) around Brent Cross. The larger area is a research boundary; it does not imply a measured impact throughout that area.

## First action

Create or sign into a [TomTom MOVE account](https://move.tomtom.com/). TomTom advertises a 30-day Traffic Stats trial in its [product introduction](https://docs.tomtom.com/traffic-stats/documentation/product-information/introduction). Check the products visible in your account before requesting a large extract or paying. An ordinary live-routing API key does not by itself provide historical analytics access.

Confirm access to historical **Area Analysis** for speed/travel time and **Traffic Volume** for estimated vehicle passages. Ask whether the trial includes both, whether September–October 2026 data is available for UK local roads, and whether you may publish derived map layers and portfolio screenshots. The project's [study-area GeoJSON](../data/study-area.geojson) is a ready-to-use area boundary, subject to the provider's import format requirements. Keep credentials out of chat and GitHub.

## Small pilot before a full-area download

Start with the A41 approaches and representative sections of the A406, A5, A1 and one local diversion corridor. Obtain comparable weekday morning and evening periods before and after the restrictions, separated by direction. Proposed exploratory dates are 7–25 September and 1–8 October 2026. Check the actual restriction and preparatory-work dates, holidays, incidents, weather and other works before treating those dates as a usable baseline.

Request daily observations rather than only one pooled average. Retain:

| Field | Why it matters |
| --- | --- |
| Stable segment ID, direction and geometry/map version | Match the same road and travel direction over time |
| Date, interval start/end and explicit UTC offset | Animate the correct local time, including clock changes |
| Speed and travel time with units | Measure slowdown and delay |
| Coverage/sample counts and provider quality flags | Show weak or missing evidence |
| Estimated total vehicle passages per hour, if licensed | Represent traffic volume separately from speed |
| Provider methods and redistribution permissions | Explain what the map can claim and what can be published |

TomTom's [Traffic Volume documentation](https://docs.tomtom.com/traffic-stats/documentation/api/traffic-volume) describes modelled vehicle passages using probe data and other inputs. GPS sample counts are not the total volume of vehicles. Confirm whether the export is exact-date/hour volume or a typical annual weekday profile; they answer different questions.

## Parallel free-data route

Use [DfT traffic-count downloads](https://roadtraffic.dft.gov.uk/downloads) for historical count context and available validation sites. They do not provide current minute-by-minute congestion across every local road. Request TfL's monitoring-site inventory, dated baseline/post-start counts, journey-time monitoring, works-phase register and traffic-impact assessment. The project has not sent that request. Also replace the demonstration's 2019 classified-road mirror with a current network including minor streets.

## Turn the pilot into a defensible portfolio result

1. Audit coverage and align dates, directions and map versions. Record missing observations explicitly.
2. Plot observed speeds and journey-time changes first. Expand collection to the seven-mile extent only after the pilot is usable.
3. Compare matched periods and suitable control roads. Check pre-work trends and diversion spillover; a before/after difference alone cannot establish the exact roadworks effect.
4. Validate against available counters and local journey measurements. Publish uncertainty and coverage alongside results.
5. Add a separate volume layer. Any moving-dot reconstruction or inferred queue between observations must be labelled as modelled, rather than showing dots as individually observed cars.

Appointment departure advice is a later milestone: it needs traffic-aware route-level predictions, observed prediction errors and a chosen reliability target. A seven-mile slowdown map alone cannot provide reliable appointment arrival times.

## First deliverable and acceptance

One licensed, documented pilot extract; a coverage map; an observed weekday timeline for selected roads; and a before/after comparison labelled as exploratory. No measured impact claim or real departure recommendation is supported by the current synthetic demonstration.
