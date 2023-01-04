import { Entities } from "src/common/constants/enum";
import {
    Payment_GetManyProductsReferenceQuery,
    Payment_GetManyProductsReferenceQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

import MAutocompleteServiceHF, {
    MAutocompleteServiceHFProps,
} from "src/components/Autocompletes/MAutocompleteServiceHF";
import useProductAutocomplete from "src/squads/payment/components/Autocompletes/ProductAutocompleteHF/useProductAutocomplete";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

type ProductServiceHFProp<TFormValues> = MAutocompleteServiceHFProps<
    TFormValues,
    ArrayElement<Payment_GetManyProductsReferenceQuery["product"]>,
    Payment_GetManyProductsReferenceQueryVariables
>;
export interface ProductAutocompleteHFProps<TFormValues>
    extends Pick<ProductServiceHFProp<TFormValues>, "disableCloseOnSelect" | "open" | "limitTags"> {
    controllerProps: ProductServiceHFProp<TFormValues>["controllerProps"];
}

const ProductAutocompleteHF = <TFormValues extends unknown>({
    controllerProps,
    ...mAutocompleteServiceProps
}: ProductAutocompleteHFProps<TFormValues>) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    return (
        <MAutocompleteServiceHF<
            TFormValues,
            ArrayElement<Payment_GetManyProductsReferenceQuery["product"]>,
            Payment_GetManyProductsReferenceQueryVariables
        >
            controllerProps={controllerProps}
            {...mAutocompleteServiceProps}
            data-testid={"ProductAutocompleteHF_autocomplete"}
            useService={useProductAutocomplete}
            optionId={"product_id"}
            optionLabelKey={"name"}
            queryVariables={{}}
            multiple={true}
            TextFieldPropsOverride={{
                label: `${tOrder("column.product")}`,
                placeholder: `${tOrder("column.product")}`,
            }}
        />
    );
};

export default ProductAutocompleteHF;
