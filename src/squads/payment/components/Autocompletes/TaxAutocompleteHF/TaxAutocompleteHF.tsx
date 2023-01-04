import {
    Payment_GetManyTaxesReferenceQuery,
    Payment_GetManyTaxesReferenceQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

import MAutocompleteServiceHF, {
    MAutocompleteServiceHFProps,
} from "src/components/Autocompletes/MAutocompleteServiceHF";
import useTaxAutocomplete from "src/squads/payment/components/Autocompletes/TaxAutocompleteHF/useTaxAutocomplete";

type TaxServiceHFProp<TFormValues> = MAutocompleteServiceHFProps<
    TFormValues,
    ArrayElement<Payment_GetManyTaxesReferenceQuery["tax"]>,
    Payment_GetManyTaxesReferenceQueryVariables
>;
export interface TaxAutocompleteHFProps<TFormValues>
    extends Pick<TaxServiceHFProp<TFormValues>, "open"> {
    controllerProps: TaxServiceHFProp<TFormValues>["controllerProps"];
}

export const TaxAutocompleteHF = <TFormValues extends unknown>({
    controllerProps,
    ...mAutocompleteServiceProps
}: TaxAutocompleteHFProps<TFormValues>) => {
    return (
        <MAutocompleteServiceHF<
            TFormValues,
            ArrayElement<Payment_GetManyTaxesReferenceQuery["tax"]>,
            Payment_GetManyTaxesReferenceQueryVariables
        >
            controllerProps={controllerProps}
            {...mAutocompleteServiceProps}
            data-testid={"TaxAutocompleteHF_autocomplete"}
            useService={useTaxAutocomplete}
            optionId={"tax_id"}
            optionLabelKey={"name"}
            queryVariables={{}}
        />
    );
};

export default TaxAutocompleteHF;
