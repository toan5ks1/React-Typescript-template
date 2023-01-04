import {
    User_ClassListWithFilterQueryVariables,
    User_ClassManyQueryVariables,
} from "src/squads/user/service/bob/bob-types";
import classQueriesBob from "src/squads/user/service/bob/class-service-bob";
import { defineService } from "src/squads/user/service/service-creator";
import { ListQuery } from "src/squads/user/service/service-types";

const classService = defineService({
    query: {
        userGetManyClass: (variables: ListQuery<User_ClassManyQueryVariables>) => {
            const { filter } = variables;

            return classQueriesBob.getMany({ class_ids: filter?.class_ids });
        },
        userGetListClassWithFilter: (variables: User_ClassListWithFilterQueryVariables) => {
            return classQueriesBob.getClassListWithFilter(variables);
        },
    },
});

export default classService;
