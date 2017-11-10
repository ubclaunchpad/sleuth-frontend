import React from 'react';
import PropTypes from 'prop-types';

export default class ResultItem extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Returns the given text as a <p> element with any <em>
     * elements filtered from the text and rendered as proper <b> HTML tags.
     * @param {String} text
     */
    highlight(text) {
        let chunks = this.props.description.split(/<em>(.*?)<\/em>/g);
        chunks = chunks.map((text, index) => {
            return index % 2 == 1 ? (<b>{text}</b>) : text;
        });
        return (
            <p>{chunks}</p>
        )
    }

    render() {
        const description = this.highlight(this.props.description);
        const url = this.props.pageName ? this.props.pageName : this.props.url;
        return (
            <div className='container' style={styles.resultsContainer}>
                <a href={this.props.url}>{url}</a>
                {this.props.siteName ? <p>{this.props.siteName}</p> : null}
                {description}
            </div>
        )
    }
}

ResultItem.propTypes = PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
    siteName: PropTypes.string,
    pageName: PropTypes.string
})

const styles = {
    resultsContainer: {
        textAlign: 'left',
        margin: 'auto',
        width: '100%'
    }
}