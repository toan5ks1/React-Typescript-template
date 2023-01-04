import { useMemo } from "react";

import { Entities } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { getPrimaryKey } from "src/common/helpers/helpers";
import { MicroFrontendTypes } from "src/routing/type";
import {
    User_StaffListV4Query,
    User_StaffListV2Query,
} from "src/squads/user/service/bob/bob-types";
import type { PaginationWithTotal } from "src/squads/user/service/service-creator";

import { Paper } from "@mui/material";
import StyledLink from "src/components/StyledLink";
import TableBase, { TableColumn } from "src/components/Table/TableBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyShortenStr from "src/components/Typographys/TypographyShortenStr";
import WrapperLookingFor from "src/components/Wrappers/WrapperLookingFor";
import TextColumn from "src/squads/user/components/Tables/ColumnTables/TextColumn";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useStylesMaxLine from "src/squads/user/hooks/useStylesMaxLine";
import useTranslate from "src/squads/user/hooks/useTranslate";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

export interface StaffTableProp {
    data: User_StaffListV2Query["find_teacher_by_school_id"] | User_StaffListV4Query["staff"];
    pagination: PaginationWithTotal;
    isFetching: boolean;
}
export interface TableRecord
    extends ArrayElement<User_StaffListV2Query["find_teacher_by_school_id"]>,
        ArrayElement<User_StaffListV4Query["staff"]> {}

const StaffListTable = ({ data, pagination, isFetching }: StaffTableProp) => {
    const tStaff = useResourceTranslate(Entities.STAFF);
    const rowKey = getPrimaryKey(Entities.STAFF);
    const t = useTranslate();

    const isEnabledStaffTableQuery = useUserFeatureToggle("STAFF_MANAGEMENT_USE_STAFF_QUERY");
    const { lineClamp } = useStylesMaxLine({ maxLines: 2 });

    const columns: TableColumn<TableRecord>[] = useMemo(() => {
        return [
            {
                key: "colName",
                title: tStaff("labels.name"),
                render: (record: TableRecord) => {
                    const name = record?.name ?? record?.user?.name;
                    const staffId = record?.user_id ?? record?.staff_id;
                    if (!name || !staffId) return null;
                    return (
                        <StyledLink
                            data-testid="StaffList__staffNameLink"
                            to={`/${MicroFrontendTypes.USER}/${Entities.STAFF}/${staffId}/show`}
                        >
                            <TypographyShortenStr
                                variant="body2"
                                data-testid="StaffList__staffName"
                                maxLength={60}
                            >
                                {name}
                            </TypographyShortenStr>
                        </StyledLink>
                    );
                },
                cellProps: {
                    style: {
                        width: "800px",
                    },
                },
            },
            {
                key: "colEmail",
                title: tStaff("labels.email"),
                render: (record: TableRecord) => {
                    const email = record?.user?.email ?? record?.email;
                    if (!email) return null;
                    return (
                        <TypographyBase variant="body2" data-testid="StaffList__staffEmail">
                            {email}
                        </TypographyBase>
                    );
                },
                cellProps: {
                    style: {
                        width: "256px",
                    },
                },
            },
            ...(isEnabledStaffTableQuery
                ? [
                      {
                          key: "colUserGroup",
                          title: tStaff("labels.userGroup"),
                          render: (record: TableRecord) => {
                              const userGroupName = record?.user?.user_group_members
                                  .map((userGroup) => userGroup?.user_group?.user_group_name)
                                  .join(", ");
                              return (
                                  <TextColumn
                                      sx={lineClamp}
                                      dataTestIdContent="StaffList__staffUserGroup"
                                      content={userGroupName}
                                  />
                              );
                          },
                          cellProps: {
                              style: {
                                  width: "210px",
                              },
                          },
                      },
                  ]
                : []),
        ];
    }, [isEnabledStaffTableQuery, lineClamp, tStaff]);

    return (
        <WrapperLookingFor
            variant={!isFetching && data.length < 1 ? "empty-icon" : "result"}
            content={t("resources.common.noResult")}
            helperText={t("resources.common.noResultSearchAndFilter")}
            height="page"
        >
            <TableBase<
                ArrayElement<
                    | User_StaffListV2Query["find_teacher_by_school_id"]
                    | User_StaffListV4Query["staff"]
                >
            >
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
                    "data-testid": "StaffList__table",
                }}
            />
        </WrapperLookingFor>
    );
};

export default StaffListTable;
