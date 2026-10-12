# Verification

Initial verification, 12 October 2026:

- Twelve Python unit tests passed, covering background-change adjustment, negative effects, equal control weights, unsupported comparisons, duplicate data and invalid inputs.
- Standalone map JavaScript passed syntax checks.
- Embedded GeoJSON parsed successfully with 453 features and finite coordinates.
- All local map links and the offline D3 asset were checked.
- The earlier map projection was visually reviewed at phone width; label placement was adjusted to fit.

The complete standalone page has not undergone browser runtime or accessibility testing in this environment. Verify at 320px, 360px and desktop widths before public release, including legend selection, keyboard focus, dark mode and offline loading.

No historical dataset, calibrated impact estimate, route ETA, uncertainty interval or notification delivery has been verified. Synthetic test fixtures are arithmetic checks, not Brent Cross measurements.
