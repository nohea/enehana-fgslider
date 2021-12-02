
import { RatingTickValidator } from '../../lib/validators/index.js';
import { createMutation, createSubscription } from '../../lib/graphql-ws.js';

export class RatingTickBO {

    constructor(options) {
        this.config = {};
        this.validator = RatingTickValidator;

        // console.log("options: ", options);
        if(options.client) {
            // this.config = [...options];
            this.config.client = options.client;
        }

        if(this.config && this.config.client) {
            console.log("this.config.client: ", this.config.client);
            this.gqlwsClient = this.config.client;
        }
        else {
            console.log("no gqlwsClient");
        }
    }

    async insert(record) {

        const gql = `mutation MyMutation($focusgroup:String, $username:String, $rating:Int) {
            insert_ratingtick_one(object: {focusgroup: $focusgroup, username: $username, 
              rating: $rating}) {
              id
            }
          }
          `;
        const variables = record;

        await this.validator.validate(record)
        .then((valid) => {
            console.log("validation passed: ", valid);
        })
        .catch(async function (err) {
            // err.name; // => 'ValidationError'
            // err.errors; // => [{ key: 'field_too_short', values: { min: 18 } }]
            console.log("validate catch: ", err);
            throw new Error(err);
        });

        return await createMutation(this.gqlwsClient, gql, variables);
    }

    async throw(record) {
        console.log("test throw err");
        throw new Error("test throw err");
    }

    update(record) {

    }

    del(record) {

    }

}
