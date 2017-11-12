import React from 'react';

export default class SearchResult extends React.Component {
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
            <p className='container' style={styles.resultsContainer}>
                <a href={this.props.url} style={styles.urlTitle}>{url}</a>
                <br />
                {this.props.siteName ? <text style={styles.siteTitle}>{this.props.siteName}</text> : null}
                <text style={styles.descriptionStyle}>{description}</text>
            </p>
        )
    }
}

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
}