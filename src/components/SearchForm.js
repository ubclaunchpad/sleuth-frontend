import React from 'react';

export default class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    /**
     * Called when the user inputs something into the search input field. Updates
     * component state to reflect the content in the search field.
     * @param {Event} event
     */
    handleChange(event) {
        console.log('Keypress');
        this.setState({ query: event.target.value });
    }

    /**
     * Called when the user clicks the submit button. Makes a search call to the
     * Sleuth API and updates the component state to reflect the results in the
     * response.
     * @param {Event} event
     */
    handleSubmit(event) {
        console.log('Submitted');
        this.props.client.search(this.state.query, 'genericPage')
            .then(this.handleResponse)
            .catch(this.handleError);
    }

    /**
     * Udpates the component state to reflect the results in the given response.
     * @param {Object} response
     */
    handleResponse(response) {
        console.log('Received API response:');
        console.log(JSON.stringify(response));
        // TODO: display results in response
    }

    /**
     * Updates the component state to reflect the error that occurred.
     * @param {Exception} error
     */
    handleError(error) {
        console.log('An error occurred making a search request: ' + error);
        // TODO: improve error handling
    }

    render() {
        return (
            <div className='input-group' style={styles.searchContainer}>
                <span className='input-group-btn'>
                    <input
                        id='search-input'
                        type='text'
                        value={this.state.query}
                        onChange={this.handleChange}
                        className='form-control'
                        placeholder='Feeling.... curious?'
                    />
                    <button
                        className='btn btn-primary'
                        type='button'
                        style={styles.searchButton}
                        onClick={this.handleSubmit}
                    >
                        Search
                    </button>
                </span>
                {/* Results should probably go in come component here */}
            </div>
        )
    }
}

const styles = {
    searchContainer: {
        display: 'inline-block',
        minWidth: '200px',
        width: '50%',
    },
    searchButton: {
        borderRadius: '4px'
    }
};