import React from 'react';
import SearchForm from './SearchForm';
import PropTypes from 'prop-types';
import SleuthClient from '../client';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			graphView: false
		}

		this.toggleView = this.toggleView.bind(this);
	}

	toggleView() {
		this.setState({ graphView: !this.state.graphView });
	}

	render() {
		return (
			<div>
				<nav className='navbar navbar-default'>
					<div className='container-fluid'>
						<div className='navbar-header'>
							<a className='navbar-brand'>Sleuth</a>
						</div>
						<div className='collapse navbar-collapse' id='navbar-collapse'>
							<ul className='nav navbar-nav'>
								<li onClick={this.toggleView} id='toggle-view'>
									<a>Toggle View</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>
				<div className='container-fluid' style={styles.search}>
					<SearchForm client={this.props.client} graphView={this.state.graphView} />
				</div>
			</div>
		);
	}
}

App.propTypes = {
	client: PropTypes.instanceOf(SleuthClient)
}

const styles = {
	search: {
		textAlign: 'center'
	}
};