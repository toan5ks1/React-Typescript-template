import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetLocationNameByLocationIdQueryVariables,
    Payment_GetLocationNameByLocationIdQuery,
} from "src/squads/payment/service/fatima/fatima-types";
import { InheritedHasuraServiceClient } from "src/squads/payment/service/service-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

const GetLocationNameByLocationId = gql`
    query Payment_GetLocationNameByLocationId($location_id: String!) {
        locations(where: { location_id: { _eq: $location_id } }) {
            name
        }
    }
`;

class LocationsQueriesFatima extends InheritedHasuraServiceClient {
    async getTitle(
        variables: Payment_GetLocationNameByLocationIdQueryVariables
    ): Promise<ArrayElement<Payment_GetLocationNameByLocationIdQuery["locations"]> | undefined> {
        const res = await this._call<Payment_GetLocationNameByLocationIdQuery>({
            query: GetLocationNameByLocationId,
            variables,
        });

        return res.data?.locations[0];
    }
}

const locationsQueriesFatima = new LocationsQueriesFatima(appConfigs, "fatimaGraphQL", doQuery);

export default locationsQueriesFatima;
