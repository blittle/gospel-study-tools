import { getDayAggregation } from './data';
import { DAY } from './constants';

import './app.css';

console.log('hi')

getDayAggregation(365).then(renderCalHeatmap)

function renderCalHeatmap(response) {
	debugger;
	var calendar = new CalHeatMap();
	calendar.init({
		data: response.data,
		start: new Date(new Date().getTime() - (DAY * 335)),
		domain : "month",
		subDomain : "day",
		range : 12,
		// domainGutter: 15,
		// cellsize: 15,
		// cellpadding: 3,
		// cellradius: 5,
		scale: [2, 10, 60, 180],
		itemName: ["minute studied", "minutes studied"],
		cellLabel: {
			empty: "You did not study on {date}",
			filled: "You studied for {count} {name} on {date}"
		},
		scaleLabel: {
			lower: "Belle journée, il y a eu moins de {min} {name}",
			inner: "Pas mal, entre {down} et {up} {name}",
			upper: "Peut faire mieux, plus de {max} {name}"
		},
		format: {
			date: function(date) {
				return moment(date).format("LL");
			},
			legend: null,
		},
		afterLoadData: (data) => {
			var stats = {};
			for (var d in data) {
				stats[new Date(data[d].day).getTime() / 1000] = ( data[d].total_seconds / 60 ).toFixed(2) * 1;
			}
			return stats;
		}
	});
}
