import { UpsertTagRequest } from "manabuf/notificationmgmt/v1/tags_pb";

import { defineService, MutationParams } from "@manabie-com/react-utils";
import tagManagementMutationService from "src/squads/communication/service/notificationmgmt/tag-management-service/tag-management-modifier.mutation";

export const tagManagementService = defineService({
    mutation: {
        communicationUpsertTag: ({ data }: MutationParams<UpsertTagRequest.AsObject>) => {
            return tagManagementMutationService.upsertTag({ data });
        },
    },
});
