import React from 'react';
import { mount } from 'enzyme';
import ResultGraph, { Node, Edge } from './../../src/components/ResultGraph';
import { GenericPageResult } from '../../src/components/ResultTypes';

describe('<ResultGraph />', () => {
    it('should render', () => {
        const result = mount(<ResultGraph />);

        expect(result.find('div').length).toEqual(1);
    });

    it('should receive props', () => {
        const result = mount(<ResultGraph queryId={0} results={[]} />);
        const result1 = new GenericPageResult(
            'fake id 1',
            'fake description',
            'fake pagename',
            'fake sitename',
            ['fake id 2']
        );
        const result2 = new GenericPageResult(
            'fake id 2',
            'fake description 2',
            'fake pagename 2',
            'fake sitename 2',
            []
        );
        const mockProps = {
            results: [result1, result2],
            queryId: 1
        };
        const expectedNode1 = expect.objectContaining({
            id: result1.url,
            category: 1
        });
        const expectedNode2 = expect.objectContaining({
            id: result2.url,
            category: 1
        });

        result.instance().componentWillReceiveProps(mockProps);
        result.update();
        expect(result.instance().data.nodes[0]).toEqual(expectedNode1);
        expect(result.instance().data.nodes[1]).toEqual(expectedNode2);
        expect(result.instance().data.edges[0]).toEqual(
            expect.objectContaining({
                source: expectedNode1,
                target: expectedNode2,
                weight: 3
            })
        );
    });
});