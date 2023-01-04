import {
    Payment_GetManyTaxesReferenceQuery,
    Payment_GetManyTaxesReferenceQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { MAutocompleteServiceHook } from "src/components/Autocompletes/MAutocompleteService";
import useAutocompleteDebounce from "src/squads/payment/components/Autocompletes/useAutocompleteDebounce";

const useTaxAutocomplete: MAutocompleteServiceHook<
    ArrayElement<Payment_GetManyTaxesReferenceQuery["tax"]>,
    Payment_GetManyTaxesReferenceQueryVariables
> = ({ searchText, queryVariables: { limit } }) => {
    const debouncedSearchText = useAutocompleteDebounce(searchText);

    return inferQuery({
        entity: "tax",
        action: "paymentGetManyReference",
    })({ name: debouncedSearchText, limit }, { enabled: true });
};

export default useTaxAutocomplete;
