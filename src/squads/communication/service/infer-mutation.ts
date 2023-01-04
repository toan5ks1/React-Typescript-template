import { mediaService } from "src/squads/communication/service/bob/media-service/media-service";

import { infoNotificationsMgmtService } from "./notificationmgmt/info-notifications-notificationmgmt-service/info-notifications-notificationmgmt-service";
import { tagManagementService } from "./notificationmgmt/tag-management-service/tag-management-service";

import { composeServices, createUseMutation } from "@manabie-com/react-utils";

// compose all services into service map
const rootService = composeServices({
    infoNotificationsMgmt: infoNotificationsMgmtService,
    mediaBob: mediaService,
    tagManagement: tagManagementService,
});

// create your squad useQuery
const inferMutation = createUseMutation(rootService);

// infer typing for useQuery, we must use another infer layer because of typescript limitation
// else we will need to pass full generic on usage useQuery<A, B, C, D, E>().

export default inferMutation;
