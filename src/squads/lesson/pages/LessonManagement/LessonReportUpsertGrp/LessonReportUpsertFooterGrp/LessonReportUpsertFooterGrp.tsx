import { ERPModules } from "src/common/constants/enum";

import Grid from "@mui/material/Grid";
import ButtonBase from "src/components/Buttons/ButtonBase";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";
import ButtonPrimaryOutlined from "src/components/Buttons/ButtonPrimaryOutlined";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface LessonReportUpsertFooterGrpProps {
    onCancel: () => void;
    onSaveDraft: () => void;
    onSubmitAll: () => void;
    disableActions?: {
        isDisableCancel?: boolean;
        isDisableSaveDraft?: boolean;
        isDisableSubmitAll?: boolean;
    };
}

const defaultDisableActions: LessonReportUpsertFooterGrpProps["disableActions"] = {
    isDisableCancel: false,
    isDisableSaveDraft: false,
    isDisableSubmitAll: false,
};

const LessonReportUpsertFooterGrp = (props: LessonReportUpsertFooterGrpProps) => {
    const { onCancel, onSaveDraft, onSubmitAll, disableActions = defaultDisableActions } = props;
    const { isDisableCancel, isDisableSaveDraft, isDisableSubmitAll } = disableActions;

    const t = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    return (
        <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
                <ButtonBase
                    onClick={onCancel}
                    disabled={isDisableCancel}
                    data-testid="LessonReportUpsertFooterGrp__buttonCancel"
                >
                    {t("ra.common.action.cancel")}
                </ButtonBase>
            </Grid>

            <Grid item>
                <ButtonPrimaryOutlined
                    onClick={onSaveDraft}
                    disabled={isDisableSaveDraft}
                    data-testid="LessonReportUpsertFooterGrp__buttonSaveDraft"
                >
                    {t("ra.common.saveDraft")}
                </ButtonPrimaryOutlined>
            </Grid>

            <Grid item>
                <ButtonPrimaryContained
                    onClick={onSubmitAll}
                    disabled={isDisableSubmitAll}
                    data-testid="LessonReportUpsertFooterGrp__buttonSubmitAll"
                >
                    {tLessonManagement("actions.submitAll")}
                </ButtonPrimaryContained>
            </Grid>
        </Grid>
    );
};

export default LessonReportUpsertFooterGrp;
