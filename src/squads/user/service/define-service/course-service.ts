import {
    User_CoursesManyWithLocationQueryVariables,
    User_CoursesManyReferenceWithLocationV2QueryVariables,
} from "src/squads/user/service/bob/bob-types";
import courseQueriesBob from "src/squads/user/service/bob/course-service-bob";
import { defineService } from "src/squads/user/service/service-creator";
import { InvalidParamError, ListQuery } from "src/squads/user/service/service-types";
import { getSearchString, isInvalidOrEmptyArray } from "src/squads/user/service/utils";

const courseService = defineService({
    query: {
        userGetManyCoursesWithLocation: (
            variables: ListQuery<User_CoursesManyWithLocationQueryVariables> & {
                ids?: string[];
            }
        ) => {
            const { filter = {}, ids } = variables;

            if (isInvalidOrEmptyArray(filter?.course_id) && isInvalidOrEmptyArray(ids)) {
                throw new InvalidParamError({
                    action: "coursesGetManyWithLocation",
                    errors: [
                        {
                            field: "course_id",
                            fieldValueIfNotSensitive: filter.course_id,
                        },
                    ],
                    serviceName: "bobGraphQL",
                });
            }

            return courseQueriesBob.getManyWithLocation({ course_id: filter?.course_id || ids });
        },
        userGetManyCoursesReferenceWithLocation: (
            variables: ListQuery<User_CoursesManyReferenceWithLocationV2QueryVariables>
        ) => {
            const { filter = {}, pagination } = variables;

            return courseQueriesBob.getManyReferenceWithLocationQueryV2({
                name: getSearchString(filter?.name),
                location_ids: filter?.location_ids,
                limit: pagination?.limit,
                offset: pagination?.offset,
            });
        },
    },
});

export default courseService;
