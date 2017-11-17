import React from 'react';
import ResultItem from './ResultItem';
import PropTypes from 'prop-types';
import { CourseItemResult, GenericPageResult } from './ResultTypes';

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
        return this.props.results.map(result =>
            <div className='row' key={result.url}>
                <ResultItem
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
            <div
                className='container'
                style={styles.results}>{resultList}
            </div>
        )
    }
}

ResultList.propTypes = {
    results: PropTypes.arrayOf([
        PropTypes.instanceOf(CourseItemResult),
        PropTypes.instanceOf(GenericPageResult)
    ]),
    queryId: PropTypes.number,
};

const styles = {
    results: {
        width: '100%'
    }
};