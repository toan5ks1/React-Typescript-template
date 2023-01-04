import { ERPModules } from "src/common/constants/enum";
import { GrantedPermission } from "src/squads/user/common/types/user-group";
import type { PaginationWithTotal } from "src/squads/user/service/service-creator";

import Box from "@mui/material/Box";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import UserGroupGrantedPermissionTable from "src/squads/user/modules/user-group-detail/components/UserGroupGrantedPermissionTable";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";

export interface GrantedPermissionDetailProps {
    grantedPermissionPackage: GrantedPermission[];
    isLoading: boolean;
    pagination: PaginationWithTotal;
}

export const GrantedPermissionDetail = (props: GrantedPermissionDetailProps) => {
    const { grantedPermissionPackage, isLoading, pagination } = props;
    const tUserGroup = useResourceTranslate(ERPModules.USER_GROUP);

    return (
        <Box mt={3} data-testid="UserGroupGrantedPermission">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="start"
                data-testid="UserGroupNavbar"
                mb={3}
            >
                <TypographyHeader data-testid="UserGroupNavbar__title" variant="subtitle1">
                    {tUserGroup("detail.userGroupDetail")}
                </TypographyHeader>
            </Box>
            <UserGroupGrantedPermissionTable
                dataSource={grantedPermissionPackage}
                isLoading={isLoading}
                pagination={pagination}
            />
        </Box>
    );
};
