import {
    Communication_GetListTagsByTagIdsQueryVariables,
    Communication_GetListTagNameByTagIdsQueryVariables,
    Communication_GetTagsManyReferenceQueryVariables,
    Communication_GetTagsSelectedByNotificationIdQueryVariables,
} from "src/squads/communication/service/bob/bob-types";

import { defineService } from "@manabie-com/react-utils";
import tagQueriesBob from "src/squads/communication/service/bob/tags-services/tags-bob.query";

export const tagsService = defineService({
    query: {
        communicationGetManyReferenceTags: (
            variables: Communication_GetTagsManyReferenceQueryVariables
        ) => tagQueriesBob.getManyReferenceAutocomplete(variables),

        communicationGetListTagNameByTagIds: (
            variables: Communication_GetListTagNameByTagIdsQueryVariables
        ) => tagQueriesBob.getListTagNameByTagIds(variables),

        communicationGetTagsByTagIds: (
            variables: Communication_GetListTagsByTagIdsQueryVariables
        ) => tagQueriesBob.getTagsByTagIds(variables),

        communicationGetTagsSelectedByNotificationId: (
            variables: Communication_GetTagsSelectedByNotificationIdQueryVariables
        ) => tagQueriesBob.getTagsSelectedByNotificationId(variables),
    },
});
