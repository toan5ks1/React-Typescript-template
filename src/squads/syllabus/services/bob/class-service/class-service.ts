import {
    Lesson_ClassAssociationByClassIdQueryVariables,
    Lesson_ClassListByCourseIdV3QueryVariables,
} from "src/squads/syllabus/services/bob/bob-types";
import { defineService } from "src/squads/syllabus/services/service-creator";
import { InvalidParamError } from "src/squads/syllabus/services/service-types";

import classQueriesBob from "src/squads/syllabus/services/bob/class-service/class-bob.query";

export const classService = defineService({
    query: {
        classGetListByCourseId: (variables: Lesson_ClassListByCourseIdV3QueryVariables) => {
            if (!variables.course_id) {
                throw new InvalidParamError({
                    action: "classGetListByCourseId",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "course_id" }],
                });
            }

            return classQueriesBob.getListByCourseId(variables);
        },

        classGetClassAssociationByCourseId: (
            variables: Lesson_ClassAssociationByClassIdQueryVariables
        ) => {
            if (!variables.class_id) {
                throw new InvalidParamError({
                    action: "classGetClassAssociationByCourseId",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "class_id" }],
                });
            }

            return classQueriesBob.getClassAssociationByCourseId(variables);
        },
    },
});
