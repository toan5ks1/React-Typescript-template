import { useCallback } from "react";

import { SettingTaskAssignment } from "src/squads/syllabus/models/assignment";

import { TaskAssignmentFormValues } from "src/squads/syllabus/pages/TaskAssignment/common/types";

export interface UseCreateEmptyTaskAssignmentValues {
    createEmptyTaskAssignment: (topicId: string) => TaskAssignmentFormValues;
}

const useCreateEmptyTaskAssignment = () => {
    const createEmptyTaskAssignment: UseCreateEmptyTaskAssignmentValues["createEmptyTaskAssignment"] =
        useCallback((topicId: string) => {
            return {
                assignment_id: "",
                content: { topic_id: topicId },
                display_order: 0,
                files: [],
                name: "",
                settings: Object.values(SettingTaskAssignment).reduce(
                    (previous, current) => ({
                        ...previous,
                        [current]: ![SettingTaskAssignment.requireAttachmentSubmission].includes(
                            current
                        ),
                    }),
                    {}
                ),
            };
        }, []);

    return createEmptyTaskAssignment;
};

export default useCreateEmptyTaskAssignment;
