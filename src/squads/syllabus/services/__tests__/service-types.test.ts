import { gql } from "graphql-tag";
import Configuration from "src/packages/configuration";
import { GraphqlBody } from "src/typings/graphql";

import { InheritedHasuraServiceClient } from "../service-types";

const mockGraphql: GraphqlBody = {
    query: gql`
        query MockGraphQl($book_id: String!) {
            books(where: { book_id: { _eq: $book_id } }) {
                name
            }
        }
    `,
};

const eurekaEndpoint = "eurekaGraphQLEndpoint";
const bobEndpoint = "bobGraphQLEndpoint";

const fakeGetEndpoints = () => ({
    eurekaGraphQL: eurekaEndpoint,
    bobGraphQL: bobEndpoint,
});

const doQueryFn = jest.fn();

describe(InheritedHasuraServiceClient.name, () => {
    it("should call eureka service when passed service name is eurekaGraphQL", () => {
        const ins = new InheritedHasuraServiceClient(
            { getEndpoints: fakeGetEndpoints } as Configuration,
            "eurekaGraphQL",
            doQueryFn
        );

        void ins._call(mockGraphql);

        expect(doQueryFn).toBeCalledWith(mockGraphql, eurekaEndpoint);
    });

    it("should call bob service when passed service name is bobGraphQL", () => {
        const ins = new InheritedHasuraServiceClient(
            { getEndpoints: fakeGetEndpoints } as Configuration,
            "bobGraphQL",
            doQueryFn
        );

        void ins._call(mockGraphql);

        expect(doQueryFn).toBeCalledWith(mockGraphql, bobEndpoint);
    });
});
