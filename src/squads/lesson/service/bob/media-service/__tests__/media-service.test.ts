import { genId } from "src/common/utils/id-generator";
import { MediasManyQueryVariables } from "src/squads/lesson/service/bob/bob-types";
import { mediaService } from "src/squads/lesson/service/bob/media-service/media-service";

import mediaQueriesBob from "src/squads/lesson/service/bob/media-service/media-bob.query";

jest.mock("src/squads/lesson/service/bob/media-service/media-bob.query", () => {
    return {
        __esModule: true,
        default: {
            getMany: jest.fn(),
        },
    };
});

describe("media-service", () => {
    it("should get many medias by calling mediaGetMany method", async () => {
        const queryVariable: MediasManyQueryVariables = {
            media_id: ["Media ID 1", "Media ID 2"],
        };

        const fakeMediasReturn = genId();
        (mediaQueriesBob.getMany as jest.Mock).mockResolvedValue(fakeMediasReturn);

        const response = await mediaService.query.mediaGetMany(queryVariable);

        expect(mediaQueriesBob.getMany).toBeCalledWith(queryVariable);
        expect(response).toEqual(fakeMediasReturn);
    });

    it("shouldn't call query and return undefined when mediaIds is an empty array", async () => {
        const params: MediasManyQueryVariables = { media_id: [] };
        const response = await mediaService.query.mediaGetMany(params);

        expect(response).toBeUndefined();
        expect(mediaQueriesBob.getMany).not.toBeCalled();
    });

    it("shouldn't call query and return undefined when mediaIds is not an array", async () => {
        const params: MediasManyQueryVariables = { media_id: undefined };
        const response = await mediaService.query.mediaGetMany(params);

        expect(response).toBeUndefined();
        expect(mediaQueriesBob.getMany).not.toBeCalled();
    });
});
