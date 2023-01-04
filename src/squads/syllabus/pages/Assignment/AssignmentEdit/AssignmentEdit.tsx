import { useCallback } from "react";

import { useLocation, useParams } from "react-router";
import { EurekaEntities, ProviderTypes } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import AssignmentUpsert from "../components/AssignmentUpsert";

import { Media } from "src/squads/syllabus/__generated__/bob/root-types";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

const AssignmentEdit = () => {
    const tAssignment = useResourceTranslate(EurekaEntities.ASSIGNMENTS);
    const { search } = useLocation();
    const navigation = useNavigation();
    const { id: assignmentId } = useParams<{ id: string }>();

    const { data: assignment, isLoading: isLoadingAssignment } = inferQuery({
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
            media_id: assignment?.attachment,
        },
        {
            enabled: !!assignment?.attachment?.length,
        }
    );

    const handleOnClose = useCallback(() => {
        navigation.push(
            `/${MicroFrontendTypes.SYLLABUS}/${EurekaEntities.ASSIGNMENTS}/${assignmentId}/show${search}`
        );
    }, [assignmentId, navigation, search]);

    if (!assignment || isLoadingAssignment || isLoadingMedia) return null;

    return (
        <AssignmentUpsert
            action={ProviderTypes.UPDATE}
            assignment={{ ...assignment, files: media as Media[] }}
            searchUrl={search}
            title={tAssignment("editTitle")}
            onClose={handleOnClose}
        />
    );
};

export default AssignmentEdit;
