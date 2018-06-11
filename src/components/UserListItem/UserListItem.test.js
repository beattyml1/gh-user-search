import * as React from 'react';
import ReactDOM from 'react-dom';
import {UserListItem} from './UserListItem';
import renderer from 'react-test-renderer';

it('creates expected mark up for 0 results', () => {
    const tree = renderer.create(
        <UserListItem login={"dev"} name={"Dev"}  location={"Pittsburgh"} avatarUrl={""}
                      followers={2} following={2} starred={3} publicRepositories={4}
                      repositoriesLink={""} followersLink={""} followingLink={""} starredLink={""}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot()
});