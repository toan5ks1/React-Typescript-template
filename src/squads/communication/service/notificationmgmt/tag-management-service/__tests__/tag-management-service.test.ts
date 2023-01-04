import { tagManagementService } from "src/squads/communication/service/notificationmgmt/tag-management-service/tag-management-service";
import { upsertNotificationTagParams } from "src/squads/communication/test-utils/query-data";

import { UpsertTagRequest } from "manabuf/notificationmgmt/v1/tags_pb";

import { MutationParams } from "@manabie-com/react-utils";
import tagManagementNotificationMutationService from "src/squads/communication/service/notificationmgmt/tag-management-service/tag-management-modifier.mutation";

jest.mock(
    "src/squads/communication/service/notificationmgmt/tag-management-service/tag-management-modifier.mutation",
    () => {
        return {
            __esModule: true,
            default: {
                upsertTag: jest.fn(),
            },
        };
    }
);

describe("create tag by communicationTagUpsert", () => {
    it("should return correct response when upsert notification tag", async () => {
        const queryVariable: MutationParams<UpsertTagRequest.AsObject> = {
            data: upsertNotificationTagParams,
        };

        (tagManagementNotificationMutationService.upsertTag as jest.Mock).mockResolvedValue(
            upsertNotificationTagParams.tagId
        );

        const response = await tagManagementService.mutation.communicationUpsertTag(queryVariable);

        expect(tagManagementNotificationMutationService.upsertTag).toBeCalledWith(queryVariable);
        expect(response).toEqual(upsertNotificationTagParams.tagId);
    });
});
