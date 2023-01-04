import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetLocationNameByLocationIdQuery,
    Payment_GetLocationNameByLocationIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";

import locationsQueriesFatima from "src/squads/payment/service/fatima/locations-service/locations-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockLocationList: Payment_GetLocationNameByLocationIdQuery["locations"] = [
    {
        name: "location 1",
    },
];

const mockDoQueryReturnValue: HasuraAndDefaultResponse<Payment_GetLocationNameByLocationIdQuery> = {
    data: {
        locations: mockLocationList,
    },
};

describe("Query locations", () => {
    it("Get title", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: Payment_GetLocationNameByLocationIdQueryVariables = {
            location_id: "location_id_1",
        };

        const result = await locationsQueriesFatima.getTitle(variables);

        expect(result).toEqual(mockLocationList[0]);
    });
});
