
import { createClient } from 'graphql-ws';
import { Observable } from 'rxjs';

export function createGQLWSClient(url) {
    // console.log(`createGQLWSClient(${url})`);
    return createClient({
        url: url,
    });
}

export async function createQuery(client, gql, variables) {
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
                error: reject,
                complete: () => resolve(result)
            }
        );
    });
}

export async function createMutation(client, gql, variables) {
    // same as query
    return createQuery(client, gql, variables);
}

export function createSubscription(client, gql, variables, unsubcb) {
    // subscription
    // console.log("createSubscription()");
    const operation = {
        query: gql,
        variables: variables,
    };
    return toObservable(client, operation, unsubcb);
}

// wrap up the graphql-ws subscription in an observable
function toObservable(client, operation, unsubcb) {
    // console.log("toObservable()");
    return new Observable((observer) => {
        const unsubscribe = client.subscribe(operation, {
            next: (data) => observer.next(data),
            error: (err) => observer.error(err),
            complete: () => observer.complete() // unsubscribe?
        });
        unsubcb(unsubscribe); // return back to top level caller
    });
}

