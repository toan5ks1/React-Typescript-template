import { ERPModules, Features } from "src/common/constants/enum";

import { Grid } from "@mui/material";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";
import ButtonPrimaryOutlined from "src/components/Buttons/ButtonPrimaryOutlined";
import ButtonPrimaryText from "src/components/Buttons/ButtonPrimaryText";

import useFeatureToggle from "src/squads/lesson/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface LessonUpsertFooterProps {
    onCancel: () => void;
    onSaveDraft: () => void;
    onPublish: () => void;
    actionButtonBehavior?: {
        disableSaveDraft?: boolean;
        disablePublish?: boolean;
        displaySaveDraftButton: boolean;
    };
    setIsSavingDraftLesson: () => void;
}

const defaultActionButtonBehavior: LessonUpsertFooterProps["actionButtonBehavior"] = {
    disableSaveDraft: false,
    disablePublish: false,
    displaySaveDraftButton: true,
};

const LessonUpsertFooter = (props: LessonUpsertFooterProps) => {
    const {
        onCancel,
        onSaveDraft,
        onPublish,
        actionButtonBehavior = defaultActionButtonBehavior,
        setIsSavingDraftLesson,
    } = props;
    const { disableSaveDraft, disablePublish, displaySaveDraftButton } = actionButtonBehavior;
    const t = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);
    const { isEnabled: isEnabledDraftOrPublishedLesson } = useFeatureToggle(
        Features.LESSON_MANAGEMENT_DRAFT_OR_PUBLISHED_LESSON
    );

    return (
        <Grid container spacing={2} item xs={12} justifyContent="flex-end">
            <Grid item>
                <ButtonPrimaryText
                    color="inherit"
                    onClick={onCancel}
                    data-testid="LessonUpsertFooter__buttonCancel"
                >
                    {t("ra.common.action.cancel")}
                </ButtonPrimaryText>
            </Grid>

            {isEnabledDraftOrPublishedLesson && displaySaveDraftButton ? (
                <Grid item>
                    <ButtonPrimaryOutlined
                        onClick={() => {
                            setIsSavingDraftLesson();
                            onSaveDraft();
                        }}
                        disabled={disableSaveDraft}
                        data-testid="LessonUpsertFooter__buttonSaveDraft"
                    >
                        {t("ra.common.saveDraft")}
                    </ButtonPrimaryOutlined>
                </Grid>
            ) : null}

            <Grid item>
                <ButtonPrimaryContained
                    onClick={onPublish}
                    disabled={disablePublish}
                    data-testid="LessonUpsertFooter__buttonPublish"
                >
                    {isEnabledDraftOrPublishedLesson && displaySaveDraftButton
                        ? tLessonManagement("actions.publish")
                        : t("ra.action.save")}
                </ButtonPrimaryContained>
            </Grid>
        </Grid>
    );
};

export default LessonUpsertFooter;
