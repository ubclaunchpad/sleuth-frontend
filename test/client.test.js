import React from 'react';
import { shallow, mount, find } from 'enzyme';
import App from '../src/components/App';
import SleuthClient from '../src/client';

const TEST_URL = 'http://localhost:8000/api';

describe('client', () => {
    it('should convert params to a string', () => {
        const result = SleuthClient._stringParams({
            param1: 'test',
            param2: 5,
        });
        expect(result).toEqual('?param1=test&param2=5');
    });

    it('should make a search request given a query and type', (done) => {
        const mockResponse = '{ "data": "test" }';
        fetch.mockResponseOnce(mockResponse);
        const client = new SleuthClient(TEST_URL);
        client.search('test').then(response => {
            expect(response).toEqual(JSON.parse(mockResponse));
            done();
        });
    });
});