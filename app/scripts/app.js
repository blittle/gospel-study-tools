import React from 'react';
import { take, each } from 'lodash';

import Avatar from './components/Avatar';
import { getDayAggregation, getContent, getAuthenticatedUser, getBadges } from './data';
import { DAY } from './constants';
import ContentList from './components/ContentList';
import HistoryTotals from './components/HistoryTotals';
import Badges from './components/Badges';
import { parseDate } from './utils';
import { renderSunBurst } from './components/SunBurst';
import Challenges from './components/Challenges';

import './app.css';

getDayAggregation(365).then(renderCalHeatmap)
getAuthenticatedUser().then(renderAvatar)
getContent().then(renderContent);
getBadges().then(renderBadges);

function renderCalHeatmap(response) {
	if (!response.data || !response.data.length) {
		return
	}

	var calendar = new CalHeatMap();

	let highestValue = 0;

	each(response.data, (d) => {
		if (d.total_seconds > highestValue) highestValue = d.total_seconds;
	});

	highestValue = (highestValue - (.35 * highestValue)) / 60;

	let legend = [
		highestValue / 64,
		highestValue / 32,
		highestValue / 16,
		highestValue / 8,
		highestValue / 4,
		highestValue / 2,
		highestValue
	]

	console.log(legend);

	calendar.init({
		data: response.data,
		start: new Date(new Date().getTime() - (DAY * 335)),
		domain : "month",
		subDomain : "day",
		range : 12,
		domainGutter: 0,
		domainMargin: 0,
		itemSelector: '.cal-heatmap',
		cellsize: 55,
		// cellpadding: 3,
		// cellradius: 5,
		legend: legend,
		itemName: ["minute studied", "minutes studied"],
		displayLegend: false,
		legendColors: {
			min: "#deebf7",
			max: "#3E606F",
			empty: "white"
		},
		cellLabel: {
			empty: "You did not study on {date}",
			filled: "You studied for {count} {name} on {date}"
		},
		// format: {
		// 	date: function(date) {
		// 		return moment(date).format("LL");
		// 	},
		// 	legend: null,
		// },
		afterLoadData: (data) => {
			var stats = {};
			for (var d in data) {
				stats[parseDate(data[d].day).getTime() / 1000] = ( data[d].total_seconds / 60 ).toFixed(2) * 1;
			}
			return stats;
		}
	});


	React.render(
		<HistoryTotals content={response.data}/>,
	  document.getElementById('history-total')
	)
}

function renderContent(response) {
	const content = response.data;

	if (!content.top || !content.top.length) {
		document.querySelector('.empty').className = 'empty +visible';
		document.querySelector('.main-container').className = 'main-container +hidden'
		return;
	}

	// Challenges(response.data);
	renderSunBurst(response.data.top);

	React.render(
		<ContentList content={take(content.top, 5)} title='Popular Content' />,
	  document.getElementById('top-content')
	);

	React.render(
		<ContentList content={content.recent} title='Recent Content' relative={true} />,
	  document.getElementById('recent-content')
	);
}

function renderAvatar(user) {
	React.render(
		<Avatar user={user}/>,
	  document.getElementById('avatar')
	);
}

function renderBadges(response) {
	let badges = response.data.badges;

	React.render(
		<Badges badges={badges}/>,
	  document.getElementById('badges')
	);
}
