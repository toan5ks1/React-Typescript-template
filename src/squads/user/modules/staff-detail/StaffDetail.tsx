import { useMemo } from "react";

import { Redirect } from "react-router";
import { Entities, ModeOpenDialog, NotifyTypes } from "src/common/constants/enum";
import { handleUnknownError } from "src/common/utils/error";
import { MicroFrontendTypes } from "src/routing/type";
import StaffUpsert from "src/squads/user/modules/staff-upsert";
import { inferQuery } from "src/squads/user/service/infer-service";

import { HeaderStaffDetail, TabStaffDetail } from "./components";
import { Box, Tab } from "@mui/material";
import Loading from "src/components/Loading";
import NotFound from "src/components/NotFound";
import TabLayout from "src/components/Tabs/TabLayout";

import isEmpty from "lodash/isEmpty";
import useDialog from "src/squads/user/hooks/useDialog";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import type { MapTabReturns } from "src/squads/user/hooks/useTabs";
import useTranslate from "src/squads/user/hooks/useTranslate";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";
import StaffTimesheetSetting from "src/squads/user/modules/staff-timesheet-setting/StaffTimesheetSetting";

interface StaffDetailProps {
    id: string;
}

interface QueryVars {
    teacher_id: string;
    staff_id: string;
}

const StaffDetail = ({ id }: StaffDetailProps) => {
    const t = useTranslate();
    const tStaff = useResourceTranslate(Entities.STAFF);
    const { open, onOpen, onClose } = useDialog();
    const showSnackbar = useShowSnackbar();

    const isEnabledStaffTableQuery = useUserFeatureToggle("STAFF_MANAGEMENT_USE_STAFF_QUERY");
    const isShowTimesheetSetting = useUserFeatureToggle("STAFF_MANAGEMENT_TIMESHEET_SETTING");
    const teacherQueryVars: Omit<QueryVars, "staff_id"> = { teacher_id: id };
    const staffQueryVars: Omit<QueryVars, "teacher_id"> = { staff_id: id };
    const queryVars = isEnabledStaffTableQuery ? staffQueryVars : teacherQueryVars;
    const queryAction = isEnabledStaffTableQuery ? "userGetOneStaffV2" : "userGetOneStaff";

    const {
        data: staff,
        isLoading,
        refetch: refetchStaff,
    } = inferQuery({ entity: "staff", action: queryAction })(queryVars, {
        enabled: !!id,
        onError(err: Error) {
            const error = handleUnknownError(err);
            window.warner?.log(error.message);
            showSnackbar(
                `${t("ra.message.unableToLoadData")}: ${error.message}`,
                NotifyTypes.ERROR
            );
        },
    });

    const mapTabs = useMemo((): MapTabReturns[] => {
        return [
            {
                tabName: <Tab label={tStaff("titles.detail")} />,
                tabPanel: <TabStaffDetail staff={staff} onClickEdit={onOpen} />,
            },
            ...(isShowTimesheetSetting
                ? [
                      {
                          tabName: <Tab label={tStaff("titles.timesheetSettings")} />,
                          tabPanel: <StaffTimesheetSetting staff={staff} />,
                      },
                  ]
                : []),
        ];
    }, [tStaff, staff, onOpen, isShowTimesheetSetting]);

    if (!id) return <Redirect to={`/${MicroFrontendTypes.USER}/${Entities.STAFF}`} />;

    if (isLoading) return <Loading />;

    if (isEmpty(staff)) return <NotFound data-testid="NotFound__root" />;

    return (
        <Box data-testid="StaffDetail">
            <HeaderStaffDetail staff={staff} />
            <TabLayout mapTabs={mapTabs} hasDivider />
            {open ? (
                <StaffUpsert
                    mode={ModeOpenDialog.EDIT}
                    defaultValues={staff}
                    open={open}
                    onClose={onClose}
                    onSave={refetchStaff}
                />
            ) : null}
        </Box>
    );
};

export default StaffDetail;
