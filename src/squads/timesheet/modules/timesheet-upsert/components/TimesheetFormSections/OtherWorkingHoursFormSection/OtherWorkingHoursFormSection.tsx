import { useState } from "react";

import { ERPModules } from "src/common/constants/enum";
import { OtherWorkingHour } from "src/squads/timesheet/common/types";
import { arrayHasItem } from "src/squads/timesheet/common/utils/other";

import { Grid, Box } from "@mui/material";
import ButtonCreate from "src/components/Buttons/ButtonCreate";
import ButtonDelete from "src/components/Buttons/ButtonDelete";
import DividerDashed from "src/components/Divider/DividerDashed";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";

import OtherWorkingHoursUpsertTable from "./OtherWorkingHoursUpsertTable";

import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";
import useTranslate from "src/squads/timesheet/hooks/useTranslate";
import useOtherWorkingHoursFieldArray from "src/squads/timesheet/modules/timesheet-upsert/hooks/useOtherWorkingHoursFieldArray";

const PREFIX = "OtherWorkingHoursFormSection";

const TOTAL_OWH_COUNT_LIMIT = 5;

const OtherWorkingHoursFormSection = () => {
    const t = useTranslate();
    const tTimesheetManagement = useResourceTranslate(ERPModules.TIMESHEET_MANAGEMENT);

    const { otherWorkingHours, onAdd, onDelete } = useOtherWorkingHoursFieldArray();

    const [selectedOtherWorkingHours, setSelectedOtherWorkingHours] = useState<OtherWorkingHour[]>(
        []
    );

    const handleDeleteRows = () => {
        onDelete(selectedOtherWorkingHours);
        setSelectedOtherWorkingHours([]);
    };
    const handleSelectedItems = (owhs: OtherWorkingHour[]) => {
        setSelectedOtherWorkingHours(owhs);
    };

    return (
        <Box flexDirection="column" data-testid={`${PREFIX}__root`} mt={3}>
            <Grid container flexDirection="row" justifyContent="space-between" mb={2}>
                <TypographyPrimary data-testid={`${PREFIX}__title`}>
                    {tTimesheetManagement("titles.otherWorkingHours")}
                </TypographyPrimary>
                <Box>
                    <Grid container spacing={2} justifyContent={"flex-end"}>
                        <Grid item>
                            <ButtonDelete
                                data-testid={`${PREFIX}__deleteAction`}
                                onClick={handleDeleteRows}
                                disabled={!arrayHasItem(selectedOtherWorkingHours)}
                            />
                        </Grid>
                        <Grid item>
                            <ButtonCreate
                                variant="outlined"
                                onClick={onAdd}
                                disabled={otherWorkingHours.length >= TOTAL_OWH_COUNT_LIMIT}
                                data-testid={`${PREFIX}__addButton`}
                            >
                                {t("resources.action.add")}
                            </ButtonCreate>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <OtherWorkingHoursUpsertTable
                otherWorkingHours={otherWorkingHours}
                listSelectedItems={selectedOtherWorkingHours}
                onSelect={handleSelectedItems}
            />
            <Grid item mt={2} xs={12} p={1}>
                <DividerDashed />
            </Grid>
        </Box>
    );
};

export default OtherWorkingHoursFormSection;
