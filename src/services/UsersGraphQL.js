// This file is not used right now but I want to keep working on it
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const gitHubGraphQlApi = 'https://api.github.com/graphql';

const client = new ApolloClient({ uri: gitHubApi });

export function search(query, page, perPage) {
    return client.query({ query: gql`
        query search(type: 'User', query: ${query}, first: ${perPage}, after: "${''}") {
              userCount,
              pageInfo {
                endCursor,
                startCursor,
                hasNextPage,
                hasPreviousPage
              },
              edges {
                cursor
                node {
                    login,
                    name,
                    url,
                    location,
                    avatarUrl,
                    followers() {},
                    following() {},
                    repositories() {},
                    starredRepositories() {}
                }
        }`,
    })
}