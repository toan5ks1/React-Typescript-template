import { useMemo } from "react";

import { Entities } from "src/common/constants/enum";
import {
    Payment_GetManyDiscountsQuery,
    Payment_GetManyDiscountsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

import MAutocompleteServiceHF, {
    MAutocompleteServiceHFProps,
} from "src/components/Autocompletes/MAutocompleteServiceHF";
import useDiscountAutocomplete from "src/squads/payment/components/Autocompletes/DiscountAutocompleteHF/useDiscountAutocomplete";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

type DiscountServiceHFProp<TFormValues> = MAutocompleteServiceHFProps<
    TFormValues,
    ArrayElement<Payment_GetManyDiscountsQuery["discount"]>,
    Payment_GetManyDiscountsQueryVariables
>;
export interface DiscountAutocompleteHFProps<TFormValues>
    extends Pick<DiscountServiceHFProp<TFormValues>, "readOnly" | "open"> {
    controllerProps: DiscountServiceHFProp<TFormValues>["controllerProps"];
}

const DiscountAutocompleteHF = <TFormValues extends unknown>({
    controllerProps,
    ...mAutocompleteServiceProps
}: DiscountAutocompleteHFProps<TFormValues>) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const filterFields: Payment_GetManyDiscountsQueryVariables = useMemo(() => {
        return {
            current_date: new Date().toISOString(),
        };
    }, []);

    return (
        <MAutocompleteServiceHF<
            TFormValues,
            ArrayElement<Payment_GetManyDiscountsQuery["discount"]>,
            Payment_GetManyDiscountsQueryVariables
        >
            controllerProps={controllerProps}
            {...mAutocompleteServiceProps}
            data-testid={"DiscountsAutocompleteHF__autocomplete"}
            useService={useDiscountAutocomplete}
            optionId={"discount_id"}
            optionLabelKey={"name"}
            queryVariables={{ current_date: filterFields.current_date }}
            TextFieldPropsOverride={{
                label: `${tOrder("label.discount")}`,
                placeholder: `${tOrder("label.discount")}`,
            }}
        />
    );
};

export default DiscountAutocompleteHF;
