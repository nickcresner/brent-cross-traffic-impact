# Data sources and access

Last checked: 12 October 2026.

| Source | Purpose | Current project status |
| --- | --- | --- |
| TfL flyover travel advice | Dated lane restrictions and closure phases | Verified snapshot incorporated in map |
| OpenStreetMap map API | Local road geometry and landmarks | Embedded in map; attribution and ODbL apply |
| TomTom Traffic Stats | Historical speed/travel-time observations and coverage | Access/export required; no observations acquired |
| TomTom Traffic Volume | Modelled vehicle passages, separate from probe sample counts | Confirm trial entitlement, date coverage and publication rights; no extract acquired |
| TfL traffic assessments and monitoring | Existing modelling, counts, phasing and mitigation | Not located publicly; request required |
| TomTom or HERE routing | Future traffic-aware arrival-time planner | Not connected |
| OS Open Roads (October 2019 mirror) | Generalised classified road network within seven miles | Embedded in animated map; replace with current OS release before routing research |

## Historical data acquisition

TomTom documents a 30-day Traffic Stats trial through [MOVE](https://move.tomtom.com/). Check current trial limits, recent-date availability, local coverage and permission to publish derived results. Historical analytics access is separate from an ordinary live-routing API key. Start with a small area and a few matched periods before buying broader access.

Request an extract with segment IDs, directions, geometry/map version, date ranges, weekday/time bands, travel times, sample coverage and route-level travel-time percentiles. Retain daily or weekly observations for uncertainty estimation, rather than only two pooled averages.

For volume animation, request estimated vehicle passages by road, direction and hour through [Traffic Volume](https://docs.tomtom.com/traffic-stats/documentation/api/traffic-volume). Confirm exact-date hourly output rather than a typical annual profile. These are modelled totals; the number of sampled GPS traces is not total traffic. See [next steps](next-steps.md) for the pilot and export checklist.

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

## Seven-mile animation geometry

The wider basemap was retrieved 12 October 2026 from the public [OS Open Roads ArcGIS service](https://services.arcgis.com/qHLhLQrcvEnxjtPr/arcgis/rest/services/OSOpenRoads/FeatureServer/0). The service states an October 2019 data currency. [OS describes the product](https://www.ordnancesurvey.co.uk/products/os-open-roads) as a generalised road network; it does not supply current lane configurations or detailed turn-by-turn restrictions.

Query parameters: `where=class IN ('Motorway','A Road','B Road')`; WGS84 envelope `-0.386,51.472,-0.050,51.682`; intersection filter; output fields `identifier,class,roadNumber,name1`; output CRS EPSG:4326; `geometryPrecision=5`; `maxAllowableOffset=0.00003`; ordered pagination by OBJECTID, 2,000 features per page. Eight pages yielded 14,970 features. A geodesic seven-mile vertex-intersection filter retained 11,148 links. Rendering additionally clips to the exact radius. Links are grouped by road number, name and class into 984 MultiLineString features to reduce payload size without changing the supplied coordinates. No traffic state is inferred from the basemap.

The network covers classified roads; residential streets are not comprehensively included in this initial wider view. A current complete network and suitable traffic coverage are later research dependencies. Synthetic observation locations are sampled from actual source-link vertices and retain their source identifiers in `web/demo-points.json`. They are not real sensors.

Study centre: OSM Brent Cross place point, −0.2183801, 51.5767595. Radius: 11,265.408 m, computed geodesically on a mean-radius Earth. Distance rings are generated through D3 geographic circles. The seven-mile extent defines the requested study area and is not a finding about the roadworks' impact.

Orientation labels use the published coordinates on the Wikipedia articles for Edgware, Mill Hill, North Finchley, Muswell Hill, Wembley, Neasden, Kilburn (London), Hampstead and Golders Green, checked 12 October 2026. They are place reference points rather than boundaries.

OS geometry is distributed with: **Contains OS data © Crown copyright and database right 2019**, under the [Open Government Licence v3](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/). The older OSM restriction view retains its separate ODbL attribution.
