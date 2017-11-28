import React from 'react';
import { mount } from 'enzyme';
import ResultItem from './../../src/components/ResultItem';

describe('<ResultItem />', () => {
    it('should render correctly with highlights', () => {
        const result = mount(
            <ResultItem
                url='http://www.test.com'
                description='there is something <em>amazing</em> about <em>code</em>'
                siteName='Cool Site'
                pageName='Cool Page'
            />
        );

        const div = result.find('div');
        expect(div.length).toEqual(1);

        const a = div.childAt(0);
        expect(a.type()).toEqual('a');
        expect(a.text()).toEqual('Cool Page');

        const br = div.childAt(1);
        expect(br.type()).toEqual('br');

        const name = div.childAt(2);
        expect(name.type()).toEqual('p');
        expect(name.text()).toEqual('Cool Site');

        const desc = div.childAt(3);
        expect(desc.type()).toEqual('p');
        expect(desc.text()).toEqual('there is something amazing about code');
        expect(desc.childAt(0).text()).toEqual('amazing');
        expect(desc.childAt(0).type()).toEqual('b');
        expect(desc.childAt(1).text()).toEqual('code');
        expect(desc.childAt(1).type()).toEqual('b');
    });

    it('should render correctly without highlights', () => {
        const result = mount(
            <ResultItem
                url='http://www.test.com'
                description='there is something amazing about code'
                siteName='Cool Site'
                pageName='Cool Page'
            />
        );

        const div = result.find('div');
        expect(div.length).toEqual(1);

        const a = div.childAt(0);
        expect(a.type()).toEqual('a');
        expect(a.text()).toEqual('Cool Page');

        const br = div.childAt(1);
        expect(br.type()).toEqual('br');

        const name = div.childAt(2);
        expect(name.type()).toEqual('p');
        expect(name.text()).toEqual('Cool Site');

        const desc = div.childAt(3);
        expect(desc.text()).toEqual('there is something amazing about code');
        expect(desc.children().length).toEqual(0);
    });
})