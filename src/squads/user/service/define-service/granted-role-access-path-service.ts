import { User_GrantedRoleAccessPathByGrantedRoleIdsQueryVariables } from "src/squads/user/service/bob/bob-types";
import grantedRoleAccessPathQueriesBob from "src/squads/user/service/bob/granted-role-access-path-service-bob";
import { defineService } from "src/squads/user/service/service-creator";

const grantedRoleAccessPathService = defineService({
    query: {
        userGetManyGrantedRoleAccessPath: (
            variables: User_GrantedRoleAccessPathByGrantedRoleIdsQueryVariables
        ) => {
            return grantedRoleAccessPathQueriesBob.getMany(variables);
        },
    },
});

export default grantedRoleAccessPathService;
