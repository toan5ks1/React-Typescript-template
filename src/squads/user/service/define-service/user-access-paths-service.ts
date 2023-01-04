import {
    User_UserAccessPathWithFilterV3QueryVariables,
    User_UserAccessPathByUserIdsV2QueryVariables,
    User_OneUserByUserIdAndLocationIdQueryVariables,
} from "src/squads/user/service/bob/bob-types";
import { defineService } from "src/squads/user/service/service-creator";

import userAccessPathsQueriesBob from "src/squads/user/service/bob/user-access-paths-service-bob/user-access-paths-bob.query";

const userAccessPathService = defineService({
    query: {
        userGetManyUserAccessPathsByUserId: (
            variables: User_UserAccessPathWithFilterV3QueryVariables
        ) => {
            return userAccessPathsQueriesBob.getListWithFilter(variables);
        },
        userGetManyUserAccessPathsByUserIds: (
            variables: User_UserAccessPathByUserIdsV2QueryVariables
        ) => {
            return userAccessPathsQueriesBob.getMany(variables);
        },
        userGetOneUserAccessPaths: (variables: User_OneUserByUserIdAndLocationIdQueryVariables) => {
            return userAccessPathsQueriesBob.userAccessPathsGetOne(variables);
        },
    },
});

export default userAccessPathService;
