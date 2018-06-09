import * as React from 'react';
import ReactDOM from 'react-dom';
import {SearchBox} from './SearchBox';
import renderer from 'react-test-renderer';

it('creates expected mark up for 0 results', () => {
    const tree = renderer.create(
        <SearchBox label={"Search Something"}/>
    ).toJSON();
    expect(tree).toMatchSnapshot()
});