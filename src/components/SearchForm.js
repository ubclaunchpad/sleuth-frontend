import React from 'react';
import ResultList from './ResultList';
import ResultGraph from './ResultGraph';

export default class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: [],
            noResults: false,
            viewType: 'list'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleSwitchView = this.handleSwitchView.bind(this);
        this.displayResults = this.displayResults.bind(this);
    }

    /**
     * Called when the user inputs something into the search input field. Updates
     * component state to reflect the content in the search field.
     * @param {Event} event
     */
    handleChange(event) {
        this.setState({ query: event.target.value });
        // TODO: add search suggestions here
    }

    /**
     * Called when the user presses a key on in the search input field. If the
     * user presses enter this will submit the search query.
     * @param {Event} event
     */
    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.handleSubmit();
            return;
        }
    }

    /**
     * Called when the user clicks the submit button. Makes a search call to the
     * Sleuth API and updates the component state to reflect the results in the
     * response.
     * @param {Event} event
     */
    handleSubmit(event) {
        if (this.state.query.length === 0) return;
        this.setState({ noResults: false });
        this.props.client.search(this.state.query, 'genericPage')
            .then(this.handleResponse)
            .catch(this.handleError);
    }

    /**
     * Udpates the component state to reflect the results in the given response.
     * @param {Object} response
     */
    handleResponse(response) {
        const docs = response.response.docs;
        const highlights = response.highlighting;
        let results = docs.map((doc, index) => {
            return {
                url: doc.id,
                description: doc.description ? doc.description[0] : highlights[doc.id].content[0],
                pageName: doc.pageName ? doc.pageName : doc.siteName
            }
        });

        this.setState({ results: results, noResults: results.length === 0 });
    }

    /**
     * Updates the component state to reflect the error that occurred.
     * @param {Exception} error
     */
    handleError(error) {
        console.log('An error occurred making/handling a search request: ' + error);
        // TODO: improve error handling
    }

    handleSwitchView(event) {
        if (this.state.viewType == 'list')
            this.setState({viewType:'graph'});
        else
            this.setState({viewType:'list'});
    }

    displayResults() {
        if (this.state.viewType == 'list') 
            return <ResultList results={this.state.results} />;
        else 
            return <ResultGraph results={this.state.results} />;
    }

    render() {
        let message = this.state.noResults ? 'No results found :(' : null;
        return (
            <div className='input-group' style={styles.searchContainer}>
                <div className="input-group add-on">
                    <div className="view-switch-btn">
                        <button
                            className='btn btn-switch'
                            type='button'
                            onClick={this.handleSwitchView} >
                        </button>
                    </div>
                    <input
                        id='search-input'
                        className='form-control'
                        type='text'
                        value={this.state.query}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        placeholder='Feeling... curious?'
                    />
                    <div className="input-group-btn">
                        <button
                            className='btn btn-primary'
                            type='button'
                            onClick={this.handleSubmit} >
                            <i className="glyphicon glyphicon-search"></i>
                        </button>
                    </div>
                </div>
                <h3>{message}</h3>
                { this.displayResults() }
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