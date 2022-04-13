const nock = require('nock');
const assert = require('assert');

require('../server.js');
const { fetch, getAllUsers } = require('../user.js'); 
const mockUsers1 = require('./users1.json');
const mockUsers2 = require('./users2.json');
const memberships = require('./memberships.json');
const baseURL = process.env.API_HOST;

describe('User', function () {
    describe('#fetch', function () {
        it('should return mock user data with corect url', async function () {

            nock('https://change-me.mockapi.io/api')
                .get('/registeredusers')
                .reply(200, mockUsers1)
            
            let data = await fetch(baseURL + registeredUsers).then(res => res);
            assert.equal(2, data.length);
            assert.equal(data[0].id, 20);
        });
    });

    describe('#getAllUsers', async function () {
        it('should return 500 with wrong url', async function () {

            nock('https://change-me.mockapi.io/api').get('/registeredusers').reply(500)

            let ctx = { body:{}, response: {}};
            await getAllUsers(ctx)

            assert.equal(500, ctx.response.status);
        });
    });

    describe('#getAllUsers', async function () {
        it('should return full set of users with projectIds', async function () {

            nock('https://change-me.mockapi.io/api').persist()
                .get('/registeredusers').reply(200, mockUsers1)
                .get('/unregisteredusers').reply(200, mockUsers2)
                .get('/projectmemberships').reply(200, memberships)

            let ctx = { body:{}, response: {}};
            await getAllUsers(ctx)

            assert.equal(5, ctx.body.length);
            assert.equal(2, ctx.body[0].projectIds.length);
            assert.equal(0, ctx.body[2].projectIds.length);
            assert.equal("18", ctx.body[0].projectIds[0]);
        });
    });
});
