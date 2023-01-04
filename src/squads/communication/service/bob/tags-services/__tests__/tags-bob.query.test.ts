import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/communication/internals/hasura-client/execute-query";
import {
    Communication_GetListTagNameByTagIdsQuery,
    Communication_GetListTagsByTagIdsQuery,
    Communication_GetListTagNameByTagIdsQueryVariables,
    Communication_GetTagsManyReferenceQuery,
    Communication_GetTagsManyReferenceQueryVariables,
    Communication_GetListTagsByTagIdsQueryVariables,
    Communication_GetTagsSelectedByNotificationIdQuery,
    Communication_GetTagsSelectedByNotificationIdQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import {
    createMockTagNameByTagIds,
    createMockTagsByTagIds,
    createMockTagsManyReferenceQueryReturn,
    createMockTagsSelectedByNotificationIdQueryReturn,
} from "src/squads/communication/test-utils/query-data";

import tagQueriesBob from "src/squads/communication/service/bob/tags-services/tags-bob.query";

jest.mock("src/squads/communication/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockQueryTagManyReferenceReturn = createMockTagsManyReferenceQueryReturn();
const mockQueryListTagNameByTagIds = createMockTagNameByTagIds();
const mockQueryListTagByTagIds = createMockTagsByTagIds();
const mockQueryTagsSelectedByNotificationId = createMockTagsSelectedByNotificationIdQueryReturn();

describe("tags-bob.query", () => {
    it("should get list of tags correctly", async () => {
        const variables: Communication_GetTagsManyReferenceQueryVariables = {
            name: "tagName",
            offset: 0,
            limit: 10,
        };

        const getManyTagsReferenceReturnData: HasuraAndDefaultResponse<Communication_GetTagsManyReferenceQuery> =
            {
                data: mockQueryTagManyReferenceReturn,
            };

        (doQuery as jest.Mock).mockReturnValue(getManyTagsReferenceReturnData);

        const result = await tagQueriesBob.getManyReferenceAutocomplete(variables);

        expect(result).toEqual(mockQueryTagManyReferenceReturn.tags);
    });

    it("should get list tag name of tag ids correctly", async () => {
        const variables: Communication_GetListTagNameByTagIdsQueryVariables = {
            tag_ids: ["tag_id_1"],
        };

        const getListTagNameByTagIdsReturnData: HasuraAndDefaultResponse<Communication_GetListTagNameByTagIdsQuery> =
            {
                data: {
                    tags: mockQueryListTagNameByTagIds,
                },
            };

        (doQuery as jest.Mock).mockReturnValue(getListTagNameByTagIdsReturnData);

        const result = await tagQueriesBob.getListTagNameByTagIds(variables);

        expect(result).toEqual(mockQueryListTagNameByTagIds);
    });

    it("should get list of tag by tag ids correctly", async () => {
        const variables: Communication_GetListTagsByTagIdsQueryVariables = {
            tag_ids: ["tagId1"],
        };

        const getListTagByTagIdsReturnData: HasuraAndDefaultResponse<Communication_GetListTagsByTagIdsQuery> =
            {
                data: {
                    tags: mockQueryListTagByTagIds,
                },
            };

        (doQuery as jest.Mock).mockReturnValue(getListTagByTagIdsReturnData);

        const result = await tagQueriesBob.getTagsByTagIds(variables);

        expect(result).toEqual(mockQueryListTagByTagIds);
    });

    it("should get tags selected by notification id correctly", async () => {
        const variables: Communication_GetTagsSelectedByNotificationIdQueryVariables = {
            notification_id: "notification_id_1",
        };

        const getManyTagsReferenceReturnData: HasuraAndDefaultResponse<Communication_GetTagsSelectedByNotificationIdQuery> =
            {
                data: {
                    tags: mockQueryTagsSelectedByNotificationId,
                },
            };

        (doQuery as jest.Mock).mockReturnValue(getManyTagsReferenceReturnData);

        const result = await tagQueriesBob.getTagsSelectedByNotificationId(variables);

        expect(result).toEqual(mockQueryTagsSelectedByNotificationId);
    });
});
