import { arrayHasItem } from "src/common/utils/other";
import { NsLesson_Bob_UploadService } from "src/squads/lesson/service/bob/upload-service/types";
import { defineService } from "src/squads/lesson/service/service-creator";
import { createEmptyResponse } from "src/squads/lesson/service/utils";

import uploadMutationServiceBob from "src/squads/lesson/service/bob/upload-service/upload.mutation";

export const uploadService = defineService({
    mutation: {
        uploadFilterAndUploadFiles: (variables: NsLesson_Bob_UploadService.FilterUploadFiles[]) => {
            if (!arrayHasItem(variables))
                return createEmptyResponse({ data: { attachments: [], mediaIds: [] } });

            return uploadMutationServiceBob.filterAndUploadFiles(variables);
        },
    },
});
