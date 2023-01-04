import { ParentsManyReferenceQueryVariables } from "src/squads/user/service/bob/bob-types";
import parentQueriesBob from "src/squads/user/service/bob/parents-service-bob";
import { defineService } from "src/squads/user/service/service-creator";
import { ListQuery } from "src/squads/user/service/service-types";

const parentService = defineService({
    query: {
        userGetManyParentsBySearch: (variables: ListQuery<ParentsManyReferenceQueryVariables>) => {
            const { filter = {} } = variables;

            return parentQueriesBob.getParentsList({
                name: filter?.name || "",
                email: filter?.email || "",
            });
        },
    },
});

export default parentService;
