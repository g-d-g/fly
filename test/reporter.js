'use strict';

const E = require('events');
const test = require('tape').test;
const reporter = require('../lib/reporter');

class Emit extends E {
	constructor(t) {
		super()
		this.ok = t.ok;
	}

	on(e) {
		this.ok(true, `listens to the '${e}' event`);
		return this;
	}
}

test('fly.reporter', t => {
	const all = [
		'fly_run',
		'flyfile_not_found',
		'fly_watch',
		'fly_watch_event',
		'plugin_load',
		'plugin_error',
		'tasks_force_object',
		'task_error',
		'task_start',
		'task_complete',
		'task_not_found'
	];

	t.plan(all.length + 1);

	const ctx = new Emit(t);
	const rep = reporter.call(ctx);

	t.deepEqual(rep, ctx, 'returns the bound object');

	all.forEach(e => ctx.emit(e));
});

// test('✈  timeInfo', function (t) {
//   var timeInfo = require('../src/reporter/timeInfo').default
//   t.deepEqual(timeInfo(100), { duration: 100, scale: 'ms' },
//     'use `ms` units by default.')
//   t.deepEqual(timeInfo(1000), { duration: 1, scale: 's' },
//     'convert long units to seconds.')
//   t.end()
// })
