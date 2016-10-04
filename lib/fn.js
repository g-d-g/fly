'use strict';

const $ = {
	isArray: val => Array.isArray(val),

	// @see http://stackoverflow.com/a/16608074
	isObject: val => Boolean(val) && (val.constructor === Object),

	isEmptyObj: val => $.isObject(val) && !Object.keys(val).length,

	/**
	 * Format a task's duration.
	 * @param  {Number} num  Total time, in ms
	 * @return {String}
	 */
	formatTime: num => {
		let unit = 'ms';
		if (num >= 1000) {
			unit = 's';
			num = Math.round((num / 1000) * 10) / 10;
		}
		return `${num}${unit}`;
	},

	/**
	 * Get the current time!
	 * @return {String}  Formatted as `HH:MM:ss`.
	 */
	getTime: () => {
		const d = new Date();
		return [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
	}
};

module.exports = $;