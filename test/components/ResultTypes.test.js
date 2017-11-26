import React from 'react';
import { mount } from 'enzyme';
import {
    CourseItemResult,
    GenericPageResult
} from './../../src/components/ResultTypes';

const id = 'TEST_ID';
const description = 'TEST_DESCRIPTION';
const pageName = 'TEST_PAGENAME';
const siteName = 'TEST_SITENAME';
const links = ['TEST_LINK1', 'TEST_LINK2'];

describe('CourseItemResult', () => {
    it('should be instantiable', () => {
        const courseItem = new CourseItemResult(id, description, pageName, siteName);
        expect(courseItem.url).toEqual(id);
        expect(courseItem.description).toEqual(description);
        expect(courseItem.pageName).toEqual(pageName);
        expect(courseItem.siteName).toEqual(siteName);
    });
});

describe('GenericPageResult', () => {
    it('should be instantiable', () => {
        const genericPageResult = new GenericPageResult(
            id,
            description,
            pageName,
            siteName,
            links
        );
        expect(genericPageResult.url).toEqual(id);
        expect(genericPageResult.description).toEqual(description);
        expect(genericPageResult.pageName).toEqual(pageName);
        expect(genericPageResult.siteName).toEqual(siteName);
        expect(genericPageResult.links).toEqual(links);
    });
});