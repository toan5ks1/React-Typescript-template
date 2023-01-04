import { DateOfWeek, LessonSchedulingStatus } from "manabuf/common/v1/enums_pb";

import { AssignedStudentStatusEnumTypes } from "src/squads/lesson/domains/AssignedStudentList/common/types";
import { ReactAdmin } from "src/squads/lesson/i18n/react-admin";
import { AssignedStudentList } from "src/squads/lesson/i18n/resource-types/assigned-student-list";
import { Courses } from "src/squads/lesson/i18n/resource-types/courses";
import { LessonManagement } from "src/squads/lesson/i18n/resource-types/lesson-management";
import { LessonReport } from "src/squads/lesson/i18n/resource-types/lesson-reports";

interface Common {
    enterYourKeyword: string;
    noResult: string;
    noResultSearchAndFilter: string;
    youFilterBy: string;
    youAreOffline: string;
    cannotLoadPage: string;
    somethingWentWrong: string;
    pleaseHelpUsReport: string;
    back: string;
    details: string;
    netWorkUnstable: string;
    brightcoveVideoLink: string;
}

interface InputError {
    required: string;
    timeMustComeBefore: string;
}
interface Input {
    error: InputError;
    pleaseUploadFileSizeSmaller: string;
    pasteVideoLink: string;
}

interface Button {
    clearAll: string;
}

interface Grades {
    [x: number]: string;
}

type DayOfWeekTypes = {
    [x in keyof typeof DateOfWeek]: string;
};

//  TODO: will fix/refactor when backend export enum https://manabie.atlassian.net/browse/LT-19418
type AssignedStudentStatus = {
    [x in keyof typeof AssignedStudentStatusEnumTypes]: string;
};

type LessonStatus = {
    [x in keyof typeof LessonSchedulingStatus]: string;
};

interface Choices {
    grades: Grades;
    dayOfWeek: DayOfWeekTypes;
    assignedStudentStatus: AssignedStudentStatus;
    lessonStatus: LessonStatus;
}

interface Resources {
    common: Common;
    input: Input;
    button: Button;
    choices: Choices;
    lesson_reports: LessonReport;
    lesson_management: LessonManagement;
    assigned_student_list: AssignedStudentList;
    courses: Courses;
}

export default interface TranslationKeys {
    resources: Resources;
    ra: ReactAdmin;
}

export const ExportDefaultInterfaceName = "TranslationKeys"; // name of the export default interface
