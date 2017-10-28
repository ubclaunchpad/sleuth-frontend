import React from 'react';
import SearchForm from './SearchForm';
import Navbar from './Navbar';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Navbar {...navbar} />
				<div className='container-fluid' style={styles.rootDiv}>
					<SearchForm client={this.props.client} />
				</div>
			</div>
		);
	}
}

const styles = {
	rootDiv: {
		textAlign: 'center'
	}
}

const navbar = {
    brand: {
        linkTo: "#",
        text: "Sleuth"
    },
    links: [
        {
            linkTo: "#",
            text: "Link 1"
        }
    ]
};