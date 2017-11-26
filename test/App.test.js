import React from 'react';
import { shallow, mount, find } from 'enzyme';
import App from '../src/components/App';
import SleuthClient from '../src/client';
import SearchForm from '../src/components/SearchForm';

describe('<App />', () => {
    it('should contain one SearchForm', () => {
        const client = new SleuthClient();
        const result = mount(<App client={client} />);
        expect(result.find(SearchForm).length).toEqual(1);
    });

    it('should be able to toggle view mode', () => {
        const client = new SleuthClient();
        const result = shallow(<App client={client} />);

        // Deafults to listview
        expect(result.state('graphView')).toEqual(false);
        result.find('#toggle-view').simulate('click');
        expect(result.state('graphView')).toEqual(true);
    })
});