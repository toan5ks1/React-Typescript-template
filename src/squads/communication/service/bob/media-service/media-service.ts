import { arrayHasItem } from "src/common/utils/other";
import { MediasManyQueryVariables } from "src/squads/communication/service/bob/bob-types";
import uploadReaderServiceBob from "src/squads/communication/service/bob/upload-reader-service";
import { createEmptyResponse } from "src/squads/communication/service/utils/utils";

import mediaQueriesBob from "./media-bob.query";

import { defineService } from "@manabie-com/react-utils";
import { InputFile } from "src/squads/communication/hooks/useUploadFiles/types";

export const mediaService = defineService({
    query: {
        communicationGetManyMedias: (params: MediasManyQueryVariables) => {
            if (arrayHasItem(params.media_id)) return mediaQueriesBob.getMany(params);

            return createEmptyResponse(undefined);
        },
    },
    mutation: {
        communicationFilterAndUploadFiles: (files: InputFile[]) => {
            return uploadReaderServiceBob.filterAndUploadFiles(files);
        },
    },
});
