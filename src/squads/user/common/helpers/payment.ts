import { ArrayElement } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import {
    GradesOfStudentsListQuery,
    StudentWithoutGradeFrgFragment,
} from "src/squads/user/service/bob/bob-types";

import isNil from "lodash/isNil";
import { UseNormalizedGradesReturn } from "src/squads/user/modules/student-list/hooks/useNormalizeGrades";

type HasDisabledCreateBulkOrderProps = {
    selectedStudents: StudentWithoutGradeFrgFragment[];
    mapGradeOfStudents: UseNormalizedGradesReturn["mapGrades"];
};

export const hasDisabledCreateBulkOrder = ({
    selectedStudents,
    mapGradeOfStudents,
}: HasDisabledCreateBulkOrderProps): boolean => {
    if (!arrayHasItem(selectedStudents)) return true;

    const exclusiveElementInArray = 1;
    const studentGradeArray: ArrayElement<
        GradesOfStudentsListQuery["students"]
    >["current_grade"][] = Array.from(mapGradeOfStudents.values()).map(
        (gradeStudent) => gradeStudent.current_grade
    );
    const distinctStudentGradeList = new Set(studentGradeArray.filter((grade) => !isNil(grade)));

    const isSameStudentGrade: boolean = distinctStudentGradeList.size === exclusiveElementInArray;
    return !arrayHasItem(studentGradeArray) || !isSameStudentGrade;
};
