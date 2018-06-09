import * as React from 'react';
import ReactDOM from 'react-dom';
import {List} from './List';
import renderer from 'react-test-renderer';

it('creates expected mark up for 2 results', () => {
    const tree = renderer.create(
        <List items={ [{a:'a1', b: 'b1'}, {a:'a2', b: 'b2'}] } itemComponent={i=> <div>{i.a}</div>} getKey={i=>i.a}/>
    ).toJSON();
    expect(tree).toMatchSnapshot()
});


it('creates expected mark up for 0 results', () => {
    const tree = renderer.create(
        <List items={ [] } itemComponent={i=> <div>{i.a}</div>}/>
    ).toJSON();
    expect(tree).toMatchSnapshot()
});