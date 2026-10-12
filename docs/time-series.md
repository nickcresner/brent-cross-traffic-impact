# Animated point layer

The animation is a **synthetic interaction prototype**. Its commuter-shaped curves are not fitted to Brent Cross and do not establish local rush-hour timing, current speeds, traffic volume or the roadworks' contribution. The invented numeric values demonstrate the interface only. Observation-point locations are selected from sourced OSM road geometry, not actual sensors.

Fixed points represent road-segment travel times at successive time steps. Circle area increases with travel-time ratio relative to the reference. Colour and text identify slowdown categories. Missing values are hollow points labelled “No observation”; they are not interpreted as clear roads. There are no animated individual vehicles or implied tracked journeys.

## Playback

Play/Pause advances through a single timeline and stops at its end. The time slider and point selector support keyboard and touch users. Changing time manually pauses playback. Display times use Europe/London, while source timestamps use explicit offsets to preserve chronological ordering. The default example covers 06:00–22:00 in 15-minute steps. Reduced-motion preferences disable shape transitions; playback remains user-initiated.

## Loading observations

Use the local JSON file input in the map. Files are processed in the browser, not uploaded to a server. A maximum 2 MB file is accepted. Validation checks the source, kind, local extent, IDs, times, values and timeline limits. An “observed” label is supplied by the importer and is not independent verification. Check data provenance and permission before distributing a dataset.

```json
{
  "version": 1,
  "kind": "observed",
  "source": "Name and version of licensed extract",
  "timezone": "Europe/London",
  "points": [{
    "id": "segment-and-direction",
    "name": "Road name and direction",
    "coordinates": [-0.22, 51.58]
  }],
  "frames": [{
    "timestamp": "2026-10-12T08:00:00+01:00",
    "values": {
      "segment-and-direction": {
        "travel_time_s": 120,
        "reference_time_s": 60,
        "sample_size": 15
      }
    }
  }]
}
```

The numbers above illustrate the schema and are not measurements. `sample_size` may be null when count coverage is unknown; normalised coverage must not be inserted as a count. Missing keys or null values indicate missing observations. Supply actual segment-level reference travel times and document whether they represent free flow or a matched normal-day baseline. The display calls this a **reference**, so it cannot accidentally claim a works-attributable delay.

The supported extent is a geodesic seven-mile radius (11,265.408 m) around longitude −0.2183801, latitude 51.5767595, the sourced OSM Brent Cross interchange point. Imported points are checked against that distance. The radius is the study boundary, not a measured impact boundary. Imported source labels and names are inserted as plain text. Observed timelines display the date alongside local time.

The revised demo uses generic commuter-shaped curves with a distance-dependent lag to illustrate changing intensity farther from the centre. This is explicitly not a road-network traffic-assignment or queue model. Point locations are sampled from the OS Open Roads geometries and retain source identifiers. Real propagation patterns will need measured time-series observations by road and direction.
