import React from 'react';

export default class SleuthClient {
    constructor(url) {
        this.url = url;
    }

    /**
     * Returns a Response object in JSON format.
     * @param {Response} response The response to our request that the `fetch`
     * API returns.
     */
    static _json(response) {
        return response.json();
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
        try {
            const uri = this.url + endpoint + SleuthClient._stringParams(params);
            const response = await fetch(uri);
            return await SleuthClient._json(response);
        } catch (ex) {
            throw ex;
        }
    }

    /**
     * Makes a search API call to the given core with the given query and returns
     * the response in JSON format, or throws an error.
     * @param {String} query
     * @param {String} type May be undefined, in which case we search all cores.
     */
    async search(query, type) {
        const params = {
            q: query,
            return: 'siteName,links,subjectData',
        };

        if (type) {
            params.type = type;
        }
        return await this._get('/search', params);
    }
}