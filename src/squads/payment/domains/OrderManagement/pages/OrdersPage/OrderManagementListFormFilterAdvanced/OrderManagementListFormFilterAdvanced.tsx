import { useMemo } from "react";

import { DateTime } from "luxon";
import { FieldPath, useForm } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { FilterAppliedObjectsMap, OptionSelectType } from "src/common/constants/types";
import {
    dateIsAfter,
    getMinDateToDisablePrevDates,
    handleDisablePrevDates,
} from "src/common/utils/time";

import { Box, Grid } from "@mui/material";
import AutocompleteHF from "src/components/Autocompletes/AutocompleteHF";
import DatePickerHF from "src/components/DatePickers/DatePickerHF";
import FormFilterAdvanced from "src/components/Forms/FormFilterAdvanced";
import HookForm from "src/components/Forms/HookForm";
import TypographyBase from "src/components/Typographys/TypographyBase";
import ProductAutocompleteHF from "src/squads/payment/components/Autocompletes/ProductAutocompleteHF";

import isEqual from "lodash/isEqual";
import { orderTypeChoice } from "src/squads/payment/domains/OrderManagement/common/choices";
import { FormFilterOrderManagementValues } from "src/squads/payment/domains/OrderManagement/common/types";
import useFormFilterAdvanced from "src/squads/payment/hooks/useFormFilterAdvanced";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import useTranslate, { UseTranslateReturn } from "src/squads/payment/hooks/useTranslate";

export interface OrderTypeOptions {
    id: string | number;
    value: string;
}

export const formFilterOrderManagementDefaultValue: FormFilterOrderManagementValues = {
    createdFrom: null,
    createdTo: null,
    orderTypeList: [],
    productsList: [],
};

const convertFilterFieldsObjects = (
    t: UseTranslateReturn
): FilterAppliedObjectsMap<FormFilterOrderManagementValues> => ({
    createdFrom: {
        name: "createdFrom",
        inputLabel: t("filters.createdFrom"),
        isApplied: false,
        defaultValue: null,
    },
    createdTo: {
        name: "createdTo",
        inputLabel: t("filters.createdTo"),
        isApplied: false,
        defaultValue: null,
    },
    orderTypeList: {
        name: "orderTypeList",
        inputLabel: t("filters.orderType"),
        isApplied: false,
        defaultValue: [],
    },
    productsList: {
        name: "productsList",
        inputLabel: t("filters.product"),
        isApplied: false,
        defaultValue: [],
    },
});

export interface OrderManagementListFormFilterAdvancedProps {
    onEnterSearchBar: (value: string) => void;
    onApplySubmit: (value: FormFilterOrderManagementValues) => void;
}

const OrderManagementListFormFilterAdvanced = ({
    onEnterSearchBar,
    onApplySubmit,
}: OrderManagementListFormFilterAdvancedProps) => {
    const t = useTranslate();
    const tOderManagement = useResourceTranslate(Entities.ORDERS);

    const methods = useForm<FormFilterOrderManagementValues>({
        defaultValues: formFilterOrderManagementDefaultValue,
    });

    const filterFieldObjects = convertFilterFieldsObjects(tOderManagement);

    const orderTypeOptions: OrderTypeOptions[] = useMemo(
        () =>
            orderTypeChoice.map((orderType) => ({
                id: orderType.id,
                value: t(orderType.value),
            })),
        [t]
    );

    const { getValues, handleSubmit, setValue } = methods;

    const currentValues = getValues();

    const isNoData: boolean = useMemo(
        () => isEqual(formFilterOrderManagementDefaultValue, currentValues),
        [currentValues]
    );

    const minDate: Date = useMemo(
        () => getMinDateToDisablePrevDates(currentValues.createdFrom),
        [currentValues.createdFrom]
    );

    const { filterApplied, onReset, onDelete, onApply } =
        useFormFilterAdvanced<FormFilterOrderManagementValues>({
            defaultValue: formFilterOrderManagementDefaultValue,
            isNoData,
            filterFieldObjects,
            onApplySubmit,
            ...methods,
        });

    const onCreatedFromDateChange = (date: any) => {
        if (!date || !currentValues.createdTo) return;

        const createdFromDate: Date = new Date(date.toString());
        if (dateIsAfter(createdFromDate, currentValues.createdTo)) {
            setValue("createdTo", createdFromDate);
        }
    };

    return (
        <HookForm methods={methods}>
            <FormFilterAdvanced<FormFilterOrderManagementValues>
                onEnterSearchBar={onEnterSearchBar}
                isDisableReset={isNoData}
                filterNameApplied={filterApplied}
                onReset={onReset}
                onDelete={onDelete}
                onApply={handleSubmit(onApply)}
                inputSearchPlaceholder={tOderManagement("enterStudentName")}
            >
                <Box width={512} data-testid="OrderManagementListFormFilterAdvanced__children">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TypographyBase variant="subtitle2">
                                {tOderManagement("title.filters")}
                            </TypographyBase>
                        </Grid>
                        <Grid item xs={6}>
                            <DatePickerHF
                                InputProps={{
                                    "data-testid":
                                        "OrderManagementListFormFilterAdvanced__createdFrom",
                                }}
                                name={filterFieldObjects.createdFrom.name}
                                label={filterFieldObjects.createdFrom.inputLabel}
                                onChange={onCreatedFromDateChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <DatePickerHF
                                InputProps={{
                                    "data-testid":
                                        "OrderManagementListFormFilterAdvanced__createdTo",
                                }}
                                name={filterFieldObjects.createdTo.name}
                                label={filterFieldObjects.createdTo.inputLabel}
                                shouldDisableDate={(date) =>
                                    handleDisablePrevDates(date, currentValues.createdFrom, minDate)
                                }
                                minDate={
                                    currentValues.createdFrom
                                        ? DateTime.fromJSDate(minDate)
                                        : undefined
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <AutocompleteHF<OptionSelectType>
                                data-testid="OrderManagementListFormFilterAdvanced__orderType"
                                name={filterFieldObjects.orderTypeList.name}
                                label={filterFieldObjects.orderTypeList.inputLabel}
                                optionLabelKey="value"
                                multiple
                                options={orderTypeOptions}
                                disableCloseOnSelect
                                filterSelectedOptions
                                getOptionSelectedField="id"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ProductAutocompleteHF<FormFilterOrderManagementValues>
                                controllerProps={{
                                    // TODO: Refactor FormFilterAdvanced type to use FieldPath instead of string
                                    name: filterFieldObjects.productsList
                                        .name as FieldPath<FormFilterOrderManagementValues>,
                                }}
                                limitTags={1}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </FormFilterAdvanced>
        </HookForm>
    );
};

export default OrderManagementListFormFilterAdvanced;
