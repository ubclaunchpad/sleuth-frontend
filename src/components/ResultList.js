import React from 'react';
import SearchResult from './SearchResult';
import PropTypes from 'prop-types';

export default class ResultList extends React.Component {
    constructor(props) {
        super(props);

        this.getResultList = this.getResultList.bind(this);
    }

    /**
     * Returns a list of components containing the the results in the current
     * state.
     */
    getResultList() {
        return this.props.results.map((result) =>
            <div className='row'>
                <SearchResult
                    url={result.url}
                    description={result.description}
                    pageName={result.pageName}
                />
            </div>
        );
    }

    render() {
        const resultList = this.getResultList();
        return (
            <div className='container' style={styles.results}>{resultList}</div>
        )
    }
}

ResultList.propTypes = {
    results: PropTypes.shape({
        url: PropTypes.string,
        description: PropTypes.string,
        pageName: PropTypes.string
    })
}

const styles = {
    results: {
        width: '100%'
    }
}