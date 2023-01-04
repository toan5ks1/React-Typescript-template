import {
    Payment_GetManyProductsReferenceQuery,
    Payment_GetManyProductsReferenceQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { MAutocompleteServiceHook } from "src/components/Autocompletes/MAutocompleteService";
import useAutocompleteDebounce from "src/squads/payment/components/Autocompletes/useAutocompleteDebounce";

const useProductAutocomplete: MAutocompleteServiceHook<
    ArrayElement<Payment_GetManyProductsReferenceQuery["product"]>,
    Payment_GetManyProductsReferenceQueryVariables
> = ({ searchText, queryVariables: { limit } }) => {
    const debouncedSearchText = useAutocompleteDebounce(searchText);

    return inferQuery({
        entity: "product",
        action: "paymentGetManyReferenceAutocompleteProduct",
    })({ name: debouncedSearchText, limit }, { enabled: true });
};

export default useProductAutocomplete;
