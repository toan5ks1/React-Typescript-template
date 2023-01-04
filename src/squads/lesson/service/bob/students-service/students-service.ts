import { arrayHasItem } from "src/common/utils/other";
import {
    StudentsManyQueryVariables,
    GradesOfStudentsListQueryVariables,
    CountStudentWithFilterQueryVariables,
    StudentsListByFiltersWithoutGradeAndAggregateQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { defineService } from "src/squads/lesson/service/service-creator";
import { InvalidParamError } from "src/squads/lesson/service/service-types";

import studentsQueriesBob from "src/squads/lesson/service/bob/students-service/students-bob.query";

export const studentsService = defineService({
    query: {
        studentsGetMany: (variables: StudentsManyQueryVariables) => {
            const { user_ids } = variables;
            const isInvalidString = !user_ids;
            const isEmptyArrayUserIds = Array.isArray(user_ids) && !arrayHasItem(user_ids);

            if (isInvalidString || isEmptyArrayUserIds) {
                throw new InvalidParamError({
                    action: "studentsGetMany",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "user_ids" }],
                });
            }
            return studentsQueriesBob.getMany(variables);
        },
        studentsGetGradesOfStudent: (variables: GradesOfStudentsListQueryVariables) => {
            const { student_ids } = variables;
            const isInvalidString = !student_ids;
            const isEmptyArrayStudentIds = Array.isArray(student_ids) && !arrayHasItem(student_ids);

            if (isInvalidString || isEmptyArrayStudentIds) {
                throw new InvalidParamError({
                    action: "studentsGetGradesOfStudent",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "student_ids" }],
                });
            }
            return studentsQueriesBob.getGradesOfStudentsList(variables);
        },
        studentsGetListWithFilter: (
            variables: StudentsListByFiltersWithoutGradeAndAggregateQueryVariables
        ) => {
            return studentsQueriesBob.getListWithFilter(variables);
        },
        studentsGetCountStudentWithFilter: (variables: CountStudentWithFilterQueryVariables) => {
            return studentsQueriesBob.getCountStudentWithFilter(variables);
        },
    },
});
