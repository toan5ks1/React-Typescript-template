import { FieldArrayWithId, useFieldArray, useForm } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { ProductListItemStatus } from "src/squads/payment/constants/enum";

import { Box, MenuItemProps } from "@mui/material";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";
import HookForm from "src/components/Forms/HookForm";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import TypographyBase from "src/components/Typographys/TypographyBase";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import TableAddDeleteRow from "../TableAddDeleteRow";

import { useProductPluginsContext } from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

interface TableAddDeleteRowTestFormValues {
    comment: string;
    productList: Array<{ name: string; value: string; status: ProductListItemStatus }>;
}

const TableAddDeleteRowTest = (props: {
    mockSubmit: (data: TableAddDeleteRowTestFormValues) => void;
    hasDefaultValues: boolean;
}) => {
    const t = useTranslate();
    const tOrder = useResourceTranslate(Entities.ORDERS);
    const titleDefaultValue = tOrder("title.productList");

    const { orderType } = useProductPluginsContext();

    const method = useForm<TableAddDeleteRowTestFormValues>({
        defaultValues: {
            productList: props.hasDefaultValues
                ? [
                      {
                          name: "product name",
                          value: "value",
                          status: ProductListItemStatus.ACTIVE,
                      },
                  ]
                : [],
        },
    });
    const { handleSubmit, formState, control } = method;
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "productList",
    });
    const { errors } = formState;
    const errorMessage = arrayHasItem(errors.productList)
        ? t("ra.validation.requiredAll")
        : undefined;

    const addRow = () => {
        append({ name: "productList" });
    };
    const deleteRow = (id: string) => {
        const index = fields.findIndex((el) => el.id === id);
        remove(index);
    };
    const cancelRow = (id: string) => {
        const index = fields.findIndex((el) => el.id === id);
        update(index, {
            ...fields[index],
            status: ProductListItemStatus.CANCELLED,
        });
    };
    const restoreRow = (id: string) => {
        const index = fields.findIndex((el) => el.id === id);
        update(index, {
            ...fields[index],
            status: ProductListItemStatus.ACTIVE,
        });
    };

    const getActions = (
        renderProps: FieldArrayWithId<TableAddDeleteRowTestFormValues, "productList", "id">
    ): MenuItemProps[] => {
        const actions: MenuItemProps[] = [
            {
                key: t("ra.common.action.deleteRow"),
                children: t("ra.common.action.deleteRow"),
                onClick: () => deleteRow(renderProps.id),
            },
        ];

        if (orderType !== OrderType.ORDER_TYPE_UPDATE) return actions;

        switch (renderProps.status) {
            case ProductListItemStatus.ACTIVE:
                actions.push({
                    key: t("ra.common.action.cancel"),
                    children: t("ra.common.action.cancel"),
                    onClick: () => cancelRow(renderProps.id),
                });
                break;
            case ProductListItemStatus.CANCELLED:
                actions.push({
                    key: t("ra.common.action.restore"),
                    children: t("ra.common.action.restore"),
                    onClick: () => restoreRow(renderProps.id),
                });
                break;
        }

        return actions;
    };

    const showSnackBar = useShowSnackbar();
    const onSubmit = (data: TableAddDeleteRowTestFormValues) => {
        props.mockSubmit(data);
        void showSnackBar("Form submitted successfully!");
    };

    return (
        <HookForm
            formProps={{
                onSubmit: handleSubmit(onSubmit),
            }}
            methods={method}
        >
            <TableAddDeleteRow
                loading={false}
                title={titleDefaultValue}
                dataSource={fields}
                getActions={getActions}
                showAddRowButton={orderType !== OrderType.ORDER_TYPE_UPDATE}
                onClickAddRow={() => addRow()}
                errorMessage={errorMessage}
                renderComponent={(props, dataIndex) => {
                    return (
                        <>
                            {props.status === ProductListItemStatus.CANCELLED && (
                                <TypographyBase>[Cancelled]</TypographyBase>
                            )}
                            <TextFieldHF
                                required
                                id={props.id}
                                name={`productList.${dataIndex}.value`}
                                label={"Sample Product"}
                                rules={{
                                    required: {
                                        value: true,
                                        message: t("resources.input.error.required"),
                                    },
                                }}
                            ></TextFieldHF>
                        </>
                    );
                }}
            />
            <Box mt={2}>
                <TextFieldHF
                    name="comment"
                    inputProps={{
                        "data-testid": "CommentSection__commentInput",
                    }}
                />
            </Box>
            <Box mt={2}>
                <ButtonPrimaryContained data-testid="TableAddDeleteRow__submitButton" type="submit">
                    Submit
                </ButtonPrimaryContained>
            </Box>
        </HookForm>
    );
};

export default TableAddDeleteRowTest;
