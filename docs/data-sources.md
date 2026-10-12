# Data sources and access

Last checked: 12 October 2026.

| Source | Purpose | Current project status |
| --- | --- | --- |
| TfL flyover travel advice | Dated lane restrictions and closure phases | Verified snapshot incorporated in map |
| OpenStreetMap map API | Local road geometry and landmarks | Embedded in map; attribution and ODbL apply |
| TomTom Traffic Stats | Historical speed/travel-time observations and coverage | Access/export required; no observations acquired |
| TfL traffic assessments and monitoring | Existing modelling, counts, phasing and mitigation | Not located publicly; request required |
| TomTom or HERE routing | Future traffic-aware arrival-time planner | Not connected |

## Historical data acquisition

TomTom documents a 30-day Traffic Stats trial through [MOVE](https://move.tomtom.com/). Check current trial limits, recent-date availability, local coverage and permission to publish derived results. Historical analytics access is separate from an ordinary live-routing API key. Start with a small area and a few matched periods before buying broader access.

Request an extract with segment IDs, directions, geometry/map version, date ranges, weekday/time bands, travel times, sample coverage and route-level travel-time percentiles. Retain daily or weekly observations for uncertainty estimation, rather than only two pooled averages.

## Proposed request to TfL

Ask for the Brent Cross flyover renewals traffic-impact assessment and model outputs; the actual phased restriction programme; baseline and post-start traffic counts, journey times and queue monitoring; assumptions about displaced traffic; and planned signal or diversion mitigation. Include dates, units and geographic coverage. This request has not been sent.

## Provenance and licensing

The map geometry was downloaded from `https://api.openstreetmap.org/api/0.6/map?bbox=-0.235,51.566,-0.214,51.583` on 12 October 2026. Complete intersecting ways may extend beyond the request box. Converted GeoJSON preserves source way IDs and WGS84 longitude/latitude. Minor footpaths and service roads were omitted. Geometry is illustrative cartographic context, not surveyed lane geometry.

Restrictions were checked against [TfL travel advice](https://tfl.gov.uk/brent-cross-flyover) and [TfL project information](https://tfl.gov.uk/travel-information/improvements-and-projects/brent-cross-flyover-renewals). The highlighted A41 extent follows OSM flyover/approach tags; exact traffic-management boundaries need confirmation.

Do not upload vendor credentials, individual location traces, appointment details or restricted extracts. Source data, transformed data and publicly redistributable outputs must have separately recorded permissions. Google Routes has specific [display and caching rules](https://developers.google.com/maps/documentation/routes/policies).

## Technical references

- [TomTom Traffic Stats area analysis](https://docs.tomtom.com/traffic-stats/documentation/api/area-analysis)
- [TomTom arrival-time routing](https://docs.tomtom.com/routing-api/documentation/tomtom-maps/v1/calculate-route)
- [HERE time-dependent routing](https://docs.here.com/routing/docs/routing-v8-time-dependent-routing)
- [TfL open data](https://tfl.gov.uk/info-for/open-data-users/our-open-data)
