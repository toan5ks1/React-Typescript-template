import { useMemo } from "react";

import { Entities } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { getPrimaryKey } from "src/common/helpers/helpers";
import { User_UserGroupListV2Query } from "src/squads/user/service/bob/bob-types";
import type { PaginationWithTotal } from "src/squads/user/service/service-creator";

import Paper from "@mui/material/Paper";
import StyledLink from "src/components/StyledLink";
import TableBase, { TableColumn } from "src/components/Table/TableBase";
import TypographyShortenStr from "src/components/Typographys/TypographyShortenStr";
import WrapperLookingFor from "src/components/Wrappers/WrapperLookingFor";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface UserGroupTableProp {
    data: User_UserGroupListV2Query["user_group"];
    pagination: PaginationWithTotal;
    isFetching: boolean;
}

type UserGroupColumnTypes = TableColumn<ArrayElement<User_UserGroupListV2Query["user_group"]>>;

const UserGroupTable = ({ data, pagination, isFetching }: UserGroupTableProp) => {
    const t = useTranslate();
    const tUserGroup = useResourceTranslate(Entities.USER_GROUP);
    const rowKey = getPrimaryKey(Entities.USER_GROUP);
    const columns: UserGroupColumnTypes[] = useMemo(() => {
        return [
            {
                key: "colName",
                title: tUserGroup("colName"),
                render: (record) => {
                    if (!record.user_group_name) return null;
                    return (
                        <StyledLink
                            data-testid="UserGroupList__userGroupNameLink"
                            to={`${location.pathname}/${record?.user_group_id}/show`}
                        >
                            <TypographyShortenStr
                                variant="body2"
                                data-testid="UserGroupList__userGroupName"
                                maxLength={60}
                            >
                                {record.user_group_name}
                            </TypographyShortenStr>
                        </StyledLink>
                    );
                },
            },
        ];
    }, [tUserGroup]);

    return (
        <WrapperLookingFor
            variant={!isFetching && data.length < 1 ? "empty-icon" : "result"}
            content={t("resources.common.noResult")}
            helperText={t("resources.common.noResultSearchAndFilter")}
            height="page"
        >
            <TableBase
                component={Paper}
                body={{
                    rowKey,
                    loading: isFetching,
                    pagination,
                }}
                footer={{
                    pagination,
                }}
                withIndex
                data={data}
                columns={columns}
                tableProps={{
                    "data-testid": "UserGroupList__table",
                }}
            />
        </WrapperLookingFor>
    );
};

export default UserGroupTable;
