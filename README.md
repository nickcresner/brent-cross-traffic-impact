# Brent Cross Traffic Impact

A geospatial portfolio project by **Nick Cresner** investigating how the A41 Brent Cross flyover renewal affects neighbouring roads and local journeys.

**Research question:** How much additional journey time is associated with the works, where does it spread, and how does it change by time of day and construction phase?

**Status: animated prototype and research foundation, 12 October 2026.** A seven-mile road-network map has time playback, a time slider and selectable road points. Its initial values are explicitly simulated, not local traffic observations. The restriction map, reproducible exploratory analysis pipeline and study protocol are included. This project has no measured traffic-impact findings or live journey predictions yet.

## Explore the map

Open `web/index.html` in a browser. Play the illustrative day from 06:00–22:00 or move the time slider. Road points change size and category with travel time relative to a reference, and missing data remains visible. Load an eligible observation JSON file locally to replace the simulation; see [the time-series contract](docs/time-series.md).

The animation covers a geodesic seven-mile radius around Brent Cross using sourced OS Open Roads geometry. The boundary is a study extent, not evidence that the works affect every road inside it. `web/restrictions.html` retains the dated restriction map. No account, build step or traffic API key is needed; both maps run offline using vendored D3.

The simulation's generic curves and distance lag demonstrate an interface, not a calibrated model of actual traffic propagation. Circle size represents travel-time slowdown, not vehicle volume. This is an independent project, not a TfL service.

## Run the analysis

Python 3.10+; no third-party packages required:

```bash
python -m unittest discover -s tests -v
node --test tests/test-traffic-series.cjs
python analysis/estimate_impact.py --input path/to/observations.csv --output data/derived/impact.json --min-samples 5
```

Use the schema in [data/README.md](data/README.md). Do not substitute illustrative data for measured observations. The command produces exploratory, matched, controlled before/after differences. It does not establish causality or produce calibrated uncertainty intervals. Invalid records fail validation; unsupported comparisons are reported rather than treated as zero delay.

## Portfolio skills

- Geographic data extraction, provenance and GeoJSON geometry.
- Accessible, responsive cartography with D3 geographic projection.
- Time- and direction-specific traffic analysis.
- Study design, comparison-road selection and explicit uncertainty.
- Reproducible Python processing and automated validation.
- Translation of analysis into a useful community-facing service.

## Research plan

Start with the [step-by-step data-acquisition plan](docs/next-steps.md). The [seven-mile study boundary](data/study-area.geojson) is available as GeoJSON for provider requests.

1. Obtain an eligible TomTom Traffic Stats historical extract and assess local sample coverage.
2. Request TfL's works-phase traffic assessment, monitoring and traffic-management schedule.
3. Compare matched term-time periods before and after restrictions, flagging confounding events.
4. Validate comparison-road trends and exclude diversion spillover.
5. Publish road- and journey-level results with uncertainty and coverage.
6. Add live routing and arrival-time advice, calibrated against actual local journeys.

See [methodology](docs/methodology.md), [data sources](docs/data-sources.md), [roadmap](docs/roadmap.md) and [portfolio brief](docs/portfolio-brief.md).

## Project structure

```text
analysis/        Validated CSV-to-JSON exploratory estimator
tests/           Behaviour and data-quality checks
web/             Animated seven-mile map and restriction map
data/            Observation contract; raw and derived data ignored
docs/            Research protocol, sources and delivery milestones
```

## Sources and attribution

Restrictions: [TfL travel advice](https://tfl.gov.uk/brent-cross-flyover), verified 12 October 2026. Project duration and phases: [TfL renewal project](https://tfl.gov.uk/travel-information/improvements-and-projects/brent-cross-flyover-renewals).

Street geometry © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), obtained via the OSM map API on 12 October 2026 and converted to GeoJSON. The supplied geometry is governed by ODbL; the original geometry export covers approximately longitude −0.235 to −0.214 and latitude 51.566 to 51.583, with complete intersecting ways extending beyond that area. Work-zone extents are indicative.

The wide-area basemap uses OS Open Roads from a public ArcGIS mirror with stated data currency October 2019, retrieved 12 October 2026. Contains OS data © Crown copyright and database right 2019, used under the Open Government Licence. It provides generalised cartographic context, not current lane restrictions or turn-by-turn routing. Source and extraction details are in [data sources](docs/data-sources.md).

Code is MIT licensed. Data retains its source licence. D3 7.9.0 is ISC licensed; its licence is included alongside the vendored library.
