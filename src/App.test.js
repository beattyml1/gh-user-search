import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import fetchMock from 'fetch-mock';
let promises = 0;

function setupMocks(resolve) {
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
    })
}

describe('App', () => {

    it('renders without crashing', () => {
        let done = new Promise (resolve => {
            setupMocks();
            const div = document.createElement('div');
            ReactDOM.render(<App />, div);

            // Needed because lifecycle events trigger a re-render under certain conditions
            // Would probably ask coworkers if they knew a better way
            setImmediate(() => {
                ReactDOM.unmountComponentAtNode(div)
                fetchMock.restore();
                resolve();
            });

        });
        return done;
    });
})
