import React from 'react';
import { map } from 'lodash';
import ReactTooltip from 'react-tooltip';

import './Badges.css';

let badgeIcons = {
	BM100: {
		icon: '/images/badges/bom_100',
		message: '100 Hours of Book of Mormon Study'
	},
	GC100: {
		icon: '/images/badges/gc_100',
		message: '100 Hours of General Conference Study'
	},
	ISAIAH50: {
		icon: '/images/badges/isaiah_50',
		message: '50 Hours of Isaiah Study'
	},
	NT100: {
		icon: '/images/badges/nt_100',
		message: '100 Hours of New Testament Study'
	},
	OT100: {
		icon: '/images/badges/ot_100',
		message: '100 Hours of Old Testament Study'
	},
	hour1: {
		icon: '/images/badges/time_1',
		message: '1 Hour of Gospel Study'
	},
	hour10: {
		icon: '/images/badges/time_10',
		message: '10 Hours of Gospel Study'
	},
	hour100: {
		icon: '/images/badges/time_100',
		message: '100 Hours of Gospel Study'
	},
	hour1000: {
		icon: '/images/badges/time_1000',
		message: '1000 Hours of Gospel Study'
	}
}

export default class Badges extends React.Component {
	render() {
		return (
			<div className='gospel-badges'>
				{map(this.props.badges, this.getBadge.bind(this))}
			</div>
		)
	}

	getBadge(active, id) {
		active = true;
		let myClass = ( 'gospel-badge ' + ( active ? '+active' : '' ) );

		return (
			<div key={id} className={myClass}>
				<img data-tip={badgeIcons[id].message} src={badgeIcons[id].icon + ( active ? '-active' : '' ) + '.svg'}/>
				<ReactTooltip place='top' type='dark' effect='float'/>
			</div>
		)
	}
}
