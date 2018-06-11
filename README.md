This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

I usually favor TypeScript over JavaScript and have mostly used Redux with React so I went straight JS and straight React to shake up my skills.

I chose REST over GraphQL for the first run because it was both more familiar, the docs were easier to follow, and it did not require authentication.

I used the following tools and libs in addition to react:
- create-react-app
- react-paginate
- jest
- fetch-mock
- RxJS (a minor, more for fun than anything usage)

I also started working on a GraphQL implementation the Users service but it required implementing OAuth and thus introducing a backend as well likely requiring a different paging library or configuration since some of the paging features aren't supported by the GitHub GraphQL paging API.

There is one known bug: since the app is not authenticated when it reaches the rate limit it will stop working properly. I have downed the page size which helps. The real solution is to implement OAuth.

Performance on a slow network tolerable but not great. It could be improved by switching to GraphQL.

Primary testing in chrome light testing in Firefox and Safari. Expected to work through polyfills in IE or Edge but did not have VMs setup to test and since I expect 0% of my users to be using them I ended up skipping.