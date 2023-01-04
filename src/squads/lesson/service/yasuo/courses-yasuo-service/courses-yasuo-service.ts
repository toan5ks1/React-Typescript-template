import { arrayHasItem } from "src/common/utils/other";
import { defineService } from "src/squads/lesson/service/service-creator";
import { InvalidParamError } from "src/squads/lesson/service/service-types";
import NsLesson_Yasuo_CourseService from "src/squads/lesson/service/yasuo/courses-yasuo-service/types";

import coursesModifierServiceYasuo from "src/squads/lesson/service/yasuo/courses-yasuo-service/courses-modifier-yasuo.mutation";

export const coursesServiceYasuo = defineService({
    mutation: {
        coursesAttachMaterialsToCourse: (
            variables: NsLesson_Yasuo_CourseService.AttachMaterialsToCourse
        ) => {
            const { courseId, lessonGroupId } = variables;

            const errors: InvalidParamError["errors"] = [];
            if (!courseId) errors.push({ field: "courseId", fieldValueIfNotSensitive: courseId });
            if (!lessonGroupId)
                errors.push({ field: "lessonGroupId", fieldValueIfNotSensitive: lessonGroupId });

            if (arrayHasItem(errors)) {
                throw new InvalidParamError({
                    action: "coursesAttachMaterialsToCourse",
                    serviceName: "yasuoGraphQL",
                    errors,
                });
            }
            return coursesModifierServiceYasuo.attachMaterialsToCourse(variables);
        },
    },
});
