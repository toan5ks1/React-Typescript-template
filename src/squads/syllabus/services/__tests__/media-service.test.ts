import { genId } from "src/squads/syllabus/common/utils/generator";
import {
    MediasManyQueryVariables,
    Syllabus_MediasManyQueryVariables,
} from "src/squads/syllabus/services/bob/bob-types";
import { NsBobUploadReaderService } from "src/squads/syllabus/services/bob/upload-reader-service-bob/types";

import { mediaQueriesBob, mediaServiceBob } from "../bob/media-service-bob";
import { uploadReaderServiceBob, classServiceClientBob } from "../bob/upload-reader-service-bob";
import { mediaService } from "../media-service";

jest.mock("src/squads/syllabus/services/bob/media-service-bob/media-service-bob.query", () => ({
    __esModule: true,
    default: {
        getMany: jest.fn(),
        getManyV2: jest.fn(),
    },
}));

jest.mock(
    "src/squads/syllabus/services/bob/upload-reader-service-bob/upload-reader-service-bob",
    () => ({
        __esModule: true,
        default: {
            filterAndUploadFiles: jest.fn(),
            uploadBrightcove: jest.fn(),
        },
        classServiceClientBob: {
            upsertMedias: jest.fn(),
        },
    })
);

jest.mock("src/squads/syllabus/services/bob/media-service-bob/media-service-bob.mutation", () => ({
    __esModule: true,
    default: {
        uploadMedia: jest.fn(),
    },
}));

jest.mock("src/internals/feature-controller");

describe(mediaService.query.MEDIA_GET_MANY.name, () => {
    it("should not call query and return undefined when mediaIds is an empty array", async () => {
        const result = await mediaService.query.MEDIA_GET_MANY({ media_id: [] });

        expect(result).toBeUndefined();

        expect(mediaQueriesBob.getMany).not.toBeCalled();
    });

    it("should not call query and return undefined when mediaIds is a nullish value", async () => {
        const result = await mediaService.query.MEDIA_GET_MANY({ media_id: undefined });

        expect(result).toBeUndefined();

        expect(mediaQueriesBob.getMany).not.toBeCalled();
    });

    it("should return correct data after query success", async () => {
        const params: MediasManyQueryVariables = {
            media_id: ["media_1", "media_2"],
        };

        const response = genId();

        (mediaQueriesBob.getMany as jest.Mock).mockResolvedValue(response);

        const result = await mediaService.query.MEDIA_GET_MANY(params);

        expect(result).toEqual(response);

        expect(mediaQueriesBob.getMany).toBeCalledWith(params);
    });
});

describe(mediaService.query.syllabusMediaGetMany.name, () => {
    it("should not call query and return undefined when mediaIds is an empty array", async () => {
        const result = await mediaService.query.syllabusMediaGetMany({ media_id: [] });

        expect(result).toBeUndefined();

        expect(mediaQueriesBob.getManyV2).not.toBeCalled();
    });

    it("should not call query and return undefined when mediaIds is a nullish value", async () => {
        const result = await mediaService.query.syllabusMediaGetMany({ media_id: undefined });

        expect(result).toBeUndefined();

        expect(mediaQueriesBob.getManyV2).not.toBeCalled();
    });

    it("should return correct data after query success", async () => {
        const params: Syllabus_MediasManyQueryVariables = {
            media_id: ["media_1", "media_2"],
        };

        const response = genId();

        (mediaQueriesBob.getManyV2 as jest.Mock).mockResolvedValue(response);

        const result = await mediaService.query.syllabusMediaGetMany(params);

        expect(result).toEqual(response);

        expect(mediaQueriesBob.getManyV2).toBeCalledWith(params);
    });
});

describe(mediaService.mutation.UPLOAD_MEDIA.name, () => {
    it("should call uploadMedia and return correct after success", async () => {
        const response = "response_uploadMedia";

        const payload: NsBobUploadReaderService.ResumableUploadURLRequest = {
            files: [],
        };
        (mediaServiceBob.uploadMedia as jest.Mock).mockResolvedValue(response);

        const result = await mediaService.mutation.UPLOAD_MEDIA(payload);

        expect(result).toEqual(response);

        expect(mediaServiceBob.uploadMedia).toBeCalledWith(payload.files);
    });
});

describe(mediaService.mutation.MEDIA_FILTER_AND_UPLOAD_FILES.name, () => {
    it("should call filterAndUploadFiles and return correct after success", async () => {
        const response = "response_filterAndUploadFiles";

        (uploadReaderServiceBob.filterAndUploadFiles as jest.Mock).mockResolvedValue(response);

        const result = await mediaService.mutation.MEDIA_FILTER_AND_UPLOAD_FILES([]);

        expect(result).toEqual(response);

        expect(uploadReaderServiceBob.filterAndUploadFiles).toBeCalledWith([]);
    });
});

describe(mediaService.mutation.MEDIA_UPLOAD_VIDEO.name, () => {
    it("should call uploadBrightcove and return correct after success", async () => {
        const response = "response_uploadBrightcove";

        (uploadReaderServiceBob.uploadBrightcove as jest.Mock).mockResolvedValue(response);

        const result = await mediaService.mutation.MEDIA_UPLOAD_VIDEO([]);

        expect(result).toEqual(response);

        expect(uploadReaderServiceBob.uploadBrightcove).toBeCalledWith([]);
    });
});

describe(mediaService.mutation.syllabusUpsertMedias.name, () => {
    it("should call upsertMedia and return correct after success", async () => {
        const response = "response_upsertMedia";

        (classServiceClientBob.upsertMedias as jest.Mock).mockResolvedValue(response);

        const result = await mediaService.mutation.syllabusUpsertMedias([]);

        expect(result).toEqual(response);

        expect(classServiceClientBob.upsertMedias).toBeCalledWith([]);
    });
});
