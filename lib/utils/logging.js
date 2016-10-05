/* eslint prefer-spread:1 */
'use strict';

/**
 * @todo
 * 		- use 'fmt' object definitions
 * 		- use clean-stack trace?
 * 		- need prettyjson?
 * 		- use es2015
 */

const homedir = require('os').homedir;
const pretty = require('prettyjson');
const chalk = require('chalk');
const time = require('../fn').getTime;

/**
 * Apply args to the `console[method]` & Add a date stamp.
 * Bind `this` to an object with the following options:
 *
 * @param  {String} args.date     The color string to use for the date
 * @param  {String} args.method   The `console` method to use
 * @param  {String} args.custom   The custom styling to append to args
 */
function stamp() {
	const args = [].slice.call(arguments);

	// if (process.env.DEBUG) {
	// 	return _.apply(_, args);
	// }

	// print the curr time.
	process.stdout.write(`[${chalk[this.color](time())}]`);

	// apply arguments to `console` method
	console[this.method].apply(console, (this.custom ? [this.custom].concat(args) : args));
}

/**
 * Logging Utilities
 */

function log() {
	stamp.apply({method: 'log', color: 'magenta'}, arguments);
	return this;
}

function error() {
	stamp.apply({method: 'error', color: 'red'}, arguments);
	return this;
}

function alert() {
	if (process.env.VERBOSE) {
		stamp.apply({
			custom: chalk.yellow.bold('%s'),
			color: 'yellow',
			method: 'log'
		}, arguments);
	}
	return this;
}

/**
 * PrettyJSON wrapper & stack tracer
 * @param  {Object} e   The Error object
 */
function trace(e) {
	const msg = pretty.render(e)
		.replace(/(\sFunction|\sObject)\./g, `${chalk.blue('$1')}.`)
		.replace(/\((~?\/.*)\)/g, `(${chalk.gray('$1')})`)
		.replace(/:([0-9]*):([0-9]*)/g, ` ${chalk.yellow('$1')}:${chalk.yellow('$2')}`)
		.replace(new RegExp(homedir(), 'g'), '~');
	console.error(msg);
}

module.exports = {
	trace: trace,
	alert: alert,
	error: error,
	log: log
};
