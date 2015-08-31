import React from 'react';
import { msToTime, getPlural, parseDate } from '../utils';
import moment from 'moment';

function getLongestStreakObject(contentList) {
	let streak = [];
	let oldStreak = [];

	for (let i = contentList.length - 1; i >= 0; i--) {
		let content = contentList[i];

		if (!streak.length) {
			streak.push(content);
			continue;
		}

		let lastDayOfCurrentStreak = streak[streak.length - 1];

		if (
			moment(lastDayOfCurrentStreak.day).add(1, 'day').format('MMM DD YY') ===
			moment(content.day).format('MMM DD YY')
		) {
			streak.push(content);
		} else {
			streak = [content];
		}

		if (streak.length > oldStreak.length) {
			oldStreak = streak;
		}
	}

	return oldStreak;
}

function getCurrentStreak(contentList) {
	if (!contentList.length || moment(parseDate(contentList[0].day)).format('MMM DD YY') !== moment().format('MMM DD YY')) {
		return [];
	}

	let streak = [];

	for (let i = 0, iLength = contentList.length; i < iLength; i++) {
		let content = contentList[i];

		if (i === 0) {
			streak.unshift(content);
			continue;
		}

		let lastDayOfCurrentStreak = streak[0];

		if (
			moment(lastDayOfCurrentStreak.day).subtract(1, 'day').format('MMM DD YY') ===
			moment(content.day).format('MMM DD YY')
		) {
			streak.unshift(content);
		} else {
			return streak;
		}
	}
}

export default React.createClass({
	render() {
		return (
			<div className="card__columns">
				{this.getLastYearTime()}
				{this.getLongestStreak()}
				{this.getCurrentStreak()}
			</div>
		)
	},

	getLastYearTime() {
		const total = this.props.content.reduce((total, current) => current.total_seconds + total, 0);
		const hours = (total / (60 * 60));
		const minutes = Math.floor(total / 60);

		const output = hours < 1 ? `${minutes.toFixed(2)} minute${getPlural(minutes)}` : `${hours.toFixed(2)} hour${getPlural(hours)}`;

		const start = moment().subtract(1, 'year').format('MMM DD, YYYY');
		const end = moment().format('MMM DD, YYYY');

		return (
			<div className="card__columns__column">
				<span className="text-muted">Study time last year</span>
				<span className="contrib-number">{output} total</span>
				<span className="text-muted">{`${start} – ${end}`}</span>
			</div>
		)
	},

	getLongestStreak() {
		const streak = getLongestStreakObject(this.props.content);

		const start = moment(
			parseDate(streak[0].day).getTime()
		).format('MMM DD');

		const end = moment(
			parseDate(streak[streak.length - 1].day).getTime()
		).format('MMM DD');

		return (
			<div className="card__columns__column">
				<span className="text-muted">Longest Streak</span>
				<span className="contrib-number">{streak.length} days</span>
				<span className="text-muted">
					{`${start} – ${end}`}
				</span>
			</div>
		)
	},

	getCurrentStreak() {
		const streak = getCurrentStreak(this.props.content);

		if (streak.length) {
			var start = moment(
				parseDate(streak[0].day).getTime()
			).format('MMM DD');

			var end = moment(
				parseDate(streak[streak.length - 1].day).getTime()
			).format('MMM DD');
		}


		return (
			<div className="card__columns__column">
				<span className="text-muted">Current Streak</span>
				<span className="contrib-number">{streak.length} days</span>
				<span className="text-muted">
					{ start ? `${start} – ${end}` : ''}
				</span>
			</div>
		)
	}

});
