import React from 'react';
import SearchForm from './SearchForm';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='container-fluid' style={styles.rootDiv}>
				<SearchForm client={this.props.client} />
			</div>
		);
	}
}

const styles = {
	rootDiv: {
		textAlign: 'center'
	}
}