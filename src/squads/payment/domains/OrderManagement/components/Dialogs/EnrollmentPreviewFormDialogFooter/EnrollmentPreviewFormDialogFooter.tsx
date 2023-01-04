import { Grid } from "@mui/material";
import ButtonBase from "src/components/Buttons/ButtonBase";

import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface EnrollmentPreviewFormDialogFooterProps {
    closeEnrollmentForm?: () => void;
}

const EnrollmentPreviewFormDialogFooter = ({
    closeEnrollmentForm,
}: EnrollmentPreviewFormDialogFooterProps) => {
    const t = useTranslate();

    return (
        <Grid
            container
            justifyContent="flex-end"
            spacing={1}
            data-testid="EnrollmentPreviewFormDialog__footer"
        >
            <Grid item>
                <ButtonBase
                    data-testid="EnrollmentForm__buttonBack"
                    variant="contained"
                    size="medium"
                    color="primary"
                    onClick={() => closeEnrollmentForm && closeEnrollmentForm()}
                >
                    {t("ra.common.action.back")}
                </ButtonBase>
            </Grid>
        </Grid>
    );
};

export default EnrollmentPreviewFormDialogFooter;
