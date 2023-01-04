import { useMemo } from "react";

import { ERPModules, MutationMenus } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { StudentInformation, UserInformation } from "src/squads/user/common/types";

import { Box } from "@mui/material";
// TODO: Update after move components in phase - 2
import Breadcrumbs from "src/components/Breadcrumbs";
import ActionPanel, { Action } from "src/components/Menus/ActionPanel";
import WrapperPageHeader from "src/components/Wrappers/WrapperPageHeader";
import ChipStudentStatus from "src/squads/user/components/Chips/ChipStudentStatus";

import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

export interface HeaderStudentDetailProps {
    student?: StudentInformation;
    isLoading?: boolean;
    onAction?: (...args: any[]) => void;
}

export const HeaderStudentDetail = ({ student, isLoading, onAction }: HeaderStudentDetailProps) => {
    const isShowCreateOrder = useUserFeatureToggle("PAYMENT_ORDER_MANAGEMENT_UPSERT");
    const isShowCreateEnrollment = useUserFeatureToggle("PAYMENT_ENROLLMENT_ORDER_UPSERT");
    const isShowCreateCustomBilling = useUserFeatureToggle("PAYMENT_CUSTOM_BILLING_ORDER_UPSERT");

    const theLastTimeStudentLogin: UserInformation["last_login_date"] =
        student?.user?.last_login_date;
    const statusStudent = student?.enrollment_status || "";

    const actions: Action[] = useMemo(() => {
        return [
            { action: MutationMenus.RE_ISSUE_PASSWORD },
            ...(isShowCreateOrder ? [{ action: MutationMenus.PAYMENT_CREATE_NEW_ORDER }] : []),
            ...(isShowCreateEnrollment
                ? [{ action: MutationMenus.PAYMENT_CREATE_ENROLLMENT_ORDER }]
                : []),
            ...(isShowCreateCustomBilling
                ? [{ action: MutationMenus.PAYMENT_CREATE_CUSTOM_BILLING_ORDER }]
                : []),
        ];
    }, [isShowCreateOrder, isShowCreateEnrollment, isShowCreateCustomBilling]);

    return (
        <Box data-testid="HeaderStudentDetail">
            <Breadcrumbs resource={ERPModules.STUDENTS} name={student?.user?.name} />
            <WrapperPageHeader
                title={convertString(student?.user?.name)}
                action={
                    <ActionPanel
                        loading={isLoading}
                        actions={actions}
                        record={student?.user}
                        recordName={student?.user.name}
                        buttonStyle="square"
                        onAction={onAction}
                    />
                }
                isNeverLoggedIn={!theLastTimeStudentLogin}
                status={<ChipStudentStatus status={statusStudent} />}
            />
        </Box>
    );
};
