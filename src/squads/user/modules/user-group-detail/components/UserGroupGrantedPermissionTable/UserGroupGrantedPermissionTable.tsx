import { useMemo } from "react";

import { ERPModules, Entities } from "src/common/constants/enum";
import { getPrimaryKey } from "src/common/helpers/helpers";
import type { GrantedPermission } from "src/squads/user/common/types/user-group";
import type { PaginationWithTotal } from "src/squads/user/service/service-creator";

import { TableBase } from "src/components/Table";
import TypographyBase from "src/components/Typographys/TypographyBase";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";

export interface UserGroupTableProps {
    dataSource: GrantedPermission[];
    isLoading: boolean;
    pagination: PaginationWithTotal;
}

const useColumns = () => {
    const tUserGroup = useResourceTranslate(ERPModules.USER_GROUP);

    return useMemo(() => {
        return [
            {
                key: "colRole",
                title: tUserGroup("labels.grantedRole"),
                render: (record: GrantedPermission) => {
                    return (
                        <TypographyBase
                            variant="body2"
                            data-testid="UserGroupGrantedPermissionTable__roleName"
                        >
                            {record.role.role_name}
                        </TypographyBase>
                    );
                },
                cellProps: {
                    style: {
                        width: "24%",
                    },
                },
            },
            {
                key: "location",
                title: tUserGroup("labels.grantedLocation"),
                render: (record: GrantedPermission) => {
                    return (
                        <TypographyBase
                            variant="body2"
                            data-testid="UserGroupGrantedPermissionTable__location"
                        >
                            {record.locations.map(({ name }) => name).join(", ")}
                        </TypographyBase>
                    );
                },
            },
        ];
    }, [tUserGroup]);
};

const UserGroupGrantedPermissionTable = ({
    dataSource,
    isLoading,
    pagination,
}: UserGroupTableProps) => {
    const rowKey = getPrimaryKey(Entities.USER_GROUP);

    const columns = useColumns();

    return (
        <TableBase
            tableProps={{
                "data-testid": "UserGroupTable",
            }}
            data={dataSource}
            columns={columns}
            withIndex
            body={{
                rowKey,
                loading: isLoading,
                pagination,
            }}
            footer={{
                pagination,
            }}
        />
    );
};

export default UserGroupGrantedPermissionTable;
