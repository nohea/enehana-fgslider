import dotenv from 'dotenv';
import { createGQLWSClient, createMutation } from '$lib/graphql-ws';
import WebSocket from 'ws';

dotenv.config();

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {

	return {
		body: {
            test: "ok",
		}
	};
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ params }) {
	// const { slug } = params;

	let result = await removeExcessRecords();

	return {
		body: result
	};
}

async function removeExcessRecords() {
	const gqlwsClientUrl = process.env["SSR_HASURA_GRAPHQL_URL"] || "-";
	console.log("gqlwsClientUrl: ", gqlwsClientUrl);
    const gqlwsClient = createGQLWSClient(gqlwsClientUrl, WebSocket);

    const gql = `mutation DeleteRatingTicksMutation {
delete_ratingtick(where: {id: {_gt: 10}}) {
affected_rows
}
}`;
    const variables = {};

	let data;
	
    await createMutation(gqlwsClient, gql, variables).then((result) => {
        // console.log(result);
        if(result.data) {
			// { data: { delete_ratingtick: { affected_rows: 0 } } }
			data = result.data;
			// console.log(data);
		}
    });

	return data;
}

