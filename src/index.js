import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import SleuthClient from './client';

const BASE_URL = 'http://localhost:8000/api';
var sleuthClient = new SleuthClient(BASE_URL);

ReactDOM.render(
    <App client={sleuthClient} />, document.getElementById('root')
);