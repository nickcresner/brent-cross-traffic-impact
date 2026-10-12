/* Timeline contract and explicitly synthetic demonstration values. MIT licence. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.TrafficSeries = api;
})(typeof window === 'undefined' ? globalThis : window, function () {
  'use strict';
  const centre = [-0.2183801, 51.5767595];
  const radiusMetres = 11265.408;
  function distance(coordinates) {
    const rad = x => x * Math.PI / 180;
    const a = rad(coordinates[1] - centre[1]), b = rad(coordinates[0] - centre[0]);
    const h = Math.sin(a / 2) ** 2 + Math.cos(rad(centre[1])) * Math.cos(rad(coordinates[1])) * Math.sin(b / 2) ** 2;
    return 6371008.8 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(Math.max(0, 1 - h)));
  }

  function validate(data) {
    if (!data || data.version !== 1 || !['synthetic', 'observed'].includes(data.kind)) throw new Error('Version 1 and kind synthetic or observed are required.');
    if (typeof data.source !== 'string' || !data.source.trim()) throw new Error('A source label is required.');
    if (data.timezone !== 'Europe/London') throw new Error('Use the Europe/London time zone.');
    if (!Array.isArray(data.points) || !data.points.length || data.points.length > 100) throw new Error('Supply between 1 and 100 points.');
    if (!Array.isArray(data.frames) || !data.frames.length || data.frames.length > 2000) throw new Error('Supply between 1 and 2000 chronological frames.');
    const ids = new Set();
    for (const p of data.points) {
      if (!p || typeof p.id !== 'string' || !p.id || ids.has(p.id) || typeof p.name !== 'string' || !p.name.trim()) throw new Error('Points need unique string IDs and names.');
      if (!Array.isArray(p.coordinates) || p.coordinates.length !== 2 || !p.coordinates.every(Number.isFinite)) throw new Error('Point coordinates must be [longitude, latitude].');
      const [lon, lat] = p.coordinates;
      if (lon < -180 || lon > 180 || lat < -90 || lat > 90 || distance(p.coordinates) > radiusMetres) throw new Error('Point lies outside the seven-mile study extent.');
      ids.add(p.id);
    }
    let previous = -Infinity;
    for (const f of data.frames) {
      if (!f || typeof f.timestamp !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/.test(f.timestamp)) throw new Error('Frame timestamps need ISO date/time and an explicit UTC offset.');
      const time = Date.parse(f.timestamp);
      if (!Number.isFinite(time) || time <= previous) throw new Error('Frame timestamps must be valid, unique and increasing.');
      previous = time;
      if (!f.values || typeof f.values !== 'object' || Array.isArray(f.values)) throw new Error('Frame values must be keyed by point ID.');
      for (const [id, value] of Object.entries(f.values)) {
        if (!ids.has(id)) throw new Error('Frame refers to an unknown point ID.');
        if (value === null) continue;
        if (!value || !Number.isFinite(value.travel_time_s) || value.travel_time_s <= 0 || !Number.isFinite(value.reference_time_s) || value.reference_time_s <= 0) throw new Error('Travel and reference times must be finite positive seconds.');
        if (value.sample_size != null && (!Number.isInteger(value.sample_size) || value.sample_size < 1)) throw new Error('Observed sample count must be a positive integer or null.');
      }
    }
    return data;
  }

  function at(data, frameIndex, pointId) {
    if (!Number.isInteger(frameIndex) || frameIndex < 0 || frameIndex >= data.frames.length) throw new Error('Frame index is outside the timeline.');
    const values = data.frames[frameIndex].values;
    const value = Object.hasOwn(values, pointId) ? values[pointId] : null;
    if (value == null) return null;
    return { ...value, ratio: value.travel_time_s / value.reference_time_s };
  }

  function level(value) {
    if (value == null) return { label: 'No observation', category: 0, radius: 6 };
    const ratio = value.ratio;
    const category = ratio < 1.3 ? 1 : ratio < 2 ? 2 : ratio < 3 ? 3 : 4;
    return { label: category === 1 ? 'Near reference' : category === 2 ? 'Slower' : category === 3 ? 'Much slower' : 'Severe slowdown', category, radius: Math.min(18, 6 * Math.sqrt(Math.max(1, ratio))) };
  }

  function createDemo(points) {
    points = points.map(p => ({ ...p, coordinates: [...p.coordinates] }));
    // Generic commuter-shaped curves, deliberately not fitted to Brent Cross.
    const gaussian = (x, centre, width) => Math.exp(-0.5 * ((x - centre) / width) ** 2);
    const frames = [];
    for (let minute = 360; minute <= 1320; minute += 15) {
      const values = Object.create(null);
      points.forEach((p, i) => {
        const miles = distance(p.coordinates) / 1609.344;
        const am = 2.8 * Math.exp(-miles / 5) * (1 + .12 * Math.sin(i));
        const pm = 2.5 * Math.exp(-miles / 6) * (1 + .18 * Math.cos(i));
        const reference = 45 + i * 9;
        // Distance lag illustrates outward propagation; this is not a network model.
        const ratio = 1.05 + am * gaussian(minute, 480 + miles * 12, 55) + pm * gaussian(minute, 1020 + miles * 14, 65) + .25 * gaussian(minute, 780, 95);
        values[p.id] = { travel_time_s: Math.round(reference * ratio), reference_time_s: reference, sample_size: null };
      });
      // Demonstrate missing coverage rather than silently showing free flow.
      if (minute >= 705 && minute <= 750 && points[5]) values[points[5].id] = null;
      frames.push({ timestamp: new Date(Date.UTC(2026, 9, 12, 0, minute - 60)).toISOString().replace('.000Z', 'Z'), values });
    }
    return validate({ version: 1, kind: 'synthetic', source: 'Illustrative curves with a distance lag; not local measurements or a calibrated traffic model', timezone: 'Europe/London', points, frames });
  }

  return { validate, at, level, createDemo, distance, centre, radiusMetres };
});
