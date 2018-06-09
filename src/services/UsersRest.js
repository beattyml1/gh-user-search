// searchDetailed(), searchSimple() params
// query: string
// params: {
//   sort: "followers" | "repositories" | "joined",
//   order: "asc" | "desc",
//   page: number = 1,
//   perPage: number: 30
// }
// result: {
//
// }
import {fetchJson, get, gitHubApi} from "./Rest";

const searchDefaults = { sort: "joined", order: "asc", page: 1, perPage: 30};

export async function searchDetailed(query, params) {
    let searchResults = await searchSimple(query, params);
    let userDetails = await Promise.all(searchResults.items.map(u => getDetails(u)));
    return {
        totalResults: searchResults.totalResults,
        items: userDetails.map(userModel)
    }
}

async function searchSimple(query, params) {
    if (!query) return Promise.resolve({ totalResults: null, items: [] })
    let { sort, order, page, perPage } = {...searchDefaults, ...(params||{})};
    let searchResults = await fetchJson(get(gitHubApi,'search/users', {
        q: query, sort, order, page, per_page: perPage
    }));

    return {
        totalResults: searchResults.total_count,
        items: searchResults.items,
    };
}

let userModel = ({ user, starred }) => ({
    login: user.login,
    name: user.name || user.login,
    link: user.html_url,
    company: user.company || '',
    starred: starred.length,
    followers: user.followers,
    following: user.following,
    publicRepositories: user.public_repos,
    avatarUrl: user.avatar_url,
    starredLink: user.html_url + '?tab=starred',
    followersLink: user.html_url + '?tab=followers',
    repositoriesLink: user.html_url + '?tab=repositories',
    followingLink: user.html_url + '?tab=following',
    location: user.location || ''
});

function getDetails(user) {
    let userDetails = fetchJson(user.url);
    let starred = fetchJson(user.starred_url.substring(0, user.starred_url.indexOf('{')));
    return Promise.all([userDetails, starred]).then(([user, starred]) => ({ user, starred }));
}

