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
            return index % 2 == 1 ? (<b key={text + index}>{text}</b>) : text;
        });
        return (
            <p style={styles.descriptionStyle}>{chunks}</p>
        )
    }

    render() {
        const title = this.props.pageName ? this.props.pageName : this.props.url;
        return (
            <div className='container' style={styles.resultsContainer} key={this.props.url}>
                <a href={this.props.url} style={styles.urlTitle}>{title}</a>
                <br />
                {this.props.siteName ? <p style={styles.siteTitle}>{this.props.siteName}</p> : null}
                {this.highlight(this.props.description)}
            </div>
        )
    }
}

ResultItem.propTypes = PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
    siteName: PropTypes.string,
    pageName: PropTypes.string
});

const styles = {
    resultsContainer: {
        textAlign: 'left',
        margin: 'auto',
        width: '100%',
    },
    urlTitle: {
        color: 'navy',
        fontWeight: 'bold',
        fontSize: '125%',
    },
    siteTitle: {
        color: 'grey',
        fontWeight: 'bold',
    },
    descriptionStyle: {
        fontSize: '90%',
    }
};