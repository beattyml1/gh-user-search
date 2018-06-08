import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import fetchMock from 'fetch-mock';
let promises = 0;

describe('App', () => {

    it('renders without crashing', () => {
        let done = new Promise((resolve, reject) => {
            fetchMock.get('begin:https://api.github.com/search/users', () => {
                return {
                    total_count: 5,
                    items: [
                        {login:'janedev'}, {login:'johndev'}
                    ]
                }
            });
            fetchMock.get('begin:https://api.github.com/users', () => {
                promises++;
                if (promises===2) resolve();
                return { login: 'dev', name:'Developer'}
            });

            const div = document.createElement('div');
            ReactDOM.render(<App />, div);
            ReactDOM.unmountComponentAtNode(div);
        });


        return done.then(() => fetchMock.restore());
    });
})
