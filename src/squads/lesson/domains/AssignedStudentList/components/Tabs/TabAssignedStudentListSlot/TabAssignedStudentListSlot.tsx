import {
    mockAssignedStudentList,
    mockAssignedStudentPagination,
} from "src/squads/lesson/test-utils/assigned-student-list";

import { Box } from "@mui/material";
import FormSearchAssignedStudentRecurring from "src/squads/lesson/domains/AssignedStudentList/components/Forms/FormSearchAssignedStudentRecurring";
import FormSearchAssignedStudentSlot from "src/squads/lesson/domains/AssignedStudentList/components/Forms/FormSearchAssignedStudentSlot";
import TableAssignedStudentWithPaging from "src/squads/lesson/domains/AssignedStudentList/components/Tables/TableAssignedStudentWithPaging";

import { AssignedStudentListTypes } from "src/squads/lesson/domains/AssignedStudentList/common/types";

export interface TabAssignedStudentListProps {
    assignedStudentListTabType: AssignedStudentListTypes;
}

const TabAssignedStudentList = (props: TabAssignedStudentListProps) => {
    const { assignedStudentListTabType } = props;

    return (
        <Box mt={3} mb={2}>
            {assignedStudentListTabType === AssignedStudentListTypes.RECURRING ? (
                <FormSearchAssignedStudentRecurring />
            ) : (
                <FormSearchAssignedStudentSlot />
            )}

            <TableAssignedStudentWithPaging
                tableAssignedStudentType={assignedStudentListTabType}
                assignedStudentsList={mockAssignedStudentList}
                pagination={mockAssignedStudentPagination}
                // TODO: handle in ticket https://manabie.atlassian.net/browse/LT-19411
                isLoadingAssignedStudentList={false}
                isLoadingStudent={false}
                isLoadingCourse={false}
                isLoadingLocation={false}
                isFiltered={false}
            />
        </Box>
    );
};

export default TabAssignedStudentList;
