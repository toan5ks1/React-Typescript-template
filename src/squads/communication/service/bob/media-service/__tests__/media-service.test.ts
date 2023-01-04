import { genId } from "src/common/utils/id-generator";
import { MediasManyQueryVariables } from "src/squads/communication/service/bob/bob-types";
import { mediaService } from "src/squads/communication/service/bob/media-service/media-service";
import uploadReaderServiceBob from "src/squads/communication/service/bob/upload-reader-service";

import { InputFile } from "src/squads/communication/hooks/useUploadFiles/types";
import mediaQueriesBob from "src/squads/communication/service/bob/media-service/media-bob.query";

jest.mock("src/squads/communication/service/bob/media-service/media-bob.query", () => {
    return {
        __esModule: true,
        default: {
            getMany: jest.fn(),
        },
    };
});

jest.mock("src/squads/communication/service/bob/upload-reader-service", () => {
    return {
        __esModule: true,
        default: {
            filterAndUploadFiles: jest.fn(),
            uploadBrightcove: jest.fn(),
        },
    };
});

describe("media-service", () => {
    it("should return media list", async () => {
        const queryResponse = genId();
        const queryVariable: MediasManyQueryVariables = { media_id: ["mediaId_01"] };

        (mediaQueriesBob.getMany as jest.Mock).mockResolvedValue(queryResponse);

        const response = await mediaService.query.communicationGetManyMedias(queryVariable);

        expect(mediaQueriesBob.getMany).toBeCalledWith(queryVariable);
        expect(response).toEqual(queryResponse);
    });

    it("shouldn't call query and return undefined when mediaIds is an empty array", async () => {
        const params: MediasManyQueryVariables = { media_id: [] };
        const response = await mediaService.query.communicationGetManyMedias(params);

        expect(response).toBeUndefined();
        expect(mediaQueriesBob.getMany).not.toBeCalled();
    });

    it("shouldn't call query and return undefined when mediaIds is not an array", async () => {
        const params: MediasManyQueryVariables = { media_id: undefined };
        const response = await mediaService.query.communicationGetManyMedias(params);

        expect(response).toBeUndefined();
        expect(mediaQueriesBob.getMany).not.toBeCalled();
    });

    it("should call filterAndUploadFiles on communicationFilterAndUploadFiles", async () => {
        const params: InputFile[] = [new File([], "fileName.pdf")];
        const response = await mediaService.mutation.communicationFilterAndUploadFiles(params);

        expect(response).toBeUndefined();
        expect(uploadReaderServiceBob.filterAndUploadFiles).toBeCalledWith(params);
    });
});
