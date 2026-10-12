# Brent Cross Traffic Impact

A geospatial portfolio project by **Nick Cresner** investigating how the A41 Brent Cross flyover renewal affects neighbouring roads and local journeys.

**Research question:** How much additional journey time is associated with the works, where does it spread, and how does it change by time of day and construction phase?

**Status: project foundation, 12 October 2026.** The restriction map works. A reproducible exploratory analysis pipeline and study protocol are included. Historical traffic observations, a validated attribution model and a live journey planner are not yet available. This project has no measured traffic-impact findings.

## Explore the map

Open `web/index.html` in a browser. It includes sourced OpenStreetMap street geometry, three numbered restriction areas, dates and a legend. No account, build step or traffic API key is needed. It runs offline using a vendored D3 library.

The map shows a dated restriction snapshot, not current traffic speeds or a forecast of two years of unchanged congestion. It is an independent project, not a TfL service.

## Run the analysis

Python 3.10+; no third-party packages required:

```bash
python -m unittest discover -s tests -v
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
web/             Standalone restriction map
data/            Observation contract; raw and derived data ignored
docs/            Research protocol, sources and delivery milestones
```

## Sources and attribution

Restrictions: [TfL travel advice](https://tfl.gov.uk/brent-cross-flyover), verified 12 October 2026. Project duration and phases: [TfL renewal project](https://tfl.gov.uk/travel-information/improvements-and-projects/brent-cross-flyover-renewals).

Street geometry © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), obtained via the OSM map API on 12 October 2026 and converted to GeoJSON. The supplied geometry is governed by ODbL; the original geometry export covers approximately longitude −0.235 to −0.214 and latitude 51.566 to 51.583, with complete intersecting ways extending beyond that area. Work-zone extents are indicative.

Code is MIT licensed. Data retains its source licence. D3 7.9.0 is ISC licensed; its licence is included alongside the vendored library.
