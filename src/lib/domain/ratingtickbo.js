
import { createMutation, createSubscription } from '../../lib/graphql-ws.js';

export class RatingTickBO {
    // let gqlwsClient;
    // let gqlwsObservable;
    // let gqlwsSubscriptions = [];

    constructor(options) {
        this.config = {};

        console.log("options: ", options);
        if(options.client) {
            console.log("assigning private options");
            // this.config = [...options];
            this.config.client = options.client;
        }
        else {
            console.log("no options");
        }

        if(this.config && this.config.client) {
            console.log("this.config.client: ", this.config.client);
            this.gqlwsClient = this.config.client;
        }
        else {
            console.log("no gqlwsClient");
        }
    }

    insert(record) {

        const gql = `mutation MyMutation($focusgroup:String, $username:String, $rating:Int) {
            insert_ratingtick_one(object: {focusgroup: $focusgroup, username: $username, 
              rating: $rating}) {
              id
            }
          }
          `;
        const variables = record;

        return createMutation(this.gqlwsClient, gql, variables);
    }

    update(record) {

    }

    del(record) {

    }

}
