import { dateIsSameOrAfter } from "src/common/utils/time";
import {
    StudentPackageClientWithLocation,
    ValidationStudentCourseErrorTypes,
    CourseWithLocationChoice,
} from "src/squads/user/common/types";
import { inferStandaloneQuery } from "src/squads/user/service/infer-service";

import isEmpty from "lodash/isEmpty";
import { useStudentDetailContext } from "src/squads/user/contexts/StudentDetailContext";

type ValidateRequired = {
    value: boolean;
    message: string;
};
type ValidateCourse = (course: CourseWithLocationChoice) => string;

export interface UseCourseFormValidationReturn {
    validate: {
        required: ValidateRequired;
        course?: ValidateCourse;
        validateStudentCourseLocationEndDate?: (
            endDate: Date,
            record: StudentPackageClientWithLocation
        ) => Promise<ValidationStudentCourseErrorTypes | undefined>;
    };
    validateCourse?: ValidateCourse;
}

const useCourseFormValidation = () => {
    const { student } = useStudentDetailContext();
    const validateCourse = (
        course: CourseWithLocationChoice
    ): ValidationStudentCourseErrorTypes | undefined => {
        if (course && course.course_id && course.name) {
            return;
        }
        return "0";
    };

    const validateStudentCourseLocationEndDate = async (
        endDate: Date,
        record: StudentPackageClientWithLocation
    ): Promise<ValidationStudentCourseErrorTypes | undefined> => {
        if (
            dateIsSameOrAfter(endDate, new Date()) &&
            record &&
            record.course.course_id &&
            record.location?.location_id
        ) {
            const respCourse = await inferStandaloneQuery({
                entity: "courseAccessPath",
                action: "userGetOneCourseAccessPaths",
            })({
                course_id: record.course.course_id,
                location_id: record.location?.location_id,
            });

            const respUser = await inferStandaloneQuery({
                entity: "userAccessPath",
                action: "userGetOneUserAccessPaths",
            })({
                user_id: student?.student_id || "",
                location_id: record.location?.location_id,
            });

            const emptyUser = isEmpty(respUser);
            const emptyCourse = isEmpty(respCourse);

            if (emptyUser && emptyCourse) return "1,2";

            if (emptyCourse) return "2";

            if (emptyUser) return "1";

            return;
        }

        return;
    };

    return {
        validate: {
            required: {
                value: true,
                message: "0",
            },
            course: validateCourse,
            validateStudentCourseLocationEndDate,
        },
        validateCourse,
    };
};

export default useCourseFormValidation;
