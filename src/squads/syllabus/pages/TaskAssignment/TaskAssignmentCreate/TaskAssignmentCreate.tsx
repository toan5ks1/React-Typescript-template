import { useCallback } from "react";

import { useLocation } from "react-router";
import { Entities, EurekaEntities, ProviderTypes, SearchEngine } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { parseQuery } from "src/squads/syllabus/common/utils/url";

import TaskAssignmentUpsert from "../components/TaskAssignmentUpsert";

import useCreateEmptyTaskAssignment from "../hooks/useCreateEmptyTaskAssignment";

import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

const TaskAssignmentCreate = () => {
    const tTask = useResourceTranslate(EurekaEntities.TASK_ASSIGNMENTS);
    const { search } = useLocation();
    const navigation = useNavigation();
    const params = parseQuery(search);
    const { [SearchEngine.BOOK_ID]: bookId, [SearchEngine.PARENT_ID]: topicId } = params;
    const createEmptyTaskAssignment = useCreateEmptyTaskAssignment();

    const defaultValues = createEmptyTaskAssignment(topicId as string);

    const handleOnClose = useCallback(() => {
        navigation.push(`/${MicroFrontendTypes.SYLLABUS}/${Entities.BOOKS}/${bookId}/show`);
    }, [bookId, navigation]);

    return (
        <TaskAssignmentUpsert
            action={ProviderTypes.CREATE}
            defaultValues={defaultValues}
            searchUrl={search}
            title={tTask("createTitle")}
            onClose={handleOnClose}
        />
    );
};

export default TaskAssignmentCreate;
