import { pick1stElement } from "src/common/utils/other";
import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/communication/internals/hasura-client/execute-query";
import {
    MediasManyQuery,
    MediasManyQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { createMockMediaMany } from "src/squads/communication/test-utils/query-data";

import mediaQueriesBob from "src/squads/communication/service/bob/media-service/media-bob.query";

jest.mock("src/squads/communication/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockMediaMany = createMockMediaMany();

describe("Query medias", () => {
    it("should get list of medias correctly", async () => {
        const media = pick1stElement(mockMediaMany);

        const variables: MediasManyQueryVariables = {
            media_id: media?.media_id,
        };
        const mockManyMediaQueryResponse: HasuraAndDefaultResponse<MediasManyQuery> = {
            data: {
                media: mockMediaMany,
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockManyMediaQueryResponse);

        const result = await mediaQueriesBob.getMany(variables);

        expect(result).toEqual(mockMediaMany);
    });

    it("should return undefined value", async () => {
        const variables: MediasManyQueryVariables = {
            media_id: undefined,
        };
        const mockManyMediaQueryResponse: HasuraAndDefaultResponse<MediasManyQuery> = {
            data: null,
        };

        (doQuery as jest.Mock).mockReturnValue(mockManyMediaQueryResponse);

        const result = await mediaQueriesBob.getMany(variables);

        expect(result).toEqual(undefined);
    });
});
