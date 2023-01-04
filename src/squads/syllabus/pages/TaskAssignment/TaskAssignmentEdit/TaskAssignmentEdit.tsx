import { useCallback } from "react";

import { useLocation, useParams } from "react-router";
import { EurekaEntities, ProviderTypes } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import TaskAssignmentUpsert from "../components/TaskAssignmentUpsert";

import { Media } from "src/squads/syllabus/__generated__/bob/root-types";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

const TaskAssignmentEdit = () => {
    const tTask = useResourceTranslate(EurekaEntities.TASK_ASSIGNMENTS);
    const { search } = useLocation();
    const navigation = useNavigation();
    const { id: assignmentId } = useParams<{ id: string }>();

    const { data: task, isLoading: isLoadingTaskAssignment } = inferQuery({
        entity: "assignment",
        action: "syllabusAssignmentGetOne",
    })(
        {
            assignment_id: assignmentId,
        },
        {
            enabled: Boolean(assignmentId),
        }
    );

    const { data: media = [], isLoading: isLoadingMedia } = inferQuery({
        entity: "media",
        action: "MEDIA_GET_MANY",
    })(
        {
            media_id: task?.attachment,
        },
        {
            enabled: !!task?.attachment?.length,
        }
    );

    const handleOnClose = useCallback(() => {
        navigation.push(
            `/${MicroFrontendTypes.SYLLABUS}/${EurekaEntities.TASK_ASSIGNMENTS}/${assignmentId}/show${search}`
        );
    }, [assignmentId, navigation, search]);

    if (!task || isLoadingTaskAssignment || isLoadingMedia) return null;

    return (
        <TaskAssignmentUpsert
            action={ProviderTypes.UPDATE}
            defaultValues={{ ...task, files: media as Media[] }}
            searchUrl={search}
            title={tTask("editTitle")}
            onClose={handleOnClose}
        />
    );
};

export default TaskAssignmentEdit;
