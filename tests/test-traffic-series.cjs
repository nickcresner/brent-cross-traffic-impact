const { test } = require('node:test');
const assert = require('node:assert/strict');
const api = require('../web/traffic-series.js');
const points = [{ id: 'a', name: 'Example source point', coordinates: [-.22, 51.58] }];
function demo() { return api.createDemo(points); }

test('demo identifies itself as synthetic and spans 06:00 to 22:00 London time', () => {
 const d = demo(); assert.equal(d.kind, 'synthetic'); assert.equal(d.frames.length, 65);
 const format = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' });
 assert.equal(format.format(new Date(d.frames[0].timestamp)), '06:00');
 assert.equal(format.format(new Date(d.frames.at(-1).timestamp)), '22:00');
});
test('playback values change through the day without inventing sample counts', () => {
 const d = demo(); assert.ok(api.at(d, 10, 'a').ratio > api.at(d, 0, 'a').ratio); assert.equal(api.at(d, 10, 'a').sample_size, null);
});
test('missing values remain missing', () => {
 const d = demo(); d.frames[0].values.a = null; api.validate(d); assert.equal(api.at(d, 0, 'a'), null);
 delete d.frames[1].values.a; assert.equal(api.at(d, 1, 'a'), null);
 assert.equal(api.level(null).label, 'No observation');
});
test('duplicate point IDs fail validation', () => {
 const d = demo(); d.points.push(d.points[0]); assert.throws(() => api.validate(d), /unique/);
});
test('unordered frames and timestamps without offset fail validation', () => {
 const d = demo(); d.frames[1].timestamp = d.frames[0].timestamp; assert.throws(() => api.validate(d), /increasing/);
 d.frames[1].timestamp = '2026-10-12T08:00:00'; assert.throws(() => api.validate(d), /offset/);
});
test('invalid geometry and measurements fail validation', () => {
 const d = demo(); d.points[0].coordinates = [51.58, -.22]; assert.throws(() => api.validate(d), /extent/);
 const e = demo(); e.frames[0].values.a.reference_time_s = 0; assert.throws(() => api.validate(e), /positive/);
});
test('seven-mile boundary admits outer roads and rejects points beyond the study area', () => {
 const point = { id: 'outer', name: 'Boundary check', coordinates: [api.centre[0], api.centre[1] + .0868] };
 assert.ok(api.distance(point.coordinates) > 5 * 1609.344);
 assert.ok(api.distance(point.coordinates) < 7 * 1609.344);
 assert.doesNotThrow(() => api.createDemo([point]));
 point.coordinates[1] = api.centre[1] + .103;
 assert.ok(api.distance(point.coordinates) > 7 * 1609.344);
 assert.throws(() => api.createDemo([point]), /seven-mile/);
});
test('unknown IDs and fabricated fractional sample counts fail validation', () => {
 const d = demo(); d.frames[0].values.other = d.frames[0].values.a; assert.throws(() => api.validate(d), /unknown/);
 const e = demo(); e.frames[0].values.a.sample_size = .3; assert.throws(() => api.validate(e), /sample/);
});
test('frame index range and missing source labels are checked', () => {
 assert.throws(() => api.at(demo(), -1, 'a'), /outside/);
 const d = demo(); d.source = ''; assert.throws(() => api.validate(d), /source/);
});
