import { FilterDateType } from "src/common/constants/types";
import { timeIsAfter } from "src/common/utils/time";
import { FilterTimeType, StudentsMany } from "src/squads/lesson/common/types";
import { Grade } from "src/squads/lesson/models/grade";
import { TeacherMany } from "src/squads/lesson/service/bob/bob-modify-types";
import {
    CoursesManyQuery,
    Lesson_ClassManyByNullableCourseIdsAndNameQuery,
} from "src/squads/lesson/service/bob/bob-types";
import { NsLesson_Bob_LocationService } from "src/squads/lesson/service/bob/locations-service/types";
import { TypeEntity } from "src/squads/lesson/typings/react-admin";

import { useFormContext } from "src/components/Forms/HookForm";

import { DayOfWeekType } from "src/squads/lesson/hooks/useDayOfWeek";
import { ChoiceLessonStatus } from "src/squads/lesson/hooks/useLessonStatus";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export type FormFilterLessonManagementValuesV2 = {
    lessonStatus: ChoiceLessonStatus[];
    fromDate: FilterDateType;
    toDate: FilterDateType;
    dayOfWeek: DayOfWeekType[];
    startTime: FilterTimeType;
    endTime: FilterTimeType;
    teachers: TeacherMany[];
    centers: NsLesson_Bob_LocationService.RetrieveLocationsResponseLocation[];
    students: StudentsMany;
    grades: Grade[];
    courses: CoursesManyQuery["courses"];
    classOfCourses: Lesson_ClassManyByNullableCourseIdsAndNameQuery["class"];
};

const useValidateRulesForLessonManagementListFormFilterAdvancedV2 = (
    tResource: (resourceName: TypeEntity | string) => string
) => {
    const { getValues, clearErrors } = useFormContext<FormFilterLessonManagementValuesV2>();
    const t = useTranslate();

    return {
        startTime: {
            validate: (startTime: FilterTimeType) => {
                const endTime = getValues("endTime");
                if (
                    endTime &&
                    startTime &&
                    endTime.value &&
                    startTime.value &&
                    !timeIsAfter(new Date(endTime.value), new Date(startTime.value))
                ) {
                    return t("resources.input.error.timeMustComeBefore", {
                        startTime: tResource("filters.startTime"),
                        endTime: tResource("filters.endTime"),
                    });
                } else clearErrors("endTime");
            },
        },
        endTime: {
            validate: (endTime: FilterTimeType) => {
                const startTime = getValues("startTime");
                if (
                    endTime &&
                    startTime &&
                    endTime.value &&
                    startTime.value &&
                    !timeIsAfter(new Date(endTime.value), new Date(startTime.value))
                ) {
                    return t("resources.input.error.timeMustComeBefore", {
                        startTime: tResource("filters.startTime"),
                        endTime: tResource("filters.endTime"),
                    });
                } else clearErrors("startTime");
            },
        },
    };
};

export default useValidateRulesForLessonManagementListFormFilterAdvancedV2;
