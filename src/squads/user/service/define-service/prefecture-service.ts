import { Users_PrefectureListQueryVariables } from "src/squads/user/service/bob/bob-types";
import prefectureQueriesBob from "src/squads/user/service/bob/prefecture-service-bob";
import { defineService } from "src/squads/user/service/service-creator";

const prefectureService = defineService({
    query: {
        userGetListPrefecture: (variables: Users_PrefectureListQueryVariables) => {
            return prefectureQueriesBob.getList(variables);
        },
    },
});

export default prefectureService;
