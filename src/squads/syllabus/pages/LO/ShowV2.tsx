import { useCallback, useState } from "react";

import { Redirect, useParams } from "react-router";
import { Entities, Features, MutationMenus } from "src/common/constants/enum";
import { toArr } from "src/common/utils/other";
import { MicroFrontendTypes } from "src/routing/type";
import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import { parseQuery } from "src/squads/syllabus/common/utils/url";
import { Syllabus_LearningObjectivesOneQuery } from "src/squads/syllabus/services/eureka/eureka-types";

import DialogUpdateLOs from "../Book/components/DialogUpdateLOs";
import { Skeleton } from "@mui/material";
import ActionPanel from "src/components/Menus/ActionPanel";
import WrapperPageHeader from "src/components/Wrappers/WrapperPageHeader";
import Breadcrumbs from "src/squads/syllabus/components/Breadcrumbs";

import useTranslate from "../../hooks/useTranslate";
import { inferQuery } from "../../services/infer-query";
import useDeleteLOs from "../Book/hooks/useDeleteLOs";
import FlashShow from "../Flashcard/Show";
import EditLOV2 from "./EditV2";
import Show from "./LODetail";

import useBreadCrumbLOS from "src/squads/syllabus/hooks/useBreadcrumb/useBreadcrumbLOs";
import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";

type LODetail = Syllabus_LearningObjectivesOneQuery["learning_objectives"][0];

const ShowV2 = () => {
    const { breadcrumbInfos, loading } = useBreadCrumbLOS();
    const t = useTranslate();
    const { id: lOId } = useParams<{ id: string }>();

    const {
        data,
        isLoading,
        refetch: refetchLO,
    } = inferQuery({
        entity: "learningObjective",
        action: "syllabusLOGetOneV2",
    })<LODetail>(
        {
            lo_id: lOId,
        },
        {
            enabled: Boolean(lOId),
        }
    );

    const navigation = useNavigation();

    const { isEnabled: isEnabledFlashcard } = useFeatureToggle(Features.FLASHCARD_MANAGEMENT);
    const { isEnabled: isEnableOfflineStudy } = useFeatureToggle(Features.OFFLINE_STUDY_MANAGEMENT);
    const { isEnabled: isEnableExamLO } = useFeatureToggle(Features.EXAM_LO_MANAGEMENT);

    const { deleteLOs, isLoading: deleteLoading } = useDeleteLOs();
    const [visibleEditDialog, setVisibleEditDialog] = useState<boolean>(false);

    const { bookId } = parseQuery();

    const onDeleteSuccess = useCallback(() => {
        let url = `/${MicroFrontendTypes.SYLLABUS}/${Entities.BOOKS}`;
        if (bookId) url += `/${bookId}/show`;

        navigation.push(url);
    }, [navigation, bookId]);

    const onMutation = useCallback(
        async (action: MutationMenus) => {
            switch (action) {
                case MutationMenus.EDIT: {
                    setVisibleEditDialog(true);
                    return;
                }

                case MutationMenus.DELETE: {
                    return deleteLOs(
                        { loIdsList: toArr(lOId) },
                        {
                            onSuccess: onDeleteSuccess,
                        }
                    );
                }

                default:
                    return;
            }
        },
        [lOId, deleteLOs, onDeleteSuccess]
    );

    if (isLoading) return <Skeleton />;

    if (!data) return null;

    const isFlashcard = data.type === KeyLOTypes.LEARNING_OBJECTIVE_TYPE_FLASH_CARD;
    const isOfflineStudy = data.type === KeyLOTypes.LEARNING_OBJECTIVE_TYPE_OFFLINE_LEARNING;
    const isExamLO = data.type === KeyLOTypes.LEARNING_OBJECTIVE_TYPE_EXAM_LO;

    const shouldPreventAccess =
        (isOfflineStudy && !isEnableOfflineStudy) ||
        (isExamLO && !isEnableExamLO) ||
        (isFlashcard && !isEnabledFlashcard);

    if (shouldPreventAccess) return <Redirect to="/page-not-found" />;

    const entityKeyTranslate = KeyLOTypes[data.type as keyof typeof KeyLOTypes];
    const entityName = t(
        `resources.learning_objectives.choices.LearningObjectiveType.${entityKeyTranslate}`
    );

    return (
        <>
            <Breadcrumbs loading={loading} breadcrumbInfos={breadcrumbInfos} name={data.name} />
            <WrapperPageHeader
                title={data.name}
                action={
                    <ActionPanel
                        record={data}
                        actions={[MutationMenus.EDIT, MutationMenus.DELETE]}
                        recordName={data.name}
                        loading={deleteLoading}
                        onAction={onMutation}
                        buttonStyle="square"
                        suffixDeleteTitle={entityName}
                    />
                }
            />
            {
                // If the type is flashcard, only showing flashcard
                isFlashcard ? (
                    <FlashShow record={data} />
                ) : (
                    <Show record={data} refetchLO={refetchLO} />
                )
            }

            {visibleEditDialog &&
                (isExamLO ? (
                    <DialogUpdateLOs
                        open={visibleEditDialog}
                        topicId={data.topic_id as string}
                        data={data}
                        onClose={() => setVisibleEditDialog(false)}
                        onSuccess={refetchLO}
                    />
                ) : (
                    <EditLOV2
                        open={visibleEditDialog}
                        onClose={() => setVisibleEditDialog(false)}
                        onSave={() => {
                            void refetchLO();
                            setVisibleEditDialog(false);
                        }}
                        defaultValues={data}
                    />
                ))}
        </>
    );
};

export default ShowV2;
