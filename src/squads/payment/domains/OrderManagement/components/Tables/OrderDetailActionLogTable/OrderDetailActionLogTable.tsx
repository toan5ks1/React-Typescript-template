import { useCallback, useMemo, useState } from "react";

import { Entities } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { formatDate } from "src/common/utils/time";
import { OrderActionLogType } from "src/squads/payment/types/service/order-detail-types";

import { PageviewOutlined } from "@mui/icons-material";
import ButtonPrimaryText from "src/components/Buttons/ButtonPrimaryText";
import { TableBase, TableColumn } from "src/components/Table";
import TypographyBase from "src/components/Typographys/TypographyBase";
import OrderDetailCommentDialog from "src/squads/payment/domains/OrderManagement/components/Dialogs/OrderDetailCommentDialog";

import { PaginationWithTotal } from "@manabie-com/react-utils";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface UseColumnsProps {
    handleOpenCommentDialog: (comment: string) => void;
}

const useColumns = ({ handleOpenCommentDialog }: UseColumnsProps) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const columns: TableColumn<OrderActionLogType>[] = useMemo(
        () => [
            {
                key: "userName",
                title: tOrder("column.userName"),
                render: ({ users }) => {
                    return (
                        <TypographyBase
                            variant="body2"
                            data-testid="OrderDetailActionLogTable__username"
                        >
                            {convertString(users?.name)}
                        </TypographyBase>
                    );
                },
                cellProps: {
                    style: {
                        width: "18%",
                    },
                },
            },
            {
                key: "action",
                title: tOrder("column.action"),
                render: ({ actionLogs }) => {
                    return (
                        <>
                            {actionLogs.action ? (
                                <TypographyBase
                                    variant="body2"
                                    data-testid="OrderDetailActionLogTable__action"
                                >
                                    {tOrder(`choices.orderActionLogStatus.${actionLogs.action}`)}
                                </TypographyBase>
                            ) : null}
                        </>
                    );
                },
                cellProps: {
                    style: {
                        width: "51%",
                    },
                },
            },
            {
                key: "comment",
                title: tOrder("column.comment"),
                render: ({ actionLogs }) => {
                    return (
                        <ButtonPrimaryText
                            disabled={!actionLogs.comment}
                            fullWidth
                            startIcon={<PageviewOutlined />}
                            onClick={() => {
                                handleOpenCommentDialog(convertString(actionLogs.comment));
                            }}
                            data-testid="OrderDetailActionLogTable__viewCommentButton"
                        >
                            {tOrder("label.view")}
                        </ButtonPrimaryText>
                    );
                },
                cellProps: {
                    style: {
                        width: "12%",
                        textAlign: "center",
                    },
                },
            },
            {
                key: "updatedTime",
                title: tOrder("column.updatedTime"),
                render: ({ actionLogs }) => {
                    return (
                        <TypographyBase
                            variant="body2"
                            data-testid="OrderDetailActionLogTable__updatedTime"
                        >
                            {formatDate(actionLogs.created_at, "yyyy/LL/dd, HH:mm")}
                        </TypographyBase>
                    );
                },
                cellProps: {
                    style: {
                        width: "14%",
                    },
                },
            },
        ],
        [tOrder, handleOpenCommentDialog]
    );

    return columns;
};

export interface OrderDetailActionLogTableProps {
    dataSource?: OrderActionLogType[];
    loading: boolean;
    pagination: PaginationWithTotal;
}

const OrderDetailActionLogTable = ({
    dataSource,
    loading,
    pagination,
}: OrderDetailActionLogTableProps) => {
    const [orderComment, setOrderComment] = useState<string>("");
    const [openCommentDialog, setOpenCommentDialog] = useState<boolean>(false);

    const handleOpenCommentDialog = useCallback(
        (comment: string) => {
            setOrderComment(comment);
            setOpenCommentDialog(true);
        },
        [setOrderComment, setOpenCommentDialog]
    );

    const columns = useColumns({ handleOpenCommentDialog });

    return (
        <>
            <TableBase
                tableProps={{ "data-testid": "OrderDetailActionLogTable__root" }}
                data={dataSource ?? []}
                columns={columns}
                withIndex={{ width: "5%" }}
                body={{
                    loading,
                    rowKey: "index",
                    pagination,
                    skeCount: 5,
                }}
                footer={{ pagination }}
            />
            {openCommentDialog && (
                <OrderDetailCommentDialog
                    comment={orderComment}
                    open={openCommentDialog}
                    onClose={() => setOpenCommentDialog(false)}
                />
            )}
        </>
    );
};

export default OrderDetailActionLogTable;
