import { useMemo } from "react";

import {
    Payment_GetManyProductsByProductIdsAndAvailableDateQuery,
    Payment_GetManyProductsByProductIdsAndAvailableDateQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { MAutocompleteServiceHook } from "src/components/Autocompletes/MAutocompleteService";
import useAutocompleteDebounce from "src/squads/payment/components/Autocompletes/useAutocompleteDebounce";

const useProductAutocomplete: MAutocompleteServiceHook<
    ArrayElement<Payment_GetManyProductsByProductIdsAndAvailableDateQuery["product"]>,
    Payment_GetManyProductsByProductIdsAndAvailableDateQueryVariables
> = ({ searchText, queryVariables: { product_ids } }) => {
    const currentDate = useMemo(() => new Date().toISOString(), []);
    const debouncedSearchText = useAutocompleteDebounce(searchText);

    return inferQuery({
        entity: "product",
        action: "paymentGetManyReferenceProduct",
    })(
        {
            name: debouncedSearchText,
            product_ids,
            available_from: currentDate,
            available_until: currentDate,
        },
        { enabled: true }
    );
};

export default useProductAutocomplete;
