import { User_StudentPackagesByListStudentIdV2QueryVariables } from "src/squads/user/service/fatima/fatima-types";
import { studentPackageFatimaQuery } from "src/squads/user/service/fatima/student-package-fatima";
import { defineService } from "src/squads/user/service/service-creator";
import { ListQuery } from "src/squads/user/service/service-types";
import { toGqlQuerySorts } from "src/squads/user/service/utils";

const studentPackageService = defineService({
    query: {
        userGetStudentPackagesByStudentIds: (
            variables: ListQuery<User_StudentPackagesByListStudentIdV2QueryVariables>
        ) => {
            const { filter = {}, sort } = variables;
            return studentPackageFatimaQuery.getListByArrayId({
                student_ids: filter?.student_ids,
                order_by: toGqlQuerySorts(sort),
            });
        },
    },

    mutation: {},
});

export default studentPackageService;
