import { useCallback } from "react";

import { useLocation } from "react-router";
import { Entities, EurekaEntities, ProviderTypes, SearchEngine } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { parseQuery } from "src/squads/syllabus/common/utils/url";
import { SettingAssignment } from "src/squads/syllabus/models/assignment";

import AssignmentUpsert from "../components/AssignmentUpsert";

import { AssignmentFormValues } from "../common/types";

import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

const AssignmentCreate = () => {
    const tAssignment = useResourceTranslate(EurekaEntities.ASSIGNMENTS);
    const { search } = useLocation();
    const navigation = useNavigation();
    const params = parseQuery(search);
    const { [SearchEngine.BOOK_ID]: bookId, [SearchEngine.PARENT_ID]: topicId } = params;

    const assignment: AssignmentFormValues = {
        assignment_id: "",
        content: { topic_id: topicId as string },
        display_order: 0,
        files: [],
        is_required_grade: true,
        name: "",
        settings: Object.values(SettingAssignment).reduce(
            (previous, current) => ({ ...previous, [current]: false }),
            {}
        ),
    };

    const handleOnClose = useCallback(() => {
        navigation.push(`/${MicroFrontendTypes.SYLLABUS}/${Entities.BOOKS}/${bookId}/show`);
    }, [bookId, navigation]);

    return (
        <AssignmentUpsert
            action={ProviderTypes.CREATE}
            assignment={assignment}
            searchUrl={search}
            title={tAssignment("createTitle")}
            onClose={handleOnClose}
        />
    );
};

export default AssignmentCreate;
