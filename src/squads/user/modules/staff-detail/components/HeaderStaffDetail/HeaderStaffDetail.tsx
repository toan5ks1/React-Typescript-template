import { Entities } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { Teacher, Staff } from "src/squads/user/service/bob/user-service-bob/types";

import { Box } from "@mui/material";
import Breadcrumbs from "src/components/Breadcrumbs";
import WrapperPageHeader from "src/components/Wrappers/WrapperPageHeader";

export interface HeaderStaffDetailProps {
    staff?: Teacher | Staff;
    isLoading?: boolean;
    onAction?: (...args: any[]) => void;
}

export const HeaderStaffDetail = ({ staff }: HeaderStaffDetailProps) => {
    let staffName: string | undefined;
    if (staff && "users" in staff) {
        staffName = staff?.users?.name;
    } else if (staff && "user" in staff) {
        staffName = staff?.user?.name;
    }

    return (
        <Box data-testid="HeaderStaffDetail">
            <Breadcrumbs resource={Entities.STAFF} name={staffName} />
            <WrapperPageHeader title={convertString(staffName)} />
        </Box>
    );
};
