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
const searchDefaults = { sort: "joined", order: "asc", page: 1, perPage: 30};

export async function searchDetailed(query, params) {
    let searchResults = await searchSimple(query, params);
    let userDetails = await Promise.all(searchResults.items.map(u => getOne(u.login)));
    return {
        totalResults: searchResults.totalResults,
        items: userDetails.map(userModel)
    }
}

export async function searchSimple(query, params) {
    if (!query) return Promise.resolve({ totalResults: null, items: [] })
    let { sort, order, page, perPage } = {...searchDefaults, ...(params||{})};
    let searchResults = await fetchJson(gitHubApiRequest('search/users', { q: query, sort, order, page, per_page: perPage }));

    return {
        totalResults: searchResults.total_count,
        items: searchResults.items,
    };
}

let fetchJson = request => fetch(request).then(response => response.json());

let userModel = user => ({
    login: user.login,
    name: user.name || user.login,
    link: user.html_url,
    company: user.company || '',
    stars: 0,
    followers: user.followers,
    following: user.following,
    publicRepositories: user.public_repos,
    avatarUrl: user.avatar_url,
    followersLink: user.html_url + '?tab=followers',
    repositoriesLink: user.html_url + '?tab=repositories',
    followingLink: user.html_url + '?tab=following',
    location: user.location || ''
});

export function getOne(login) {
    return fetchJson(gitHubApiRequest(`users/${login}`));
}

// In a normal app I would use a lib or write a small REST module but since this we're only making this one call keep it simple
let queryString = (query) =>
    Object.keys(query).map(key => `${key}=${query[key]}`).join('&');

function gitHubApiRequest(resource, query) {
    const gitHubApiUrl = 'https://api.github.com';
    let resourceUrl =`${gitHubApiUrl}/${resource}`;
    let url = query ? `${resourceUrl}?${queryString(query)}`:  resourceUrl;
    return url;
}