import { test, suite } from 'uvu';
import * as assert from 'uvu/assert';
import { RatingTickBO } from '../../src/lib/domain/ratingtickbo.js';
import { testconfig } from '../testconfig.js';
import { createGQLWSClient } from '../../src/lib/graphql-ws.js';
import WebSocket from 'ws';

const ts = suite('crud'); // test suite

let gqlwsClient;

ts.before(async () => {
    gqlwsClient = await createGQLWSClient(testconfig.VITE_HASURA_GRAPHQL_URL, WebSocket);
});
ts.before.each(async () => {});
ts.after.each(async () => {});
ts.after(async () => {});

test('ratingtick insert fail', () => {
    const bo = new RatingTickBO();

    const result = bo.insert();

    assert.is(false, result);
});

ts('ratingtick insert pass', async () => {

    const bo = new RatingTickBO({ client: gqlwsClient });

    const ratingTick = {
        focusgroup: "quad",
        username: "joey",
        rating: '34',
    };

    let resultData = {};

    await bo.insert(ratingTick)
    .then((data) => {
        console.log("data 1: ", data);
        resultData = {...data};
    })
    .then(() => {
        console.log("resultData: 2", resultData);
        assert.ok(resultData.data.insert_ratingtick_one.id);
    });

});

ts('ratingtick insert FAIL validator', async () => {

    const bo = new RatingTickBO({ client: gqlwsClient });

    // missing required prop
    const ratingTick = {
        focusgroup: "", 
        username: "joey",
        rating: '34',
    };

    let resultData = {};

    // bo insert should fail
    // https://github.com/lukeed/uvu/issues/35#issuecomment-896270152
    try {
        await bo.insert(ratingTick);
        // await bo.throw(ratingTick);
        assert.unreachable('should have thrown');
    }
    catch (err) {
        console.log("err handler triggers as expected: ", err);
        assert.instance(err, Error);
        assert.match(err.message, 'focusgroup is a required field');
    }

    console.log("assert.unreachable for throws ended");
});

ts.run();
