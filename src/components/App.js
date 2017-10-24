import React from 'react';
import SearchForm from './SearchForm';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{ textAlign: 'center' }}>
				<SearchForm client={this.props.client} />
			</div>
		);
	}
}