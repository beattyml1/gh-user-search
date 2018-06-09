// In a normal app I would use a lib or write a small REST module but since this we're only making this one call keep it simple
let queryString = (query) =>
    Object.keys(query).map(key => `${key}=${query[key]}`).join('&');

export const fetchJson = request => fetch(request).then(response => response.json());

export function get(api, resource, query) {
    let resourceUrl =`${api}/${resource}`;
    let url = query ? `${resourceUrl}?${queryString(query)}`:  resourceUrl;
    return url;
}

export const gitHubApi = 'https://api.github.com';