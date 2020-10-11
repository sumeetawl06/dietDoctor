import {ApolloClient, ApolloQueryResult, InMemoryCache} from '@apollo/client';
import { gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://ddapi.production.dietdoctor.com/v1',
    cache: new InMemoryCache()
});

const queryString = gql`query GetRecipes($page: Int, $pageSize: Int, $tagFilters: [String]) {
    listRecipes(input: {page: $page, includePremiumPreview: true, pageSize:$pageSize, tagFilters: $tagFilters}) {
        recipes {
            isMembersOnly
            id
            title
            description
            rating
            modifiedAt
            slug
            nutrition {
                values {
                    carbs
                    fat
                    protein

                    calories
                    fiber
                    __typename
                }

                __typename
            }
            images {
                hz
                vt

                brightness
                __typename
            }
        }
        totalSize
        nextPage
        __typename 
        }
}
    `

client
    .query({
        query: queryString
    })
    .then(result => console.log(result));

export class APIClient {

    getRecipes(): Promise<ApolloQueryResult<any>> {
        return client.query({
            query: queryString
        }).then(result => {
            if (result.errors) {
                throw result
            } else {
                return result
            }
        }).catch(error => {
            // Do on error
            return error
        });
    }
}
