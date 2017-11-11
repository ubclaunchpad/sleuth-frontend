import React from 'react';
import SearchResult from './SearchResult';

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
                    siteName={result.siteName}
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

const styles = {
    results: {
        width: '100%'
    }
}