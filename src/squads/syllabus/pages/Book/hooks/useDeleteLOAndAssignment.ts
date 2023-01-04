import { useCallback } from "react";

import { Entities, EurekaEntities } from "src/common/constants/enum";
import { toArr } from "src/common/utils/other";

import useDeleteTaskAssignment from "../../TaskAssignment/hooks/useDeleteTaskAssignment";
import useDeleteAssignment from "./useDeleteAssignment";
import useDeleteLOs from "./useDeleteLOs";

export interface UseDeleteLOAndAssignmentProps {
    entity: Entities.LOS | EurekaEntities.ASSIGNMENTS | EurekaEntities.TASK_ASSIGNMENTS;
}

const useDeleteLOAndAssignment = (props: UseDeleteLOAndAssignmentProps) => {
    const { entity } = props;

    const { deleteLOs, isLoading: isLoadingLOs } = useDeleteLOs();
    const { deleteAssignment, isLoading: isLoadingAssignment } = useDeleteAssignment();
    const { deleteTaskAssignment, isLoading: isLoadingTaskAssignment } = useDeleteTaskAssignment();

    const deleteLOsAndAssignment = useCallback(
        (lOsAndAssignmentId: string | string[], options: { onSuccess: () => void }) => {
            if (entity === Entities.LOS)
                return deleteLOs({ loIdsList: toArr(lOsAndAssignmentId) }, options);

            if (entity === EurekaEntities.TASK_ASSIGNMENTS) {
                return deleteTaskAssignment(
                    { assignmentIdsList: toArr(lOsAndAssignmentId) },
                    options
                );
            }

            deleteAssignment({ assignmentIdsList: toArr(lOsAndAssignmentId) }, options);
        },
        [deleteAssignment, deleteLOs, deleteTaskAssignment, entity]
    );

    return {
        deleteLOsAndAssignment,
        isLoading: isLoadingLOs || isLoadingAssignment || isLoadingTaskAssignment,
    };
};

export default useDeleteLOAndAssignment;
