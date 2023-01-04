import { useState } from "react";

import includes from "lodash/includes";
import { getEntityBasedOnProductType } from "src/squads/payment/helpers/product-type";
import {
    Payment_GetManyProductsByProductIdsAndAvailableDateQuery,
    Payment_GetManyProductsByProductIdsAndAvailableDateQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { BillingSchedulePeriod } from "src/squads/payment/types/service/billing-schedule-period-types";
import { ProductPriceType } from "src/squads/payment/types/service/price-types";
import {
    ProductEntityType,
    ProductExtensionType,
    ProductTypeQuery,
} from "src/squads/payment/types/service/product-types";
import { ProductTaxType } from "src/squads/payment/types/service/tax-types";

import MAutocompleteServiceHF, {
    MAutocompleteServiceHFProps,
} from "src/components/Autocompletes/MAutocompleteServiceHF";
import useProductAutocomplete from "src/squads/payment/components/Autocompletes/ProductAutocompleteWithIdsHF2Extended/useProductAutocomplete";

import useBillingSchedulePeriods from "src/squads/payment/domains/OrderManagement/hooks/useBillingSchedulePeriods";
import useProductExtension from "src/squads/payment/domains/OrderManagement/hooks/useProductExtension";
import useProductPriceDetail from "src/squads/payment/domains/OrderManagement/hooks/useProductPriceDetail";
import useTaxDetail from "src/squads/payment/domains/OrderManagement/hooks/useTaxDetail";
import useTranslate from "src/squads/payment/hooks/useTranslate";

type ProductServiceHFProp<TFormValues> = MAutocompleteServiceHFProps<
    TFormValues,
    ProductTypeQuery,
    Payment_GetManyProductsByProductIdsAndAvailableDateQueryVariables
>;
interface ProductAutocompleteWithIdsHF2Props<TFormValues>
    extends Pick<ProductServiceHFProp<TFormValues>, "readOnly" | "TextFieldPropsOverride"> {
    controllerProps: ProductServiceHFProp<TFormValues>["controllerProps"];
    productIdsToSearch: ProductTypeQuery["product_id"][];
    productIdsToExclude: ProductTypeQuery["product_id"][];
    handleValueChange: (product: ProductTypeQuery) => void;
}

const ProductAutocompleteWithIdsHF2 = <TFormValues extends unknown>({
    controllerProps,
    productIdsToSearch,
    productIdsToExclude,
    handleValueChange,
    ...mAutocompleteServiceProps
}: ProductAutocompleteWithIdsHF2Props<TFormValues>) => {
    const tCommon = useTranslate();

    return (
        <MAutocompleteServiceHF<
            TFormValues,
            ArrayElement<Payment_GetManyProductsByProductIdsAndAvailableDateQuery["product"]>,
            Payment_GetManyProductsByProductIdsAndAvailableDateQueryVariables,
            false,
            true,
            false
        >
            controllerProps={controllerProps}
            {...mAutocompleteServiceProps}
            data-testid="ProductAutocompleteWithIdsHF__autocomplete"
            multiple={false}
            disableClearable={true}
            onChange={(_event, product, _reason, _details) => {
                handleValueChange(product);
            }}
            useService={useProductAutocomplete}
            getOptionDisabled={(option) => {
                return includes(productIdsToExclude, option.product_id);
            }}
            optionId={"product_id"}
            optionLabelKey={"name"}
            queryVariables={{ product_ids: productIdsToSearch }}
            TextFieldPropsOverride={{
                ...mAutocompleteServiceProps.TextFieldPropsOverride,
                label: undefined, // PdM want to hide label and show placeholder https://manabie.atlassian.net/browse/LT-13408
                placeholder: tCommon("resources.common.name"),
            }}
        />
    );
};

interface ProductAutocompleteWithIdsHF2ExtendedProps {
    onSelectedProduct: (product: ProductTypeQuery, entity: ProductEntityType) => void;
    onTaxDetailSuccess: (data: ProductTaxType | undefined) => void;
    onProductExtensionSuccess: (
        data: ProductExtensionType | undefined,
        entity: ProductEntityType
    ) => void;
    onProductPriceDetailSuccess: (data: ProductPriceType[] | undefined) => void;
    onBillingSchedulePeriodsSuccess: (data: BillingSchedulePeriod[] | undefined) => void;
}
const ProductAutocompleteWithIdsHF2Extended = <TFormValues extends unknown>({
    productAutocompleteWithIdsHF2ExtendedProps: {
        onSelectedProduct,
        onProductExtensionSuccess,
        onTaxDetailSuccess,
        onProductPriceDetailSuccess,
        onBillingSchedulePeriodsSuccess,
    },
    productAutocompleteWithIdsHF2Props,
}: {
    productAutocompleteWithIdsHF2Props: Omit<
        ProductAutocompleteWithIdsHF2Props<TFormValues>,
        "handleValueChange"
    >;
    productAutocompleteWithIdsHF2ExtendedProps: ProductAutocompleteWithIdsHF2ExtendedProps;
}) => {
    const [product, setProduct] = useState<ProductTypeQuery>();
    const entity = getEntityBasedOnProductType(product?.product_type);

    const handleSelectedProduct = (selectedProduct: ProductTypeQuery) => {
        const entity = getEntityBasedOnProductType(selectedProduct.product_type);
        onSelectedProduct(selectedProduct, entity);
        setProduct(selectedProduct);
    };

    useProductExtension({
        entity: entity,
        productId: product?.product_id,
        onSuccess: (productExtension) => onProductExtensionSuccess(productExtension, entity),
    });

    useTaxDetail({
        taxId: product?.tax_id ?? undefined,
        productId: product?.product_id,
        onSuccess: onTaxDetailSuccess,
    });

    useProductPriceDetail({
        productId: product?.product_id,
        onSuccess: onProductPriceDetailSuccess,
    });

    useBillingSchedulePeriods({
        productId: product?.product_id,
        billingScheduleId: product?.billing_schedule_id ?? undefined,
        onSuccess: onBillingSchedulePeriodsSuccess,
    });

    return (
        <ProductAutocompleteWithIdsHF2
            {...productAutocompleteWithIdsHF2Props}
            handleValueChange={handleSelectedProduct}
        />
    );
};
export default ProductAutocompleteWithIdsHF2Extended;
