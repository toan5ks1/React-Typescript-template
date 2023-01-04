import { upsertNotificationTagParams } from "src/squads/communication/test-utils/query-data";

import { TagMgmtModifierServicePromiseClient } from "manabuf/notificationmgmt/v1/tags_grpc_web_pb";
import { UpsertTagRequest } from "manabuf/notificationmgmt/v1/tags_pb";

import { MutationParams } from "@manabie-com/react-utils";
import tagManagementMutationService, {
    createUpsertTagRequest,
} from "src/squads/communication/service/notificationmgmt/tag-management-service/tag-management-modifier.mutation";

jest.mock("manabuf/notificationmgmt/v1/tags_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/notificationmgmt/v1/tags_grpc_web_pb");

    actual.TagMgmtModifierServicePromiseClient.prototype.upsertTag = jest.fn();

    return actual;
});

const mockReturnUpsertTag = {
    message: "FAKE_RETURN",
    toObject: () => "FAKE_TO_OBJECT_RETURN",
};

describe("create tag by tagManagementMutationService.upsertTag", () => {
    it("should create tag successfully when calling upsertTag", async () => {
        (TagMgmtModifierServicePromiseClient.prototype.upsertTag as jest.Mock).mockImplementation(
            () => {
                return mockReturnUpsertTag;
            }
        );

        const params: MutationParams<UpsertTagRequest.AsObject> = {
            data: upsertNotificationTagParams,
        };

        await tagManagementMutationService.upsertTag(params);

        expect(TagMgmtModifierServicePromiseClient.prototype.upsertTag).toBeCalledWith(
            createUpsertTagRequest(upsertNotificationTagParams)
        );
    });

    it("should throw error when calling upsertTag with invalid data", async () => {
        const params: MutationParams<UpsertTagRequest.AsObject> = {
            data: undefined,
        };

        await expect(async () => {
            await tagManagementMutationService.upsertTag(params);
        }).rejects.toMatchObject({
            message: "ra.message.invalid_form",
            name: "AppError",
        });
    });
});
