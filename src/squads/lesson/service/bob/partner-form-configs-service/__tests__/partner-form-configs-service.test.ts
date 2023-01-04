import {
    PartnerFormConfigByIdQueryVariables,
    PartnerFormConfigsOneQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { partnerFormConfigsService } from "src/squads/lesson/service/bob/partner-form-configs-service/partner-form-configs-service";
import { mockDataConfig } from "src/squads/lesson/test-utils/lesson-report";

import partnerFormConfigsQueriesBob from "src/squads/lesson/service/bob/partner-form-configs-service/partner-form-configs-bob.query";

jest.mock(
    "src/squads/lesson/service/bob/partner-form-configs-service/partner-form-configs-bob.query",
    () => ({
        __esModule: true,
        default: {
            getOne: jest.fn(),
            getOneLatestConfig: jest.fn(),
        },
    })
);

describe("partner-form-configs-service", () => {
    it("should query partnerFormConfigsGetOne", async () => {
        (partnerFormConfigsQueriesBob.getOne as jest.Mock).mockResolvedValue(mockDataConfig);

        const variables: PartnerFormConfigByIdQueryVariables = {
            form_config_id: "form config id",
        };

        const response = await partnerFormConfigsService.query.partnerFormConfigsGetOne(variables);
        expect(partnerFormConfigsQueriesBob.getOne).toBeCalledWith(variables);
        expect(response).toEqual(mockDataConfig);
    });

    it("should not query partnerFormConfigsGetOne with invalid parameter", async () => {
        (partnerFormConfigsQueriesBob.getOne as jest.Mock).mockResolvedValue(mockDataConfig);

        const variables: PartnerFormConfigByIdQueryVariables = {
            form_config_id: "",
        };

        await expect(async () => {
            await partnerFormConfigsService.query.partnerFormConfigsGetOne(variables);
        }).rejects.toMatchObject({
            action: "partnerFormConfigsGetOne",
            name: "InvalidParamError",
            errors: [{ field: "form_config_id" }],
            serviceName: "bobGraphQL",
        });

        expect(partnerFormConfigsQueriesBob.getOne).not.toBeCalled();
    });

    it("should query partnerFormConfigsGetOneLatestConfig", async () => {
        (partnerFormConfigsQueriesBob.getOneLatestConfig as jest.Mock).mockResolvedValue(
            mockDataConfig
        );

        const variables: PartnerFormConfigsOneQueryVariables = {
            feature_name: "feature name",
            school_id: 1,
        };

        const response = await partnerFormConfigsService.query.partnerFormConfigsGetOneLatestConfig(
            variables
        );
        expect(partnerFormConfigsQueriesBob.getOneLatestConfig).toBeCalledWith(variables);

        expect(response).toEqual(mockDataConfig);
    });

    it("should not query partnerFormConfigsGetOneLatestConfig with invalid parameter", async () => {
        (partnerFormConfigsQueriesBob.getOneLatestConfig as jest.Mock).mockResolvedValue(
            mockDataConfig
        );

        const variables: PartnerFormConfigsOneQueryVariables = {
            feature_name: undefined,
        };

        await expect(async () => {
            await partnerFormConfigsService.query.partnerFormConfigsGetOneLatestConfig(variables);
        }).rejects.toMatchObject({
            action: "partnerFormConfigsGetOneLatestConfig",
            name: "InvalidParamError",
            errors: [{ field: "feature_name" }],
            serviceName: "bobGraphQL",
        });

        expect(partnerFormConfigsQueriesBob.getOneLatestConfig).not.toBeCalled();
    });
});
