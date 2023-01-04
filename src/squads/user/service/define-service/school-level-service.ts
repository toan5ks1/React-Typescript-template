import { User_GetManyReferenceSchoolLevelQueryVariables } from "src/squads/user/service/bob/bob-types";
import schoolLevelQueriesBob from "src/squads/user/service/bob/school-level-service-bob";
import { defineService } from "src/squads/user/service/service-creator";

const schoolLevelQueries = defineService({
    query: {
        getManyReferenceSchoolLevel: (
            variables: User_GetManyReferenceSchoolLevelQueryVariables
        ) => {
            return schoolLevelQueriesBob.getManyReferenceSchoolLevel(variables);
        },
    },
});

export default schoolLevelQueries;
