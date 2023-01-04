import { User_GetManyManyReferenceSchoolInfoQueryVariables } from "src/squads/user/service/bob/bob-types";
import schoolInfoQueriesBob from "src/squads/user/service/bob/school-info-service-bob";
import { defineService } from "src/squads/user/service/service-creator";

const schoolInfoQueries = defineService({
    query: {
        getManyReferenceSchoolInfo: (
            variables: User_GetManyManyReferenceSchoolInfoQueryVariables
        ) => {
            return schoolInfoQueriesBob.getManyReferenceSchoolInfo(variables);
        },
    },
});

export default schoolInfoQueries;
