import { useMemo } from "react";

import { Entities } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { formatDate } from "src/common/utils/time";
import { getUserByUserId } from "src/squads/adobo/domains/invoice/common/utils/invoice-details";
import { Invoice_ActionLogQuery } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";

import { Box } from "@mui/material";
import DividerDashed from "src/components/Divider/DividerDashed";
import { TableColumn } from "src/components/Table";
import TableBase from "src/components/Table/TableBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";

import useGetUserName from "src/squads/adobo/domains/invoice/hooks/useGetUserName";
import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";

type TInvoiceActionLogRecord = ArrayElement<Invoice_ActionLogQuery["invoice_action_log"]>;
export interface TableActionLogProps {
    actionLogs?: Invoice_ActionLogQuery["invoice_action_log"];
}

const TableActionLog = ({ actionLogs = [] }: TableActionLogProps) => {
    const tActionLog = useResourceTranslate(Entities.INVOICE);
    const isLoading = false;
    const userIds = actionLogs.map((actionLog) => actionLog.user_id);
    const { data: users } = useGetUserName({
        userIds,
    });

    const columns: TableColumn<ArrayElement<Invoice_ActionLogQuery["invoice_action_log"]>>[] =
        useMemo(
            () => [
                {
                    key: "userName",
                    title: tActionLog("actionLog.columns.userName"),
                    cellProps: {
                        "data-testid": "ActionLogTableCell__userName",
                    },
                    render: (record: TInvoiceActionLogRecord) => {
                        return (
                            <TypographyBase variant="body2" data-testid="ActionLog__userName">
                                {getUserByUserId(record.user_id, users)}
                            </TypographyBase>
                        );
                    },
                },
                {
                    key: "action",
                    title: tActionLog("actionLog.columns.action"),
                    cellProps: {
                        "data-testid": "ActionLogTableCell__action",
                    },
                    render: (record: TInvoiceActionLogRecord) => {
                        return (
                            <TypographyBase variant="body2" data-testid="ActionLog_action">
                                {record.action}
                            </TypographyBase>
                        );
                    },
                },
                {
                    key: "detail",
                    title: tActionLog("actionLog.columns.detail"),
                    cellProps: {
                        "data-testid": "ActionLogTableCell__detail",
                    },
                    render: (record: TInvoiceActionLogRecord) => {
                        return (
                            <TypographyBase variant="body2" data-testid="ActionLog_detail">
                                {record.action_detail}
                            </TypographyBase>
                        );
                    },
                },
                {
                    key: "comment",
                    title: tActionLog("actionLog.columns.comment"),
                    cellProps: {
                        "data-testid": "ActionLogTableCell__comment",
                    },
                    render: (record: TInvoiceActionLogRecord) => {
                        return (
                            <TypographyBase variant="body2" data-testid="ActionLog__comment">
                                {record.action_comment}
                            </TypographyBase>
                        );
                    },
                },
                {
                    key: "updatedTime",
                    title: tActionLog("actionLog.columns.updatedTime"),
                    cellProps: {
                        "data-testid": "ActionLogTableCell__updatedTime",
                    },
                    render: (record: TInvoiceActionLogRecord) => {
                        return (
                            <TypographyBase variant="body2" data-testid="ActionLog__updatedTime">
                                {formatDate(record.updated_at, "yyyy/LL/dd")}
                            </TypographyBase>
                        );
                    },
                },
            ],
            [tActionLog, users]
        );

    // TODO: When query is available, include pagination of type PaginationWithTotal in body and footer
    return (
        <Box data-testid="TableActionLog">
            <Box my={3}>
                <TypographyPrimary data-testid="ActionLog__title">
                    {tActionLog("actionLog.title")}
                </TypographyPrimary>
            </Box>
            <TableBase
                data={actionLogs}
                body={{
                    rowKey: "invoice_action_id",
                    loading: isLoading,
                }}
                withIndex
                columns={columns}
                tableProps={{
                    "data-testid": "TableActionLog__table",
                }}
            />
            <Box mt={3} mb={4}>
                <DividerDashed />
            </Box>
        </Box>
    );
};

export default TableActionLog;
