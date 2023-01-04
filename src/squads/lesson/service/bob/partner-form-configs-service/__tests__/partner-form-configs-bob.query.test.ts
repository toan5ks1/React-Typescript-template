import graphqlClient from "src/squads/lesson/internals/hasura-client";
import reactiveStorage from "src/squads/lesson/internals/reactive-storage";
import {
    PartnerFormConfigByIdQueryVariables,
    PartnerFormConfigsOneQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { mockDataConfig } from "src/squads/lesson/test-utils/lesson-report";
import { getFakeLocalUser } from "src/squads/lesson/test-utils/mocks/user";

import partnerFormConfigsQueriesBob from "src/squads/lesson/service/bob/partner-form-configs-service/partner-form-configs-bob.query";

jest.mock("@manabie-com/graphql-client", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
            return { request: jest.fn() };
        }),
    };
});

const user = getFakeLocalUser();

describe("partner-form-configs-bob.query", () => {
    beforeEach(() => {
        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: { partner_form_configs: [mockDataConfig] },
        });

        reactiveStorage.set("PROFILE", user);
    });

    it("should query getOne success", async () => {
        const variables: PartnerFormConfigByIdQueryVariables = {
            form_config_id: "form config id",
        };

        const _callSpy = jest.spyOn(partnerFormConfigsQueriesBob, "_call");
        const result = await partnerFormConfigsQueriesBob.getOne(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockDataConfig);
    });

    it("should query getOneLatestConfig success", async () => {
        const variables: PartnerFormConfigsOneQueryVariables = {
            feature_name: "feature name",
            school_id: 1,
        };

        const _callSpy = jest.spyOn(partnerFormConfigsQueriesBob, "_call");
        const result = await partnerFormConfigsQueriesBob.getOneLatestConfig(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockDataConfig);
    });
});
