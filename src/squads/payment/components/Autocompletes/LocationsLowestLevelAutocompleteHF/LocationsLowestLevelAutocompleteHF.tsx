import { Entities } from "src/common/constants/enum";
import { NsBobLocationService } from "src/squads/payment/service/bob/locations-service-bob/types";

import MAutocompleteServiceHF, {
    MAutocompleteServiceHFProps,
} from "src/components/Autocompletes/MAutocompleteServiceHF";
import useLowestLevelLocations from "src/squads/payment/components/Autocompletes/LocationsLowestLevelAutocompleteHF/useLowestLevelLocations";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

type LocationsLowestLevelAutocompleteHFProps<TFormValues> = MAutocompleteServiceHFProps<
    TFormValues,
    NsBobLocationService.RetrieveLocationsResponseLocation,
    Partial<NsBobLocationService.RetrieveLowestLocationsRequest>
>;
export interface LocationsLowestLevelAutocompleteServiceHF<TFormValues>
    extends Pick<
        LocationsLowestLevelAutocompleteHFProps<TFormValues>,
        "open" | "readOnly" | "onChange" | "onSuccess"
    > {
    controllerProps: LocationsLowestLevelAutocompleteHFProps<TFormValues>["controllerProps"];
}

export const LocationsLowestLevelAutocompleteHF = <TFormValues extends unknown>({
    controllerProps,
    ...mAutocompleteServiceProps
}: LocationsLowestLevelAutocompleteServiceHF<TFormValues>) => {
    const tMaster = useResourceTranslate(Entities.MASTERS);

    return (
        <MAutocompleteServiceHF<
            TFormValues,
            NsBobLocationService.RetrieveLocationsResponseLocation,
            Partial<NsBobLocationService.RetrieveLowestLocationsRequest>
        >
            controllerProps={controllerProps}
            {...mAutocompleteServiceProps}
            TextFieldPropsOverride={{
                label: tMaster("choices.masterData.location"),
            }}
            fullWidth={true}
            data-testid={"LocationsLowestLevelAutocompleteHF__autocomplete"}
            useService={useLowestLevelLocations}
            optionId={"locationId"}
            optionLabelKey={"name"}
            disableClearable
            queryVariables={{}}
        />
    );
};

export default LocationsLowestLevelAutocompleteHF;
