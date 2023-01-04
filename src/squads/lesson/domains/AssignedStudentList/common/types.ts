import { convertEnumKeys } from "src/common/constants/helper";
import { FilterDateType } from "src/common/constants/types";
import { StudentsMany } from "src/squads/lesson/common/types";
import { CoursesManyQuery } from "src/squads/lesson/service/bob/bob-types";
import { NsLesson_Bob_LocationService } from "src/squads/lesson/service/bob/locations-service/types";

export enum AssignedStudentStatusEnumTypes {
    STUDENT_ASSIGNED_STATUS_UNDER_ASSIGNED = 0,
    STUDENT_ASSIGNED_STATUS_JUST_ASSIGNED = 1,
    STUDENT_ASSIGNED_STATUS_OVER_ASSIGNED = 2,
}

export const AssignedStudentStatusKeys = convertEnumKeys(AssignedStudentStatusEnumTypes);
export type AssignedStudentStatusTypes = keyof typeof AssignedStudentStatusKeys;

export interface AssignedStudentItem {
    id: string;
    studentName?: string;
    courseName?: string;
    locationName?: string;
    durationTime?: string;
    week?: string;
    purchasedSlot?: number;
    assignedSlot?: number;
    slotGap?: number;
    status: AssignedStudentStatusTypes;
}

export type AssignedStudentStatusType = {
    id: string;
    name: string;
};

export type FormFilterAdvancedAssignedStudentListSlotValues = {
    assignedStudentStatus: AssignedStudentStatusType[];
    locations: NsLesson_Bob_LocationService.RetrieveLocationsResponseLocation[];
    students: StudentsMany;
    courses: CoursesManyQuery["courses"];
};

export type FormFilterAdvancedAssignedStudentListRecurringValues = {
    startDate: FilterDateType;
    endDate: FilterDateType;
    assignedStudentStatus: AssignedStudentStatusType[];
    locations: NsLesson_Bob_LocationService.RetrieveLocationsResponseLocation[];
    students: StudentsMany;
    courses: CoursesManyQuery["courses"];
};

export const formFilterAssignedStudentListSlotDefaultValues: FormFilterAdvancedAssignedStudentListSlotValues =
    {
        assignedStudentStatus: [],
        locations: [],
        students: [],
        courses: [],
    };

export const formFilterAssignedStudentListRecurringDefaultValues: FormFilterAdvancedAssignedStudentListRecurringValues =
    {
        startDate: null,
        endDate: null,
        assignedStudentStatus: [],
        locations: [],
        students: [],
        courses: [],
    };

export enum AssignedStudentListTypes {
    RECURRING = "recurring",
    SLOT = "slot",
}
