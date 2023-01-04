import { ERPModules } from "src/common/constants/enum";

import { Grid } from "@mui/material";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";
import ButtonPrimaryOutlined from "src/components/Buttons/ButtonPrimaryOutlined";
import ButtonPrimaryText from "src/components/Buttons/ButtonPrimaryText";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface LessonReportUpsertIndFooterIndProps {
    onDiscard: () => void;
    onSaveDraft: () => void;
    onSubmitAll: () => void;
    disableActions?: {
        disableDiscard?: boolean;
        disableSaveDraft?: boolean;
        disableSubmitAll?: boolean;
    };
}

const defaultDisableActions: LessonReportUpsertIndFooterIndProps["disableActions"] = {
    disableDiscard: false,
    disableSaveDraft: false,
    disableSubmitAll: false,
};

const LessonReportUpsertIndFooterInd = (props: LessonReportUpsertIndFooterIndProps) => {
    const { onDiscard, onSaveDraft, onSubmitAll, disableActions = defaultDisableActions } = props;
    const { disableDiscard, disableSaveDraft, disableSubmitAll } = disableActions;

    const t = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    return (
        <Grid container justifyContent="space-between">
            <Grid item xs={6}>
                <ButtonPrimaryText
                    color="error"
                    onClick={onDiscard}
                    disabled={disableDiscard}
                    data-testid="LessonReportUpsertFooterInd__buttonDiscard"
                >
                    {t("ra.action.discard")}
                </ButtonPrimaryText>
            </Grid>

            <Grid container spacing={2} item xs={6} justifyContent="flex-end">
                <Grid item>
                    <ButtonPrimaryOutlined
                        onClick={onSaveDraft}
                        disabled={disableSaveDraft}
                        data-testid="LessonReportUpsertFooterInd__buttonSaveDraft"
                    >
                        {t("ra.common.saveDraft")}
                    </ButtonPrimaryOutlined>
                </Grid>

                <Grid item>
                    <ButtonPrimaryContained
                        onClick={onSubmitAll}
                        disabled={disableSubmitAll}
                        data-testid="LessonReportUpsertFooterInd__buttonSubmitAll"
                    >
                        {tLessonManagement("actions.submitAll")}
                    </ButtonPrimaryContained>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default LessonReportUpsertIndFooterInd;
