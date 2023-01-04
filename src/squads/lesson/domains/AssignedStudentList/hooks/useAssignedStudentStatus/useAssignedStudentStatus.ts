import { choiceAssignedStudentStatus } from "src/squads/lesson/common/choices";

import { AssignedStudentStatusType } from "src/squads/lesson/domains/AssignedStudentList/common/types";

export interface UseAssignedStudentStatusReturns {
    choiceAssignedStudentStatus: AssignedStudentStatusType[];
}

const useAssignedStudentStatus = (): UseAssignedStudentStatusReturns => {
    const choices = choiceAssignedStudentStatus.map((status) => ({
        id: status.id,
        name: status.name,
    }));

    return { choiceAssignedStudentStatus: choices };
};

export default useAssignedStudentStatus;
