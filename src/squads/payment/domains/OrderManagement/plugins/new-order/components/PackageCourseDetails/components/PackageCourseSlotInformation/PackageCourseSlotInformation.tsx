import { Entities } from "src/common/constants/enum";

import InfoIcon from "@mui/icons-material/InfoOutlined";
import { Grid, Theme } from "@mui/material";
import PaperBase from "src/components/Papers/PaperBase";
import TypographyBase from "src/components/Typographys/TypographyBase";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface PackageCourseSlotInformationProps {
    visible?: boolean;
    totalSelectedSlot?: number;
    maxSlot?: number;
}

const PackageCourseSlotInformation: React.FC<PackageCourseSlotInformationProps> = ({
    visible,
    totalSelectedSlot,
    maxSlot,
}) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    if (!visible) return null;

    return (
        <PaperBase
            elevation={0}
            sx={(theme: Theme) => ({
                background: theme.palette.primary.background,
                p: 1,
                my: theme.spacing(2),
                ml: theme.spacing(3.75),
            })}
        >
            <Grid container justifyContent="space-between">
                <Grid
                    item
                    sx={(theme: Theme) => ({
                        display: "flex",
                        alignItems: "center",
                        width: "auto",
                        gap: theme.spacing(0.5),
                    })}
                >
                    <InfoIcon color="primary" fontSize="small" />
                    <TypographyBase variant="body2" component="span">
                        {tOrder("title.totalSlotsSelected")}:
                    </TypographyBase>
                </Grid>

                <Grid item>
                    <TypographyBase variant="body2" component="span">
                        {totalSelectedSlot ?? "-"}/{maxSlot ?? "-"} {tOrder("label.slots")}
                    </TypographyBase>
                </Grid>
            </Grid>
        </PaperBase>
    );
};

export default PackageCourseSlotInformation;
