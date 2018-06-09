import React from 'react';
import ReactDOM from 'react-dom';
import {PaginatedList} from './PaginatedList';
import renderer from 'react-test-renderer';

it('creates expected mark up for 0 results', () => {
    const tree = renderer.create(
        <PaginatedList
            perPage = {10}
            getItems={() => Promise.resolve({items:[], totalResults: 0 })}
            itemComponent={(props) => <div>Hello World</div>}
            getHeader={(totalResults) => `1 results`}
            getItemProps={x=>x}/>
    ).toJSON();
    expect(tree).toMatchSnapshot()
});