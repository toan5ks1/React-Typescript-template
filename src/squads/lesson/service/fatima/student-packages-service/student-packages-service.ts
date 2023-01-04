import { arrayHasItem } from "src/common/utils/other";
import { User_StudentPackagesByListStudentIdV2QueryVariables } from "src/squads/lesson/service/fatima/fatima-types";
import { defineService } from "src/squads/lesson/service/service-creator";
import { InvalidParamError, ListQuery } from "src/squads/lesson/service/service-types";
import { toGqlQuerySorts } from "src/squads/lesson/service/utils";

import studentPackagesQueriesFatima from "src/squads/lesson/service/fatima/student-packages-service/student-packages-fatima.query";

export const studentPackagesService = defineService({
    query: {
        studentPackagesGetList: (
            variables: ListQuery<User_StudentPackagesByListStudentIdV2QueryVariables>
        ) => {
            const { filter = {}, sort } = variables;
            const { student_ids } = filter;

            const isInvalidString = !student_ids;
            const isEmptyArrayStudentIds = Array.isArray(student_ids) && !arrayHasItem(student_ids);

            if (isInvalidString || isEmptyArrayStudentIds) {
                throw new InvalidParamError({
                    action: "studentPackagesGetList",
                    serviceName: "fatimaGraphQL",
                    errors: [{ field: "student_ids" }],
                });
            }

            return studentPackagesQueriesFatima.getList({
                student_ids: filter.student_ids,
                order_by: toGqlQuerySorts(sort),
            });
        },
    },
});
