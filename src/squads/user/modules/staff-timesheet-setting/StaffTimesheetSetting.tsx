import { useMemo } from "react";

import { Entities, NotifyTypes } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { Teacher, Staff } from "src/squads/user/service/bob/user-service-bob/types";

import Box from "@mui/material/Box";
import BackdropLoading from "src/components/Backdrops/BackdropLoading";
import Loading from "src/components/Loading";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import TimesheetConfigButton from "src/squads/user/modules/staff-timesheet-setting/components/TimesheetConfigButton";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTimesheetConfig from "src/squads/user/modules/staff-timesheet-setting/hooks/useTimesheetConfig";
import useUpdateStaffSetting from "src/squads/user/modules/staff-timesheet-setting/hooks/useUpdateStaffSetting";

export interface StaffTimesheetSettingProps {
    staff?: Teacher | Staff;
}

const StaffTimesheetSetting = ({ staff }: StaffTimesheetSettingProps) => {
    const t = useResourceTranslate(Entities.STAFF);
    const showSnackbar = useShowSnackbar();

    const { updateStaffSetting, isLoading = false } = useUpdateStaffSetting();
    const staffId = useMemo(
        () => (staff && "staff_id" in staff ? convertString(staff?.staff_id) : ""),
        [staff]
    );

    const {
        data: isAutoCreateTimesheet,
        isLoading: isLoadingTimesheetConfig,
        refetch: refetchTimesheetConfig,
    } = useTimesheetConfig(staffId);

    const onConfirm = async () => {
        await updateStaffSetting({
            payload: { staffId, autoCreateTimesheet: !isAutoCreateTimesheet },
            options: {
                onSuccess: (resp) => {
                    if ("successful" in resp && resp.successful) {
                        refetchTimesheetConfig();
                    } else showSnackbar(t("ra.common.updatedFail"), NotifyTypes.ERROR);
                },
            },
        });
    };

    if (isLoadingTimesheetConfig) return <Loading />;

    return (
        <>
            <BackdropLoading open={isLoading} />
            <Box data-testid="StaffTimesheetSetting__root" mt={3}>
                <Box mb={3}>
                    <TypographyHeader data-testid="StaffTimesheetSetting__title">
                        {t("titles.setting")}
                    </TypographyHeader>
                </Box>

                <TimesheetConfigButton
                    isAutoCreateTimesheet={isAutoCreateTimesheet}
                    onConfirm={onConfirm}
                />
            </Box>
        </>
    );
};

export default StaffTimesheetSetting;
