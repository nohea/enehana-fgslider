import { j as json } from "../../../../chunks/index2.js";
import dotenv from "dotenv";
import { c as createGQLWSClient, a as createMutation } from "../../../../chunks/graphql-ws.js";
import WebSocket from "ws";
dotenv.config();
async function GET({ params }) {
  return json({
    test: "ok"
  });
}
async function POST({ params }) {
  await removeExcessRecords();
  throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
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
    if (result.data) {
      data = result.data;
    }
  });
  return data;
}
export {
  GET,
  POST
};
