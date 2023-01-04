import { LocationManyType } from "src/common/constants/types";
import {
    createFakePagination,
    createMockPaginationWithTotalObject,
} from "src/squads/lesson/test-utils/pagination";

import { TableAssignedStudentWithPagingProps } from "src/squads/lesson/domains/AssignedStudentList/components/Tables/TableAssignedStudentWithPaging";

import { PaginationWithTotal } from "@manabie-com/react-utils";
import {
    AssignedStudentItem,
    AssignedStudentListTypes,
    AssignedStudentStatusKeys,
} from "src/squads/lesson/domains/AssignedStudentList/common/types";

const createMockLocationMany = (id: string): LocationManyType => ({
    location_id: `location_id_${id}`,
    name: `Location ${id}`,
});

export const createMockAssignedStudentItemList = (
    numberOfIndividualStudent: number
): AssignedStudentItem[] => {
    const result: AssignedStudentItem[] = [];

    const location = createMockLocationMany("01");
    const purchasedSlot = 5;

    for (let index = 1; index <= numberOfIndividualStudent; index++) {
        const assignedSlot = index;
        const slotGap = assignedSlot - purchasedSlot;
        const statusUnder =
            slotGap < 0
                ? AssignedStudentStatusKeys.STUDENT_ASSIGNED_STATUS_UNDER_ASSIGNED
                : AssignedStudentStatusKeys.STUDENT_ASSIGNED_STATUS_JUST_ASSIGNED;

        const item: AssignedStudentItem = {
            id: `AssignedStudent_${index}`,
            locationName: location.name,
            studentName: `Student ${index}`,
            courseName: `Course ${index}`,
            durationTime: "2022/06/01 - 2022/06/07",
            week: "2022/06/01 - 2022/06/07",
            purchasedSlot,
            assignedSlot,
            slotGap: slotGap,
            status:
                slotGap > 0
                    ? AssignedStudentStatusKeys.STUDENT_ASSIGNED_STATUS_OVER_ASSIGNED
                    : statusUnder,
        };

        result.push(item);
    }

    return result;
};

export const createMockTableAssignedStudentWithPaging = ({
    isLoadingAssignedStudentList,
    isLoadingLocation,
    isLoadingCourse,
    isLoadingStudent,
    isFiltered,
    tableAssignedStudentType,
    mockTest = false,
}: {
    isLoadingAssignedStudentList: boolean;
    isLoadingLocation: boolean;
    isLoadingCourse: boolean;
    isLoadingStudent: boolean;
    isFiltered: boolean;
    tableAssignedStudentType: AssignedStudentListTypes;
    mockTest?: boolean;
}): TableAssignedStudentWithPagingProps => {
    const pagination = mockTest
        ? createMockPaginationWithTotalObject(10, 0)
        : createFakePagination({
              count: 10,
              limit: 10,
          });
    return {
        assignedStudentsList: [...createMockAssignedStudentItemList(mockTest ? 1 : 10)],
        tableAssignedStudentType,
        pagination: pagination,
        isLoadingLocation,
        isLoadingCourse,
        isLoadingAssignedStudentList,
        isLoadingStudent,
        isFiltered,
    };
};

export const mockAssignedStudentList = createMockAssignedStudentItemList(10);

export const mockAssignedStudentPagination: PaginationWithTotal = createFakePagination({
    count: 10,
    limit: 10,
});
