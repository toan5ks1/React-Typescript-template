import { PermissionContext } from "src/providers/PermissonProvider";

import { createContextualCan } from "@manabie-com/role-based-permission";

const Can = createContextualCan(PermissionContext.Consumer);

export default Can;
