import React from 'react';

export default class SleuthClient {
    constructor(url) {
        this.url = url;
    }

    /**
     * Returns a string representation of the given parameters to be used in a
     * HTTP request.
     * @param {Object} params A JSON object of key value pairs representing the
     * parameters of a request.
     */
    static _stringParams(params) {
        if (params === undefined) return '';
        let paramList = [];
        for (var key in params) {
            paramList.push(key + '=' + params[key]);
        }
        return '?' + paramList.join('&');
    }

    /**
     * Makes a GET request to the given API endpoint with the given params and
     * returns the response in JSON format, or throws an error.
     * @param {String} endpoint
     * @param {Object} params
     */
    async _get(endpoint, params) {
        const uri = this.url + endpoint + SleuthClient._stringParams(params);
        return new Promise(function(resolve, reject) {
            fetch(uri).then(response => response.json())
            .then(response => resolve(response))
            .catch(error => {
                console.trace(error)
                reject(error)
            });
        })
    }

    /**
     * Makes a search API call to the given core with the given query and returns
     * the response in JSON format, or throws an error.
     * @param {String} query
     */
    async search(query) {
        return await this._get('/search', {
            q: query,
            return: 'siteName,links'
        });
    }
}