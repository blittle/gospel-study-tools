import React from 'react';
import { formatL1 } from '../constants';
import { msToTime } from '../utils';

export default React.createClass({
	render() {
		return (
			<div>
				<div className='card__header'>
					Popular Content
				</div>
				<div className='card__body'>
					{this.renderChildren()}
				</div>
			</div>
		)
	},

	getTitle(content) {
		return formatL1(content.content_l1.trim());
	},

	renderChildren() {
		return this.props.content.map((content, i) => {
			return (
				<div key={i} className='card__element'>
					<div className='card__element__icon'>
						<i className="fa fa-users"></i>
					</div>
					<div className='card__element__title'>
						<div className='truncate'>
							{this.getTitle(content)}
						</div>
						<div className='truncate'>
							<a>{`${content.content_l2} - ${content.content_l3}`}</a>
						</div>
					</div>
					<div className='card__element__count'>
						{msToTime(content.total_seconds * 1000)}
					</div>
				</div>
			)
		});
	}
});
