import {
    Payment_GetLocationNameByLocationIdQuery,
    Payment_GetLocationNameByLocationIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { locationsService } from "src/squads/payment/service/fatima/locations-service/locations-service";
import { InvalidParamError } from "src/squads/payment/service/service-types";

import locationsQueriesFatima from "src/squads/payment/service/fatima/locations-service/locations-fatima.query";

jest.mock("src/squads/payment/service/fatima/locations-service/locations-fatima.query", () => {
    return {
        __esModule: true,
        default: {
            getTitle: jest.fn(),
        },
    };
});

describe("locations-service", () => {
    it("should return title when calling paymentGetLocationTitleByLocationId", async () => {
        const queryVariable: Payment_GetLocationNameByLocationIdQueryVariables = {
            location_id: "location_id_1",
        };

        const mockQueryReturn: Payment_GetLocationNameByLocationIdQuery["locations"] = [
            {
                name: "Location name",
            },
        ];

        (locationsQueriesFatima.getTitle as jest.Mock).mockResolvedValue(mockQueryReturn);

        const response = await locationsService.query.paymentGetLocationTitleByLocationId(
            queryVariable
        );

        expect(locationsQueriesFatima.getTitle).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockQueryReturn);
    });

    it("should throw an error if location_id is empty when calling paymentGetLocationTitleByLocationId", async () => {
        const queryVariable: Payment_GetLocationNameByLocationIdQueryVariables = {
            location_id: "",
        };

        await expect(async () => {
            await locationsService.query.paymentGetLocationTitleByLocationId(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetLocationTitleByLocationId",
                errors: [{ field: "location_id", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(locationsQueriesFatima.getTitle).not.toBeCalled();
    });
});
