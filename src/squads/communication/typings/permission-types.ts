import { Features } from "src/squads/communication/common/constants/feature-keys";
import { CommunicationRules } from "src/squads/communication/internals/permission/rules";

import { ActionKeys, SubjectKeys } from "@manabie-com/role-based-permission";

export type PermissionTypes = {
    permissionConfigs?: {
        subject: SubjectKeys<CommunicationRules>;
        action: ActionKeys<CommunicationRules, SubjectKeys<CommunicationRules>>;
    };
    featureConfigs?: {
        feature: Features;
    };
};
