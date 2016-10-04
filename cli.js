#!/usr/bin/env node
'use strict';

const Promise = require('bluebird');
const notifier = require('update-notifier');
const reporter = require('./lib/reporter');
const utils = require('./lib/utils');
const cli = require('./lib/cli');
const pkg = require('./package');
const co = Promise.coroutine;

co(function * () {
	// check if using latest
	notifier({pkg: pkg}).notify();

	// get command options
	const o = cli.options();
	const t = o._.length ? o._ : ['default'];

	if (o.help) {
		return cli.help();
	}

	if (o.version) {
		return cli.version(pkg);
	}

	const fly = yield cli.spawn(o.pwd);
	reporter.call(fly);

	if (!fly.file) {
		return fly.emit('flyfile_not_found');
	}

	if (o.list) {
		return cli.list(fly.tasks, o.list === 'bare');
	}

	fly.init();
	// announce start
	fly.emit('fly_run', fly.file);
	// run `tasks` in `mode`
	fly[o.mode](t);
})().catch(e => {
	if (e.type === 'cli') {
		utils.error(`CLI Error!\t${e.message}`);
	} else {
		utils.trace(e);
	}
});
