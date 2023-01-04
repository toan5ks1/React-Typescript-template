import { ChangeEvent, useMemo, useState } from "react";

import { FieldArrayWithId, useFormContext } from "react-hook-form";
import { ProductEntities } from "src/squads/payment/constants/const";
import { ProductListItemStatus } from "src/squads/payment/constants/enum";
import {
    isFrequencyBasedPackageProduct,
    isRecurringProductMaterial,
    isScheduleBasedPackageProduct,
} from "src/squads/payment/helpers/product-type";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";
import { BillingSchedulePeriod } from "src/squads/payment/types/service/billing-schedule-period-types";
import { ProductPriceType } from "src/squads/payment/types/service/price-types";
import {
    ProductExtensionType,
    ProductEntityType,
} from "src/squads/payment/types/service/product-types";
import { ProductTaxType } from "src/squads/payment/types/service/tax-types";

import { Box } from "@mui/material";
import ProductAutocompleteWithIdsHF2Extended from "src/squads/payment/components/Autocompletes/ProductAutocompleteWithIdsHF2Extended";
import CancelledInputAdornment from "src/squads/payment/components/CancelledInputAdorment";
import ProductListItemAccordion from "src/squads/payment/components/Sections/ProductListSection/ProductListItem/ProductListItemAccordion";
import ProductListItemDetails from "src/squads/payment/components/Sections/ProductListSection/ProductListItemDetails";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { Product } from "src/squads/payment/__generated__/fatima/root-types";
import { useProductPluginsContext } from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import useOrderValidationRules from "src/squads/payment/hooks/useOrderValidationRules";

export interface ProductListItemProps {
    productFieldItem: FieldArrayWithId<
        OrderFormValues,
        `students.${number}.productFieldArrayItems`
    >;
    productIndex: number;
    productIds: Product["product_id"][];
    selectedProductIds: Product["product_id"][];
    studentIndex: number;
}

const ProductListItem = ({
    productFieldItem,
    productIndex: dataIndex,
    productIds,
    selectedProductIds,
    studentIndex,
}: ProductListItemProps) => {
    const [isAccordionDisabled, setIsAccordionDisabled] = useState<boolean>(
        productFieldItem.product ? false : true
    );
    const [expanded, setExpanded] = useState<boolean>(productFieldItem.product ? true : false);
    const { validationRules } = useOrderValidationRules();

    const { getValues, setValue, resetField } = useFormContext<OrderFormValues>();

    const onProductChange = () => {
        setExpanded(true);
        setIsAccordionDisabled(false);
    };

    const onChangeAccordion = (_event: ChangeEvent<{}>) => {
        setExpanded((previous) => !previous);
    };

    const onTaxDetailSuccess = (data: ProductTaxType | undefined) => {
        setValue(`students.${studentIndex}.productFieldArrayItems.${dataIndex}.productTax`, data);
    };

    const resetProductDetails = (entity: ProductEntityType) => {
        // Set other product entities to undefined
        for (const productEntity of ProductEntities) {
            if (productEntity !== entity) {
                setValue(
                    `students.${studentIndex}.productFieldArrayItems.${dataIndex}.${productEntity}`,
                    undefined
                );
            }
        }
        setValue(
            `students.${studentIndex}.productFieldArrayItems.${dataIndex}.productTax`,
            undefined
        );
        setValue(
            `students.${studentIndex}.productFieldArrayItems.${dataIndex}.packageCourses`,
            undefined
        );
        setValue(
            `students.${studentIndex}.productFieldArrayItems.${dataIndex}.associatedProducts`,
            undefined
        );

        resetField(
            `students.${studentIndex}.productFieldArrayItems.${dataIndex}.recurringDetails.startDate`
        );
        setValue(
            `students.${studentIndex}.productFieldArrayItems.${dataIndex}.recurringDetails`,
            undefined
        );
    };

    const onProductExtensionSuccess = (
        data: ProductExtensionType | undefined,
        entity: ProductEntityType
    ) => {
        setValue(`students.${studentIndex}.productFieldArrayItems.${dataIndex}.${entity}`, data);

        if (
            isRecurringProductMaterial(data) ||
            isScheduleBasedPackageProduct(data) ||
            isFrequencyBasedPackageProduct(data)
        ) {
            setValue(
                `students.${studentIndex}.productFieldArrayItems.${dataIndex}.recurringDetails.startDate`,
                null
            );
        }
    };

    const onProductPriceDetailSuccess = (data: ProductPriceType[] | undefined) => {
        setValue(
            `students.${studentIndex}.productFieldArrayItems.${dataIndex}.productPrices`,
            data
        );
    };

    const onBillingSchedulePeriodsSuccess = (data: BillingSchedulePeriod[] | undefined) => {
        setValue(
            `students.${studentIndex}.productFieldArrayItems.${dataIndex}.recurringDetails.billingSchedulePeriods`,
            data
        );
    };

    const isProductListItemStatusCancelled = (): boolean => {
        return productFieldItem.updateOrderDetails?.orderStatus === ProductListItemStatus.CANCELLED;
    };

    const { orderType } = useProductPluginsContext();

    const rules = useMemo(
        () =>
            validationRules.product(
                getValues("students")[studentIndex].productFieldArrayItems[dataIndex],
                orderType
            ),
        [getValues, validationRules, studentIndex, dataIndex, orderType]
    );

    return (
        <ProductListItemAccordion
            base={
                <Box
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <ProductAutocompleteWithIdsHF2Extended<OrderFormValues>
                        key={productFieldItem.id}
                        productAutocompleteWithIdsHF2Props={{
                            controllerProps: {
                                name: `students.${studentIndex}.productFieldArrayItems.${dataIndex}.product`,
                                rules: rules,
                            },
                            productIdsToSearch: productIds,
                            productIdsToExclude: selectedProductIds,
                            readOnly: orderType === OrderType.ORDER_TYPE_UPDATE,
                            TextFieldPropsOverride: {
                                InputProps: {
                                    startAdornment: isProductListItemStatusCancelled() && (
                                        <CancelledInputAdornment />
                                    ),
                                },
                                helperText: "", // Always hide error message
                            },
                        }}
                        productAutocompleteWithIdsHF2ExtendedProps={{
                            onTaxDetailSuccess,
                            onProductPriceDetailSuccess,
                            onProductExtensionSuccess,
                            onBillingSchedulePeriodsSuccess,
                            onSelectedProduct: (_product, entity) => {
                                onProductChange();
                                resetProductDetails(entity);
                            },
                        }}
                    />
                </Box>
            }
            onChange={onChangeAccordion}
            expanded={expanded}
            size="large"
            disabled={isAccordionDisabled}
        >
            <Box mt={2} paddingLeft={6}>
                <ProductListItemDetails productIndex={dataIndex} studentIndex={studentIndex} />
            </Box>
        </ProductListItemAccordion>
    );
};

export default ProductListItem;
