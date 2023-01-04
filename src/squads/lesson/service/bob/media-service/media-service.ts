import { arrayHasItem } from "src/common/utils/other";
import { MediasManyQueryVariables } from "src/squads/lesson/service/bob/bob-types";
import { defineService } from "src/squads/lesson/service/service-creator";
import { createEmptyResponse } from "src/squads/lesson/service/utils/utils";

import mediaQueriesBob from "src/squads/lesson/service/bob/media-service/media-bob.query";

export const mediaService = defineService({
    query: {
        mediaGetMany: (variables: MediasManyQueryVariables) => {
            if (arrayHasItem(variables.media_id)) return mediaQueriesBob.getMany(variables);

            return createEmptyResponse(undefined);
        },
    },
});
