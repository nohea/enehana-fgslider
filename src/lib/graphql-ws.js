
import { createClient } from 'graphql-ws';
import { observable, Observable } from 'rxjs';

export function createGQLWSClient(url, ws) {
    console.log(`createGQLWSClient(${url})`);

    const options = {
        url: url,
    };
    // add ws impl if ssr
    if(ws) {
        options['webSocketImpl'] = ws;
    }

    return createClient(options);
}

export async function createQuery(client, gql, variables) {
    console.log("createQuery()", gql, variables);
    // query
    return await new Promise((resolve, reject) => {
        let result;
        client.subscribe(
            {
                query: gql,
                variables: variables
            },
            {
                next: (data) => (result = data),
                error: (err) => reject,
                complete: () => resolve(result)
            }
        );
    });
}

export async function createMutation(client, gql, variables) {
    // same as query
    return createQuery(client, gql, variables);
}

export function createSubscription(client, gql, variables) {
    // hasura subscription
    console.log("createSubscription()");
    const operation = {
        query: gql,
        variables: variables,
    };
    const rxjsobservable = toObservable(client, operation);
    // console.log("rxjsobservable: ", rxjsobservable);
    return rxjsobservable;
}

// wrap up the graphql-ws subscription in an observable
function toObservable(client, operation) {
    console.log("toObservable()");
    // the graphql-ws subscription may be cleaned up here, 
    // not sure about the RxJs Observable
    // trying to make it more like the docs, w/custom unsubscribe() on subscription object
    // https://rxjs.dev/guide/observable
    return new Observable(function subscribe(subscriber) {
        console.log("subscribe()");
        const unsub = client.subscribe(operation, {
            next: (data) => subscriber.next(data),
            error: (err) => subscriber.error(err),
            complete: () => subscriber.complete()
        });

        // Provide a way of canceling and disposing resources
        return function unsubscribe() {
            console.log("unsubscribe() the graphql-ws client");
            unsub();
        };
    });
}

