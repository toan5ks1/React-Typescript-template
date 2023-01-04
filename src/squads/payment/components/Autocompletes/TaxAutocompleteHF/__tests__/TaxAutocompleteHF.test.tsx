import { UseFormProps } from "react-hook-form";
import { Payment_GetManyTaxesReferenceQuery } from "src/squads/payment/service/fatima/fatima-types";
import { createMockGetManyTaxesReference } from "src/squads/payment/test-utils/mocks/tax";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { MAutocompleteServiceHookReturn } from "src/components/Autocompletes/MAutocompleteService";
import TaxAutocompleteHF, {
    TaxAutocompleteHFProps,
} from "src/squads/payment/components/Autocompletes/TaxAutocompleteHF/TaxAutocompleteHF";

import { render, screen } from "@testing-library/react";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";

const mockTaxChoices = createMockGetManyTaxesReference();
jest.mock(
    "src/squads/payment/components/Autocompletes/TaxAutocompleteHF/useTaxAutocomplete",
    () =>
        (): MAutocompleteServiceHookReturn<
            ArrayElement<Payment_GetManyTaxesReferenceQuery["tax"]>
        > => ({
            data: mockTaxChoices,
            isFetching: false,
        })
);

interface TestForm {
    tax: ArrayElement<Payment_GetManyTaxesReferenceQuery["tax"]>;
}
const renderTaxAutocomplete = (
    props: TaxAutocompleteHFProps<TestForm>,
    useFormOptions?: UseFormProps
) => {
    return render(
        <TestApp>
            <TestHookFormProvider useFormOptions={useFormOptions}>
                <TaxAutocompleteHF<TestForm> {...props} />
            </TestHookFormProvider>
        </TestApp>
    );
};

describe("<TaxAutocompleteHF />", () => {
    it("should render correct options", () => {
        renderTaxAutocomplete({
            controllerProps: {
                name: "tax",
            },
            open: true,
        });

        expect(screen.getByRole("listbox")).toBeInTheDocument();
        expect(screen.getAllByRole("option")).toHaveLength(mockTaxChoices.length);
    });

    it("should render correct default value", () => {
        renderTaxAutocomplete(
            {
                controllerProps: {
                    name: "tax",
                },
            },
            {
                defaultValues: {
                    tax: mockTaxChoices[0],
                },
            }
        );

        expect(screen.getByRole("combobox")).toHaveValue(mockTaxChoices[0].name);
    });
});
