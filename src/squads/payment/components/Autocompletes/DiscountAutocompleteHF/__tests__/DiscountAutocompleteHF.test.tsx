import { UseFormProps } from "react-hook-form";
import { Payment_GetManyDiscountsQuery } from "src/squads/payment/service/fatima/fatima-types";
import { createMockDiscountChoices } from "src/squads/payment/test-utils/mocks/discount";
import { getAutocompleteInputByTestId } from "src/squads/payment/test-utils/utils";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { MAutocompleteServiceHookReturn } from "src/components/Autocompletes/MAutocompleteService";
import DiscountAutocompleteHF, {
    DiscountAutocompleteHFProps,
} from "src/squads/payment/components/Autocompletes/DiscountAutocompleteHF";

import { render, screen } from "@testing-library/react";
import MuiPickersUtilsProvider from "src/squads/payment/contexts/MuiPickersUtilsProvider";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

const mockDiscountChoices = createMockDiscountChoices();
jest.mock(
    "src/squads/payment/components/Autocompletes/DiscountAutocompleteHF/useDiscountAutocomplete",
    () =>
        (): MAutocompleteServiceHookReturn<
            ArrayElement<Payment_GetManyDiscountsQuery["discount"]>
        > => ({
            data: mockDiscountChoices,
            isFetching: false,
        })
);

interface TestForm {
    discount: ArrayElement<Payment_GetManyDiscountsQuery["discount"]>;
}
const renderDiscountAutocomplete = (
    mAutocompleteServiceProps?: Omit<DiscountAutocompleteHFProps<TestForm>, "controllerProps">,
    useFormOptions?: UseFormProps
) => {
    return render(
        <TestApp>
            <TestHookFormProvider useFormOptions={useFormOptions}>
                <TestThemeProvider>
                    <MuiPickersUtilsProvider>
                        <DiscountAutocompleteHF<TestForm>
                            controllerProps={{
                                name: `discount`,
                            }}
                            {...mAutocompleteServiceProps}
                        />
                    </MuiPickersUtilsProvider>
                </TestThemeProvider>
            </TestHookFormProvider>
        </TestApp>
    );
};

describe("<DiscountAutocompleteHF />", () => {
    it("should render correct UI", () => {
        renderDiscountAutocomplete();

        getAutocompleteInputByTestId("DiscountsAutocompleteHF__autocomplete");
        // expect(wrapper.getByLabelText("Clear")).toBeInTheDocument();
    });

    it("should render correct options", () => {
        renderDiscountAutocomplete({
            open: true,
        });

        expect(screen.getByRole("listbox")).toBeInTheDocument();
        expect(screen.getAllByRole("option")).toHaveLength(mockDiscountChoices.length);
    });

    it("should render correct default value", () => {
        renderDiscountAutocomplete(
            {},
            {
                defaultValues: {
                    discount: mockDiscountChoices[0],
                },
            }
        );

        const { autocompleteInput } = getAutocompleteInputByTestId(
            "DiscountsAutocompleteHF__autocomplete"
        );
        expect(autocompleteInput).toHaveValue(mockDiscountChoices[0].name);
    });
});
