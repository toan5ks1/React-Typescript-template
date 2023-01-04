import { arrayHasItem } from "src/common/utils/other";
import { defineService } from "src/squads/syllabus/services/service-creator";
import { InvalidParamError } from "src/squads/syllabus/services/service-types";

import lessonGroupsServiceYasuo from "./lesson-groups-yasuo.mutation";
import { NsYasuoCourseService } from "./types";

export const lessonGroupYasuoService = defineService({
    mutation: {
        lessonGroupAttachMaterialsToCourse: (
            payload: NsYasuoCourseService.AttachMaterialsToCourse
        ) => {
            const { courseId, lessonGroupId } = payload;

            const errors: InvalidParamError["errors"] = [];
            if (!courseId) errors.push({ field: "courseId", fieldValueIfNotSensitive: courseId });
            if (!lessonGroupId)
                errors.push({ field: "lessonGroupId", fieldValueIfNotSensitive: lessonGroupId });

            if (arrayHasItem(errors)) {
                throw new InvalidParamError({
                    serviceName: "yasuoGraphQL",
                    action: "coursesAttachMaterialsToCourse",
                    errors,
                });
            }

            return lessonGroupsServiceYasuo.attachMaterialsToCourse(payload);
        },
    },
});
