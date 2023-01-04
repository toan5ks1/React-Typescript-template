import { FilterDateType } from "src/common/constants/types";
import { timeIsAfter } from "src/common/utils/time";
import { StudentsMany } from "src/squads/lesson/common/types";
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

export type FormFilterLessonManagementValues = {
    lessonStatus: ChoiceLessonStatus[];
    fromDate: FilterDateType;
    toDate: FilterDateType;
    dayOfWeek: DayOfWeekType[];
    startTime: FilterDateType;
    endTime: FilterDateType;
    teachers: TeacherMany[];
    centers: NsLesson_Bob_LocationService.RetrieveLocationsResponseLocation[];
    students: StudentsMany;
    grades: Grade[];
    courses: CoursesManyQuery["courses"];
    classOfCourses: Lesson_ClassManyByNullableCourseIdsAndNameQuery["class"];
};

const useValidateRulesForLessonManagementListFormFilterAdvanced = (
    tResource: (resourceName: TypeEntity | string) => string
) => {
    const { getValues, clearErrors } = useFormContext<FormFilterLessonManagementValues>();
    const t = useTranslate();

    return {
        startTime: {
            validate: (startTime: Date | null) => {
                const endTime = getValues("endTime");
                if (endTime && startTime && !timeIsAfter(new Date(endTime), startTime)) {
                    return t("resources.input.error.timeMustComeBefore", {
                        startTime: tResource("filters.startTime"),
                        endTime: tResource("filters.endTime"),
                    });
                } else clearErrors("endTime");
            },
        },
        endTime: {
            validate: (endTime: Date | null) => {
                const startTime = getValues("startTime");
                if (startTime && endTime && !timeIsAfter(endTime, new Date(startTime))) {
                    return t("resources.input.error.timeMustComeBefore", {
                        startTime: tResource("filters.startTime"),
                        endTime: tResource("filters.endTime"),
                    });
                } else clearErrors("startTime");
            },
        },
    };
};

export default useValidateRulesForLessonManagementListFormFilterAdvanced;
