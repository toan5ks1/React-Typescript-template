import { ChangeEvent } from "react";

import { Entities } from "src/common/constants/enum";

import { Box, FormControlLabel, Grid } from "@mui/material";
import ButtonDefaultOutlined from "src/components/Buttons/ButtonDefaultOutlined";
import ButtonEdit from "src/components/Buttons/ButtonEdit";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";
import CheckboxBase from "src/components/Checkboxes/CheckboxBase";
import TypographyBase from "src/components/Typographys/TypographyBase";

import { StudyPlanStatus } from "manabuf/eureka/v1/enums_pb";

import { StudyPlanStatusKey } from "../../common/constants";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface ActionProps {
    isEditing: boolean;
    studyPlanStatus: keyof typeof StudyPlanStatus;
    shouldShowArchived: boolean;
    onCancel: () => void;
    onDisplayChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onEdit: () => void;
    onSave: () => void;
}

const Action = (props: ActionProps) => {
    const {
        isEditing,
        studyPlanStatus,
        shouldShowArchived,
        onCancel,
        onDisplayChange,
        onEdit,
        onSave,
    } = props;
    const t = useTranslate();

    if (isEditing) {
        return (
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonDefaultOutlined
                        aria-label={t("ra.common.action.cancel")}
                        onClick={onCancel}
                    >
                        {t("ra.common.action.cancel")}
                    </ButtonDefaultOutlined>
                </Grid>
                <Grid item>
                    <ButtonPrimaryContained
                        aria-label={t("ra.common.action.save")}
                        onClick={onSave}
                    >
                        {t("ra.common.action.save")}
                    </ButtonPrimaryContained>
                </Grid>
            </Grid>
        );
    }

    return (
        <Box>
            <FormControlLabel
                disabled={studyPlanStatus === StudyPlanStatusKey.STUDY_PLAN_STATUS_ARCHIVED}
                control={
                    <CheckboxBase
                        color="primary"
                        checked={shouldShowArchived}
                        onChange={onDisplayChange}
                    ></CheckboxBase>
                }
                label={
                    <TypographyBase variant="body2">
                        {t(`resources.${Entities.COURSES}.studyPlan.displayHiddenItems`)}
                    </TypographyBase>
                }
            />
            <ButtonEdit
                variant="outlined"
                disabled={studyPlanStatus === StudyPlanStatusKey.STUDY_PLAN_STATUS_ARCHIVED}
                onClick={onEdit}
            />
        </Box>
    );
};

export default Action;
