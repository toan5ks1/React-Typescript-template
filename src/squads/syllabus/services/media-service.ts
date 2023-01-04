import { arrayHasItem } from "src/common/utils/other";
import {
    MediasManyQueryVariables,
    Syllabus_MediasManyQueryVariables,
} from "src/squads/syllabus/services/bob/bob-types";
import { NsBobUploadReaderService } from "src/squads/syllabus/services/bob/upload-reader-service-bob/types";

import { mediaQueriesBob, mediaServiceBob } from "./bob/media-service-bob";
import { classServiceClientBob, uploadReaderServiceBob } from "./bob/upload-reader-service-bob";
import { defineService } from "./service-creator";
import { createEmptyResponse } from "./utils/utils";

import { Media } from "src/squads/syllabus/__generated__/bob/root-types";

export const mediaService = defineService({
    query: {
        MEDIA_GET_MANY: (params: MediasManyQueryVariables) => {
            const { media_id } = params;

            if (arrayHasItem(media_id)) return mediaQueriesBob.getMany(params);

            return createEmptyResponse(undefined);
        },
        syllabusMediaGetMany: (params: Syllabus_MediasManyQueryVariables) => {
            const { media_id } = params;

            if (arrayHasItem(media_id)) return mediaQueriesBob.getManyV2(params);

            return createEmptyResponse(undefined);
        },
    },
    mutation: {
        UPLOAD_MEDIA: (data: NsBobUploadReaderService.ResumableUploadURLRequest) => {
            const { files } = data;
            return mediaServiceBob.uploadMedia(files);
        },
        MEDIA_FILTER_AND_UPLOAD_FILES: (files: (Media | File)[]) => {
            return uploadReaderServiceBob.filterAndUploadFiles(files);
        },
        MEDIA_UPLOAD_VIDEO: (payload: File[]) => {
            return uploadReaderServiceBob.uploadBrightcove(payload);
        },
        syllabusUpsertMedias: (payload: NsBobUploadReaderService.UpsertMedia[]) => {
            return classServiceClientBob.upsertMedias(payload);
        },
    },
});
