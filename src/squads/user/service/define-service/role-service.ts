import {
    User_RoleListV2QueryVariables,
    User_RoleListV3QueryVariables,
} from "src/squads/user/service/bob/bob-types";
import roleQueriesBob from "src/squads/user/service/bob/role-service-bob";
import { defineService } from "src/squads/user/service/service-creator";
import { ListQuery } from "src/squads/user/service/service-types";

const roleService = defineService({
    query: {
        userGetManyRoleByIsSystem: (variables: ListQuery<User_RoleListV2QueryVariables>) => {
            const { filter = {} } = variables;
            return roleQueriesBob.getList({ ...filter });
        },
        userGetTeacherAndSchoolAdminRoleByIsSystem: (
            variables: ListQuery<User_RoleListV3QueryVariables>
        ) => {
            const { filter = {} } = variables;
            return roleQueriesBob.getTeacherAndSchoolAdminRoleList({ ...filter });
        },
    },
});

export default roleService;
