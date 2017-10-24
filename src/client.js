import React from 'react';

export default class SleuthClient {
    constructor(url) {
        this.url = url;
    }

    static _json(response) {
        return response.json();
    }

    static _stringParams(params) {
        if (params === undefined) return '';
        let paramList = [];
        for (var key in params) {
            paramList.push(key + '=' + params[key]);
        }
        return '?' + paramList.join('&');
    }

    async _get(endpoint, params) {
        try {
            const uri = this.url + endpoint + SleuthClient._stringParams(params);
            const response = await fetch(uri);
            return await SleuthClient.json(response);
        } catch (ex) {
            throw ex;
        }
    }

    async search(query, core) {
        return await this._get('/search', {
            q: query,
            core: core
        });
    }
}