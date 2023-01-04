import { useMemo } from "react";

import { FieldArrayWithId } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { CustomBillingOrderFormValue } from "src/squads/payment/types/form/custom-billing-types";

import { InputAdornment } from "@mui/material";
import { TableColumn } from "src/components/Table";
import TableWithCheckbox from "src/components/Table/TableWithCheckbox";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TaxAutocompleteHF from "src/squads/payment/components/Autocompletes/TaxAutocompleteHF";

import useCustomBillingOrderValidationRules from "src/squads/payment/hooks/useCustomBillingOrderValidationRules";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export type CustomBillingFieldArrayWithIdType = FieldArrayWithId<
    CustomBillingOrderFormValue,
    "billingFieldArrayItem",
    "id"
>[];

export interface CustomBillingOrderTableProps {
    dataSource: CustomBillingFieldArrayWithIdType;
    onSelect?: (field: CustomBillingFieldArrayWithIdType) => void;
    listSelectedItems?: CustomBillingFieldArrayWithIdType;
    errorMessage: string | null;
}

const useColumns = () => {
    const tOrder = useResourceTranslate(Entities.ORDERS);
    const { currentCurrencySymbol } = getCurrentCurrency();
    const validationRules = useCustomBillingOrderValidationRules();

    const columns: TableColumn<
        FieldArrayWithId<CustomBillingOrderFormValue, "billingFieldArrayItem", "id">
    >[] = useMemo(
        () => [
            {
                key: "name",
                title: tOrder("column.name"),
                render: (_record, dataIndex) => {
                    return (
                        <TextFieldHF
                            inputProps={{ "data-testid": "CustomBillingOrderTable__nameField" }}
                            name={
                                `billingFieldArrayItem.${dataIndex}.name` as `billingFieldArrayItem.${number}.name`
                            }
                            rules={validationRules.billingFieldArrayItem.name}
                        />
                    );
                },
                cellProps: {
                    style: {
                        width: "62%",
                        padding: "6px 16px",
                    },
                    headerStyle: {
                        width: "62%",
                        padding: "16px",
                    },
                },
            },
            {
                key: "tax",
                title: tOrder("column.tax"),
                render: (_record, dataIndex) => {
                    return (
                        <TaxAutocompleteHF<CustomBillingOrderFormValue>
                            controllerProps={{
                                // We don't need this as if dataIndex is always a number. TODO: refactor TableColumn type to make sure that dataIndex is always a number
                                name: `billingFieldArrayItem.${dataIndex}.taxItem` as `billingFieldArrayItem.${number}.taxItem`,
                            }}
                        />
                    );
                },
                cellProps: {
                    style: {
                        width: "18%",
                        maxWidth: 200,
                        padding: "6px 16px",
                    },
                    headerStyle: {
                        width: "18%",
                        padding: "16px",
                    },
                },
            },
            {
                key: "price",
                title: tOrder("column.price"),
                render: (_record, dataIndex) => {
                    return (
                        <TextFieldHF
                            inputProps={{
                                "data-testid": "CustomBillingOrderTable__priceField",
                                style: { textAlign: "right" },
                            }}
                            name={`billingFieldArrayItem.${dataIndex}.price` as const}
                            rules={validationRules.billingFieldArrayItem.price}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TypographyBase variant="body2">
                                            {currentCurrencySymbol}
                                        </TypographyBase>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    );
                },
                cellProps: {
                    style: {
                        width: "20%",
                        textAlign: "right",
                        padding: "6px 16px",
                    },
                    headerStyle: {
                        width: "20%",
                        textAlign: "right",
                        padding: "16px",
                    },
                },
            },
        ],
        [tOrder, currentCurrencySymbol, validationRules]
    );

    return columns;
};

const CustomBillingOrderTable = ({
    dataSource,
    onSelect,
    listSelectedItems,
    errorMessage,
}: CustomBillingOrderTableProps) => {
    const columns = useColumns();

    return (
        <TableWithCheckbox
            tableProps={{
                "data-testid": "CustomBillingOrderTable__root",
            }}
            columns={columns}
            showHeader={true}
            body={{
                loading: false,
                rowKey: "id",
            }}
            data={dataSource}
            onSelect={onSelect}
            listSelectedItems={listSelectedItems}
            errorMessage={errorMessage}
        />
    );
};

export default CustomBillingOrderTable;
