import React from 'react';
import { formatL1, formatScripture } from '../constants';
import { msToTime, getPlural } from '../utils';
import moment from 'moment';

export default React.createClass({
	render() {
		return (
			<div>
				<div className='card__header'>
					{this.props.title}
				</div>
				<div className='card__body'>
					{this.renderChildren()}
				</div>
			</div>
		)
	},

	getTitle(content) {
		const type = content.content_type.trim();
		if (type === 'SCRIPTURE') {
			return formatL1(content.content_l1.trim());
		} else if (type === 'ENSIGN') {
			return `Ensign ${content.content_l2.trim()} ${content.content_l1.trim()}`;
		} else if (type === 'MANUAL') {
		} else if (type === 'GC') {
			return `General Conference ${content.content_l2.trim()} ${content.content_l1.trim()}`;
		}
	},

	getIcon(content) {
		const type = content.content_type.trim();

		if (type === 'SCRIPTURE') {
			return 'fa fa-book';
		}

		if (type === 'ENSIGN') {
			return 'fa fa-newspaper-o';
		}

		if (type === 'MANUAL') {
			return 'fa fa-graduation-cap';
		}

		if (type === 'GC') {
			return 'fa fa-users';
		}
	},

	getSubTitle(content) {
		const type = content.content_type.trim();

		if (type === 'SCRIPTURE') {
			return `${formatScripture(content.content_l2.trim())} - ${content.content_l3.trim()}`
		}

		return `${content.content_l3.trim()} - ${content.content_l4.trim()}`
	},

	formatTime(content) {
		if (this.props.relative) {
			return moment(content.last_update).fromNow();
		} else {
			return msToTime(content.total_seconds * 1000);
		}

	},

	renderChildren() {
		return this.props.content.map((content, i) => {
			return (
				<div key={i} className='card__element'>
					<div className='card__element__icon'>
						<i className={this.getIcon(content)}></i>
					</div>
					<div className='card__element__title'>
						<div className='truncate' title={this.getTitle(content)}>
							{this.getTitle(content)}
						</div>
						<div className='truncate' title={this.getSubTitle(content)}>
							<a>{this.getSubTitle(content)}</a>
						</div>
					</div>
					<div className='card__element__count'>
						{this.formatTime(content)}
					</div>
				</div>
			)
		});
	}
});
