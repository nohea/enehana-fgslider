import { createClient } from "graphql-ws";
import { Observable } from "rxjs";
function createGQLWSClient(url, ws) {
  const options = {
    url
  };
  if (ws) {
    options["webSocketImpl"] = ws;
  }
  return createClient(options);
}
async function createQuery(client, gql, variables) {
  return await new Promise((resolve, reject) => {
    let result;
    client.subscribe(
      {
        query: gql,
        variables
      },
      {
        next: (data) => result = data,
        error: (err) => reject,
        complete: () => resolve(result)
      }
    );
  });
}
async function createMutation(client, gql, variables) {
  return createQuery(client, gql, variables);
}
function createSubscription(client, gql, variables) {
  const operation = {
    query: gql,
    variables
  };
  const rxjsobservable = toObservable(client, operation);
  return rxjsobservable;
}
function toObservable(client, operation) {
  return new Observable(function subscribe(subscriber) {
    client.subscribe(operation, {
      next: (data) => subscriber.next(data),
      error: (err) => subscriber.error(err),
      complete: () => subscriber.complete()
    });
    return function unsubscribe() {
      console.log("unsubscribe()");
    };
  });
}
export {
  createMutation as a,
  createSubscription as b,
  createGQLWSClient as c
};
