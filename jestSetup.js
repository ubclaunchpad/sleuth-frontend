/**
 * This file is run when you run the test suite using the command "yarn jest".
 * It sets up and adapter for Enzyme, a test framework for React.
 * See Enzyme docs here: https://github.com/airbnb/enzyme
 */

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Mock whatwg-fetch globally
global.fetch = require('jest-fetch-mock');