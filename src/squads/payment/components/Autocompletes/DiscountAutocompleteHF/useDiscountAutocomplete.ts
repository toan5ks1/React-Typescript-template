import {
    Payment_GetManyDiscountsQuery,
    Payment_GetManyDiscountsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { MAutocompleteServiceHook } from "src/components/Autocompletes/MAutocompleteService";
import useAutocompleteDebounce from "src/squads/payment/components/Autocompletes/useAutocompleteDebounce";

const useDiscountAutocomplete: MAutocompleteServiceHook<
    ArrayElement<Payment_GetManyDiscountsQuery["discount"]>,
    Payment_GetManyDiscountsQueryVariables
> = ({ searchText, queryVariables: { current_date } }) => {
    const debouncedSearchText = useAutocompleteDebounce(searchText);

    return inferQuery({
        entity: "discount",
        action: "paymentGetManyDiscountsByCurrentDate",
    })({ current_date: current_date, name: debouncedSearchText }, { enabled: true });
};

export default useDiscountAutocomplete;
