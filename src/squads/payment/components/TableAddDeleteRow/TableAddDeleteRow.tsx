import { ReactNode, useMemo } from "react";

import { Entities } from "src/common/constants/enum";

import { Box, MenuItemProps } from "@mui/material";
import ButtonCreate from "src/components/Buttons/ButtonCreate";
import { TableBase, TableBaseProps, TableColumn } from "src/components/Table";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import WrapperNoData from "src/components/Wrappers/WrapperNoData";
import MenuItemPanel from "src/squads/payment/components/MenuItemPanel";

import useTranslate from "src/squads/payment/hooks/useTranslate";

interface TableAddDeleteRowColumnProps<T>
    extends Pick<TableAddDeleteRowProps<T>, "renderComponent" | "getActions"> {}

const useColumns = <T extends object>({
    renderComponent,
    getActions,
}: TableAddDeleteRowColumnProps<T>) => {
    const t = useTranslate();

    const columns: TableColumn<T>[] = useMemo(
        () => [
            {
                key: "id",
                title: t("resources.common.name"),
                render: (renderProps, dataIndex) => {
                    return renderComponent(renderProps, dataIndex);
                },
                cellProps: {
                    style: {
                        width: "86%",
                        padding: "6px 16px 6px 0px",
                    },
                    headerStyle: {
                        width: "86%",
                        paddingLeft: "48px",
                    },
                },
            },
            {
                key: "action",
                title: t("resources.common.action"),
                render: (renderProps: T) => <MenuItemPanel menuItems={getActions(renderProps)} />,
                cellProps: {
                    style: {
                        width: "14%",
                        verticalAlign: "top",
                        padding: "6px 16px",
                        textAlign: "center",
                    },
                },
            },
        ],
        [getActions, renderComponent, t]
    );

    return columns;
};

export interface TableAddDeleteRowProps<T> {
    dataSource: T[];
    loading: boolean;
    onClickAddRow: () => void;
    getActions: (renderProps: T) => MenuItemProps[];
    errorMessage?: TableBaseProps<T>["errorMessage"];
    renderComponent: (props: T, dataIndex: number | undefined) => ReactNode;
    title: string;
    showAddRowButton: boolean;
}

const TableAddDeleteRow = <T extends object>({
    dataSource,
    loading,
    onClickAddRow,
    getActions,
    errorMessage,
    renderComponent,
    title,
    showAddRowButton,
}: TableAddDeleteRowProps<T>) => {
    const t = useTranslate();
    const columns = useColumns<T>({
        renderComponent,
        getActions,
    });
    const noDataMessage = <WrapperNoData noDataMessage={t("ra.message.noDataInformation")} />;

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <TypographyHeader data-testid="TableAddDeleteRow__title">{title}</TypographyHeader>
                {showAddRowButton && (
                    <ButtonCreate
                        onClick={() => onClickAddRow()}
                        data-testid="TableAddDeleteRow__addButton"
                        resource={Entities.ORDERS}
                        variant="outlined"
                    >
                        {t("ra.common.action.addRow")}
                    </ButtonCreate>
                )}
            </Box>

            <TableBase
                tableProps={{
                    "data-testid": "TableAddDeleteRow__root",
                }}
                data={dataSource}
                columns={columns}
                styles={{
                    header: {
                        verticalAlign: "center",
                    },
                }}
                errorMessage={errorMessage}
                body={{
                    loading,
                    rowKey: "id",
                    skeCount: 3,
                    noDataMessage: noDataMessage,
                }}
            />
        </>
    );
};

export default TableAddDeleteRow;
