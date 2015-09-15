import React from 'react';
import { HOST } from '../constants';
import './Avatar.css';
import { logoutUser, showAuthErrorLogin, deleteUser } from '../data';

function findAncestor (el, cls) {
	while ((el = el.parentElement) && !el.classList.contains(cls));
	return el;
}

export default class Avatar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dialogDisplayed: false,
			settingsDisplayed: false
		}
	}

	componentWillMount() {
		this.boundBodyClick = this.bodyClicked.bind(this);
		document.body.addEventListener('click', this.boundBodyClick);
	}

	componentWillUnmount() {
		document.body.removeEventListener('click', this.boundBodyClick);
	}

	bodyClicked(e) {
		this.setState({
			dialogDisplayed: false
		})
	}

	render() {

		let { email, name, avatar } = this.props.user;

		let settings = this.state.settingsDisplayed ? (
			<div className='modal__screen'>
				<div style={{width: '100%'}}>
					<div style={{
						width: '400px',
						margin: '200px auto',
						background: 'white',
						display: 'block',
						'box-shadow': '0 4px 8px 0 rgba(0,0,0,.06), 0 2px 6px 0 rgba(0,0,0,.26)'
					}} className='card'>
						<div className='card__header'>
							Settings
						</div>
						<div className='card__body' style={{padding: 18}}>
							<form>
								<div className="form-group">
									<label>Email address</label>
									<input type="input" className="form-control" disabled value={email}/>
								</div>
								<div className="form-group">
									<label>Name</label>
									<input type="input" className="form-control" value={name} disabled/>
								</div>
								<button onClick={this.closeSettings.bind(this)} type="button" className="btn btn-default">CLOSE</button>
								<button onClick={this.deleteAccount.bind(this)} type="button" className="btn btn-default" style={{'margin-left': '20px'}}>DELETE MY ACCOUNT</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		) : null;

		return (
			<div>
				<img onClick={this.toggleDialog.bind(this)} className="avatar__img" src={avatar ? avatar : 'images/person.png'}/>
				<div style={{display: this.state.dialogDisplayed ? 'block' : 'none'}} className="dropdown-menu dropdown-menu-se">
					<div className="dropdown-header header-nav-current-user css-truncate">
						Signed in as <strong className="css-truncate-target">{name}</strong>
					</div>
					<div className="dropdown-divider"></div>

					<a className="dropdown-item" onClick={this.displaySettings.bind(this)}>
						Settings
					</a>
					<div className="dropdown-divider"></div>

					<a className="dropdown-item" onClick={this.logout.bind(this)}>
						Logout
					</a>
				 </div>
				{settings}
			</div>
		)
	}

	toggleDialog() {
		this.setState({
			dialogDisplayed: !this.state.dialogDisplayed
		})
	}

	displaySettings() {
		this.setState({
			settingsDisplayed: true
		})
	}

	closeSettings() {
		this.setState({
			settingsDisplayed: false
		})
	}

	deleteAccount() {
		if (confirm('Are you sure? Your account and all associated data will be deleted. This is not reversable!')) {
			deleteUser().then((resp) => {
				showAuthErrorLogin();
			})
		}
	}

	logout() {
		logoutUser().then((resp) => {
			showAuthErrorLogin();
		})
	}
}

