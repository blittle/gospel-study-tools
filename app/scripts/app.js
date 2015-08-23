import React from 'react';

import { getDayAggregation, getContent } from './data';
import { DAY } from './constants';
import ContentList from './components/ContentList';
import HistoryTotals from './components/HistoryTotals';

import './app.css';

getDayAggregation(365).then(renderCalHeatmap)
getContent().then(renderTopContent);

function renderCalHeatmap(response) {
	var calendar = new CalHeatMap();
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
		legend: [2, 45],
		itemName: ["minute studied", "minutes studied"],
		displayLegend: false,
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
				stats[new Date(data[d].day).getTime() / 1000] = ( data[d].total_seconds / 60 ).toFixed(2) * 1;
			}
			return stats;
		}
	});


	React.render(
		<HistoryTotals content={response.data}/>,
	  document.getElementById('history-total')
	)
}

function renderTopContent(response) {
	const content = response.data;

	React.render(
		<ContentList content={content.top} title='Popular Content' />,
	  document.getElementById('top-content')
	);

	React.render(
		<ContentList content={content.recent} title='Recent Content' relative={true} />,
	  document.getElementById('recent-content')
	);
}
