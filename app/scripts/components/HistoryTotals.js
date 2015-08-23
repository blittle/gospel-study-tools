import React from 'react';
import { msToTime, getPlural } from '../utils';

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

		return (
			<div className="card__columns__column">
				<span className="text-muted">Study time last year</span>
				<span className="contrib-number">{output} total</span>
				<span className="text-muted">Aug 23, 2014 – Aug 23, 2015</span>
			</div>
		)
	},

	getLongestStreak() {
		return (
			<div className="card__columns__column">
				<span className="text-muted">Longest Streak</span>
				<span className="contrib-number">12 days</span>
				<span className="text-muted">Aug 11 – Aug 23</span>
			</div>
		)
	},

	getCurrentStreak() {
		return (
			<div className="card__columns__column">
				<span className="text-muted">Current Streak</span>
				<span className="contrib-number">5 days</span>
				<span className="text-muted">Aug 18 – Aug 23</span>
			</div>
		)
	}

});
