import {
    User_UserGroupListV2QueryVariables,
    User_UserGroupOneQueryVariables,
    User_UserGroupsManyReferenceV2QueryVariables,
} from "src/squads/user/service/bob/bob-types";
import { defineService } from "src/squads/user/service/service-creator";
import { InvalidParamError, ListQuery } from "src/squads/user/service/service-types";
import userGroupServiceUserMgmt from "src/squads/user/service/usermgmt/user-group-service-user-mgmt";
import { NsUsermgmtUserGroupService } from "src/squads/user/service/usermgmt/user-group-service-user-mgmt/types";
import { isInvalidOrEmptyVariable } from "src/squads/user/service/utils";

import userGroupQueriesBob from "src/squads/user/service/bob/user-group-service-bob/user-group-service-bob.query";

const userGroupService = defineService({
    query: {
        userGetManyUserGroupsWithFilter: (
            variables: ListQuery<User_UserGroupListV2QueryVariables>
        ) => {
            const { pagination, filter = {} } = variables;
            return userGroupQueriesBob.getListWithFilter({ ...pagination, ...filter });
        },
        userGetOneUserGroup: (variables: User_UserGroupOneQueryVariables) => {
            if (isInvalidOrEmptyVariable(variables.user_group_id)) {
                throw new InvalidParamError({
                    action: "userGetOneUserGroup",
                    errors: [
                        {
                            field: "user_group_id",
                            fieldValueIfNotSensitive: variables.user_group_id,
                        },
                    ],
                    serviceName: "bobGraphQL",
                });
            }
            return userGroupQueriesBob.getOne(variables);
        },
        userGetManyUserGroupsReference: (
            variables: User_UserGroupsManyReferenceV2QueryVariables
        ) => {
            return userGroupQueriesBob.userUserGroupGetManyReference(variables);
        },
    },
    mutation: {
        userCreateUserGroup: (data: NsUsermgmtUserGroupService.CreateUserGroupReq) => {
            return userGroupServiceUserMgmt.createUserGroup(data);
        },
        userUpdateUserGroup: (data: NsUsermgmtUserGroupService.UpdateUserGroupReq) => {
            return userGroupServiceUserMgmt.updateUserGroup(data);
        },
    },
});

export default userGroupService;
