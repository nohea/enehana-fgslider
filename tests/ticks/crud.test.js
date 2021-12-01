import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { RatingTickBO } from '../../src/lib/domain/ratingtickbo.js';
import { testconfig } from '../testconfig.js';
import { createGQLWSClient } from '../../src/lib/graphql-ws.js';
import WebSocket from 'ws';

// test('ratingtick insert fail', () => {
//     const bo = new RatingTickBO();

//     const result = bo.insert();

//     assert.is(false, result);
// });

test('ratingtick insert pass', () => {

    const gqlwsClient = createGQLWSClient(testconfig.VITE_HASURA_GRAPHQL_URL, WebSocket);

    let options = {
        client: gqlwsClient,
    };

    const bo = new RatingTickBO(options);

    const ratingTick = {
        focusgroup: "quad",
        username: "joey",
        rating: '34',
    };

    let resultData = {};

    bo.insert(ratingTick).then((data) => {
        console.log("data: ", data);
        resultData = {...data};
    });

    console.log("resultData: ", resultData);
    assert.ok(resultData.data.insert_ratingtick_one.id);
    assert.is.not({}, resultData);

    // TODO fix out of order async
});

test.run();
