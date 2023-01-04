import { useCallback, useMemo } from "react";

import { useToggle } from "react-use";
import { Entities } from "src/common/constants/enum";
import { TimesheetConfigTypes } from "src/squads/user/common/constants/enum";

import { Box, Grid } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import RadioGroup from "src/squads/user/components/RadioGroup";
import DialogTimesheetConfig from "src/squads/user/modules/staff-timesheet-setting/components/DialogTimesheetConfig";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";

export interface TimesheetConfigButtonProps {
    isAutoCreateTimesheet: boolean;
    onConfirm: () => void;
}

const TimesheetConfigButton = ({
    isAutoCreateTimesheet,
    onConfirm,
}: TimesheetConfigButtonProps) => {
    const t = useResourceTranslate(Entities.STAFF);
    const [openConfirmDialog, setOpenConfirmDialog] = useToggle(false);

    const timesheetConfigValue = useMemo(
        () => (isAutoCreateTimesheet ? TimesheetConfigTypes.ENABLE : TimesheetConfigTypes.DISABLE),
        [isAutoCreateTimesheet]
    );

    const onSave = useCallback(() => {
        setOpenConfirmDialog(false);
        onConfirm();
    }, [setOpenConfirmDialog, onConfirm]);

    return (
        <>
            <Box display="flex" flexDirection="row" py={0.75}>
                <Grid container item xs={12} spacing={2} pb={1} pr={0}>
                    <Grid item xs={6} p={1}>
                        <TypographyBase
                            data-testid="TimesheetConfigButton__configAutoCreateTimesheet"
                            variant="body2"
                        >
                            {t("titles.configAutoCreateTimesheet")}
                        </TypographyBase>
                    </Grid>
                    <Grid item xs={6} p={1} pr={0}>
                        <RadioGroup
                            value={timesheetConfigValue}
                            onChange={() => {
                                setOpenConfirmDialog(true);
                            }}
                            spacing={12}
                            options={[
                                {
                                    id: TimesheetConfigTypes.ENABLE,
                                    value: t("labels.enable"),
                                },
                                {
                                    id: TimesheetConfigTypes.DISABLE,
                                    value: t("labels.disable"),
                                },
                            ]}
                            sxRadio={(theme) => ({
                                padding: theme.spacing(0, 1.2),
                            })}
                            sxLabel={{
                                "& span:last-child": {
                                    fontSize: "0.75rem",
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
            {openConfirmDialog && (
                <DialogTimesheetConfig
                    isEnable={!isAutoCreateTimesheet}
                    open={openConfirmDialog}
                    onClose={() => setOpenConfirmDialog(false)}
                    onSave={onSave}
                />
            )}
        </>
    );
};

export default TimesheetConfigButton;
