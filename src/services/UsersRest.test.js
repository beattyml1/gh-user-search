import fetchMock  from 'fetch-mock';
import {searchDetailed} from './UsersRest';

describe('UserRest.search',  () => {
    describe('5 dev, 2 per page data set', () => {
        beforeEach(() => {
            fetchMock.get('begin:https://api.github.com/search/users', {
                total_count: 5,
                items: [
                    {login:'janedev', url: 'https://api.github.com/users/janedev', starred_url: 'https://api.github.com/users/janedev/starred{'},
                    {login:'johndev', url: 'https://api.github.com/users/johndev', starred_url: 'https://api.github.com/users/johndev/starred{'}
                ]
            });
            fetchMock.get('https://api.github.com/users/janedev/starred', []);
            fetchMock.get('https://api.github.com/users/johndev/starred', []);
            fetchMock.get('https://api.github.com/users/janedev', {login:'janedev',name:'Developer'});
            fetchMock.get('https://api.github.com/users/johndev', {login:'johndev',name:'Developer'});
        });
        afterEach(() => fetchMock.restore());
        it('should return totalResults of 5', async () => {
            expect.assertions(1);
            let result = await searchDetailed('j', {});
            return expect(result.totalResults).toBe(5);
        });

        it('should return 2 items', async () => {
            expect.assertions(1);
            let result = await searchDetailed('j', {});
            return expect(result.items).toHaveLength(2);
        });
        it('should return results with a name', async () => {
            expect.assertions(1);
            let result = await searchDetailed('j', {});
            return expect(result.items[0]).toMatchObject({name: 'Developer'});
        });
    })
})