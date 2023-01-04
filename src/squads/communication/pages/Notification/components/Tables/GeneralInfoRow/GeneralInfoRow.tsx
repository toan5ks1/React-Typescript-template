import { ERPModules } from "src/common/constants/enum";

import { Grid, GridSize } from "@mui/material";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";

import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";

interface GeneralInfoRowProps {
    label: string;
    children?: React.ReactNode;
    xsLabel?: GridSize;
    xsValue?: GridSize;
}

const GeneralInfoRow = ({ label, children, xsLabel = 1, xsValue = 11 }: GeneralInfoRowProps) => {
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);

    return (
        <Grid container item>
            <Grid item xs={xsLabel}>
                <TypographyTextSecondary
                    data-testid="GeneralInfoRow__label"
                    variant="caption"
                >{`${tNotification(label)}`}</TypographyTextSecondary>
            </Grid>
            <Grid item xs={xsValue}>
                {children}
            </Grid>
        </Grid>
    );
};

export default GeneralInfoRow;
