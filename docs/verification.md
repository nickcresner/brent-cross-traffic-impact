# Verification

Initial verification, 12 October 2026:

- Twelve Python unit tests passed, covering background-change adjustment, negative effects, equal control weights, unsupported comparisons, duplicate data and invalid inputs.
- Standalone map JavaScript passed syntax checks.
- Embedded GeoJSON parsed successfully with 453 features and finite coordinates.
- All local map links and the offline D3 asset were checked.
- The earlier map projection was visually reviewed at phone width; label placement was adjusted to fit.

The complete standalone page has not undergone browser runtime or accessibility testing in this environment. Verify at 320px, 360px and desktop widths before public release, including legend selection, keyboard focus, dark mode and offline loading.

No historical dataset, calibrated impact estimate, route ETA, uncertainty interval or notification delivery has been verified. Synthetic test fixtures are arithmetic checks, not Brent Cross measurements.

## Animated five-mile view — 12 October 2026

- Twelve Python tests and eight Node timeline/data-validation tests passed.
- Animation scripts passed syntax checks; 65 synthetic frames validated across all 89 sample points.
- Wide-area source data contains 5,508 classified road links grouped into 448 MultiLineString features. Pagination and five-mile filtering are documented.
- Geographic projections and representative morning frames were visually inspected using an independent static rendering at phone and desktop widths. Point radii were adjusted for narrow screens; labels render above the point layer.
- No browser runtime test was available. Play/Pause, slider behaviour, file input, screen-reader announcements and mobile interactions still require browser QA before a public release.
- The wide-area OS basemap is a 2019 mirror, not a current routing network. Demo curves are synthetic and have not been calibrated against local congestion.
