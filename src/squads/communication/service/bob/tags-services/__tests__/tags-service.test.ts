import {
    Communication_GetListTagsByTagIdsQueryVariables,
    Communication_GetListTagNameByTagIdsQueryVariables,
    Communication_GetTagsManyReferenceQueryVariables,
    Communication_GetTagsSelectedByNotificationIdQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { tagsService } from "src/squads/communication/service/bob/tags-services/tags-service";
import {
    createMockTagsByTagIds,
    createMockTagNameByTagIds,
    createMockTagsManyReferenceQueryReturn,
    createMockTagsSelectedByNotificationIdQueryReturn,
} from "src/squads/communication/test-utils/query-data";

import tagQueriesBob from "src/squads/communication/service/bob/tags-services/tags-bob.query";

jest.mock("src/squads/communication/service/bob/tags-services/tags-bob.query", () => ({
    __esModule: true,
    default: {
        getManyReferenceAutocomplete: jest.fn(),
        getListTagNameByTagIds: jest.fn(),
        getTagsByTagIds: jest.fn(),
        getTagsSelectedByNotificationId: jest.fn(),
    },
}));

const mockQueryTagManyReferenceReturn = createMockTagsManyReferenceQueryReturn();
const mockQueryListTagNameByTagIds = createMockTagNameByTagIds();
const mockQueryListTagByTagIds = createMockTagsByTagIds();
const mockQueryTagsSelectedByNotificationId = createMockTagsSelectedByNotificationIdQueryReturn();

describe("tags service", () => {
    it("should return tags when calling communicationGetManyReferenceTags", async () => {
        const variables: Communication_GetTagsManyReferenceQueryVariables = {
            name: "tagName",
            limit: 10,
            offset: 0,
        };

        (tagQueriesBob.getManyReferenceAutocomplete as jest.Mock).mockResolvedValue(
            mockQueryTagManyReferenceReturn
        );

        const result = await tagsService.query.communicationGetManyReferenceTags(variables);

        expect(tagQueriesBob.getManyReferenceAutocomplete).toBeCalledWith(variables);
        expect(tagQueriesBob.getManyReferenceAutocomplete).toBeCalledTimes(1);
        expect(result).toEqual(mockQueryTagManyReferenceReturn);
    });

    it("should return list tag name when calling communicationGetListTagNameByTagIds", async () => {
        const variables: Communication_GetListTagNameByTagIdsQueryVariables = {
            tag_ids: ["tag_id_1"],
        };

        (tagQueriesBob.getListTagNameByTagIds as jest.Mock).mockResolvedValue(
            mockQueryListTagNameByTagIds
        );

        const result = await tagsService.query.communicationGetListTagNameByTagIds(variables);

        expect(tagQueriesBob.getListTagNameByTagIds).toBeCalledWith(variables);
        expect(tagQueriesBob.getListTagNameByTagIds).toBeCalledTimes(1);
        expect(result).toEqual(mockQueryListTagNameByTagIds);
    });

    it("should return list tag when calling communicationGetTagsByTagIds", async () => {
        const variables: Communication_GetListTagsByTagIdsQueryVariables = {
            tag_ids: ["tagId1"],
        };

        (tagQueriesBob.getTagsByTagIds as jest.Mock).mockReturnValue(mockQueryListTagByTagIds);

        const result = await tagsService.query.communicationGetTagsByTagIds(variables);

        expect(tagQueriesBob.getTagsByTagIds).toBeCalledWith(variables);
        expect(tagQueriesBob.getTagsByTagIds).toBeCalledTimes(1);
        expect(result).toEqual(mockQueryListTagByTagIds);
    });

    it("should return tags when calling communicationGetTagsSelectedByNotificationId", async () => {
        const variables: Communication_GetTagsSelectedByNotificationIdQueryVariables = {
            notification_id: "notification_id_1",
        };

        (tagQueriesBob.getTagsSelectedByNotificationId as jest.Mock).mockResolvedValue(
            mockQueryTagsSelectedByNotificationId
        );

        const result = await tagsService.query.communicationGetTagsSelectedByNotificationId(
            variables
        );

        expect(tagQueriesBob.getTagsSelectedByNotificationId).toBeCalledWith(variables);
        expect(tagQueriesBob.getTagsSelectedByNotificationId).toBeCalledTimes(1);
        expect(result).toEqual(mockQueryTagsSelectedByNotificationId);
    });
});
