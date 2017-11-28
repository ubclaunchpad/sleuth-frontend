import React from 'react';
import { mount } from 'enzyme';
import SearchForm from './../../src/components/SearchForm';
import SleuthClient from './../../src/client';
import { GenericPageResult } from './../../src/components/ResultTypes';
import { setImmediate } from 'core-js/library/web/timers';

describe('<SearchForm />', () => {
    const client = new SleuthClient('FAKE_URL');

    it('should render', () => {
        const result = mount(<SearchForm client={client} graphView={false} />);

        expect(result.find('ResultList').length).toEqual(1);
        expect(result.find('input').length).toEqual(1);
    });

    it('should handle input', () => {
        const result = mount(<SearchForm client={client} graphView={false} />);
        const input = result.find('input');
        input.simulate('change', { target: { value: 'testing' } });

        expect(result.state().query).toEqual('testing');
    });

    it('should handle form submission via keypress', () => {
        const result = mount(<SearchForm client={client} graphView={false} />);
        const input = result.find('input');

        result.instance().handleSubmit = jest.fn();
        result.update();

        input.simulate('change', { target: { value: 'testing' } });
        input.simulate('keypress', { key: 'Enter' });

        expect(result.instance().handleSubmit).toBeCalled();
    });

    it('should handle submissions', done => {
        const mockClient = new SleuthClient('FAKE_URL');
        const result = mount(<SearchForm client={mockClient} graphView={false} />);

        result.state().query = 'test';
        mockClient.search = jest.fn(() => {
            return Promise.resolve();
        });
        result.instance().handleResponse = jest.fn(() => {
            expect(mockClient.search).toBeCalled();
            expect(result.state()).toEqual({
                noResults: false,
                queryId: 1,
                query: 'test',
                results: [],
                errored: false,
            });
            done();
        });
        result.instance().handleSubmit();
    });

    it('should handle search errors on submission', done => {
        const mockClient = new SleuthClient('FAKE_URL');
        const result = mount(<SearchForm client={mockClient} graphView={false} />);

        result.state().query = 'test';
        mockClient.search = jest.fn(() => {
            return Promise.reject('FAKE_ERROR');
        });
        result.instance().handleError = jest.fn(() => {
            expect(mockClient.search).toBeCalled();
            expect(result.state()).toEqual({
                noResults: false,
                queryId: 1,
                query: 'test',
                results: [],
                errored: false,
            });
            done();
        });
        result.instance().handleSubmit();
    });

    it('should handle valid responses', () => {
        const result = mount(<SearchForm client={client} graphView={false} />);
        const mockResult = {
            id: 'http://someid.com',
            name: 'Test',
            updatedAt: '2017-11-15T06:29:32Z',
            siteName: 'Random Site Name',
            description: '',
            links: ['http://www.test.com'],
            subjectData: 'random subject data'
        };
        const mockResponse = {
            data: [
                {
                    response: {
                        numFound: 1,
                        start: 0,
                        docs: [mockResult]
                    },
                    highlighting: {
                        'http://someid.com': {
                            content: ['<em>Test</em> A Place of Mind']
                        }
                    },
                    type: 'genericPage'
                }
            ]
        };
        const expectedResult = new GenericPageResult(
            mockResult.id,
            '<em>Test</em> A Place of Mind',
            mockResult.name,
            mockResult.siteName,
            mockResult.links
        );

        result.instance().handleResponse(mockResponse);
        expect(result.state()).toEqual({
            results: [expectedResult],
            queryId: 0,
            errored: false,
            noResults: false,
            query: ''
        });
    });

    it('should handle error responses', () => {
        const result = mount(<SearchForm client={client} graphView={false} />);

        result.instance().handleResponse({errorType: 'OH NO', message: 'IT BROKE!'});
        expect(result.state()).toEqual({
            results: [],
            queryId: 0,
            errored: true,
            noResults: false,
            query: ''
        });
    });
});