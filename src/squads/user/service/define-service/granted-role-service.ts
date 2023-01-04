import { User_GrantedRoleListQueryVariables } from "src/squads/user/service/bob/bob-types";
import grantedRoleQueriesBob from "src/squads/user/service/bob/granted-role-service-bob";
import { defineService } from "src/squads/user/service/service-creator";
import { ListQuery } from "src/squads/user/service/service-types";

const grantedRoleService = defineService({
    query: {
        userGetManyGrantedRoleWithFilter: (
            variables: ListQuery<User_GrantedRoleListQueryVariables>
        ) => {
            const { filter, pagination } = variables;
            return grantedRoleQueriesBob.getListWithFilter({
                ...filter,
                ...pagination,
                user_group_id: filter?.user_group_id || "",
            });
        },
    },
});

export default grantedRoleService;
