import { NsBobLocationService } from "src/squads/payment/service/bob/locations-service-bob/types";
import { inferQuery } from "src/squads/payment/service/infer-query";

import { MAutocompleteServiceHook } from "src/components/Autocompletes/MAutocompleteService";
import useAutocompleteDebounce from "src/squads/payment/components/Autocompletes/useAutocompleteDebounce";

const useLowestLevelLocations: MAutocompleteServiceHook<
    NsBobLocationService.RetrieveLocationsResponseLocation,
    Partial<NsBobLocationService.RetrieveLowestLocationsRequest>
> = ({ searchText, onSuccess }) => {
    const debouncedSearchText = useAutocompleteDebounce(searchText);

    const test = inferQuery({
        entity: "orderPayment",
        action: "paymentGetLowestLevelLocations",
    })(
        { name: debouncedSearchText, limit: 30, offset: 0 },
        { enabled: true, selector: (response) => response.data, onSuccess }
    );

    return test;
};

export default useLowestLevelLocations;
