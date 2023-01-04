import { UseFormProps } from "react-hook-form";
import { getStudentName } from "src/squads/payment/helpers/student";
import { createMockCustomBillingOrderFormValue } from "src/squads/payment/test-utils/mocks/order-form-custom-billing";
import { getAutocompleteInputByTestId } from "src/squads/payment/test-utils/utils";

import CustomBillingStudentInfoSection, {
    CustomBillingStudentInfoSectionProps,
} from "src/squads/payment/components/Sections/CustomBillingStudentInfoSection/CustomBillingStudentInfoSection";

import { fireEvent, render, within } from "@testing-library/react";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";

const mockCustomBillingOrderFormValue = createMockCustomBillingOrderFormValue();

const customBillingStudentInfoSectionProps: CustomBillingStudentInfoSectionProps = {
    onLocationChange: jest.fn(),
};

jest.mock(
    "src/squads/payment/components/Autocompletes/LocationsLowestLevelAutocompleteHF/useLowestLevelLocations"
);

const renderCustomBillingStudentInfoSection = (useFormOptions?: UseFormProps) => {
    return render(
        <TestHookFormProvider useFormOptions={useFormOptions}>
            <CustomBillingStudentInfoSection {...customBillingStudentInfoSectionProps} />
        </TestHookFormProvider>
    );
};

describe("<CustomBillingStudentInfoSection />", () => {
    it("should render student info and location autocomplete", () => {
        const wrapper = renderCustomBillingStudentInfoSection();

        expect(
            wrapper.getByTestId("CustomBillingStudentInfoSection__studentNameContainer")
        ).toBeInTheDocument();
        expect(
            wrapper.getByTestId("LocationsLowestLevelAutocompleteHF__autocomplete")
        ).toBeInTheDocument();

        const studentNameLabelElement = wrapper.getByTestId(
            "CustomBillingStudentInfoSection__studentNameTitle"
        );
        expect(
            within(studentNameLabelElement).getByText("resources.orders.label.name")
        ).toBeInTheDocument();
    });

    it("should render correct student name", () => {
        const wrapper = renderCustomBillingStudentInfoSection({
            defaultValues: mockCustomBillingOrderFormValue,
        });

        const studentNameElement = wrapper.getByTestId(
            "CustomBillingStudentInfoSection__studentNameContainer"
        );
        expect(
            within(studentNameElement).getByText(
                getStudentName(mockCustomBillingOrderFormValue.student?.user)
            )
        ).toBeInTheDocument();
    });

    it("should call onLocationChange when location is changed or selected", () => {
        renderCustomBillingStudentInfoSection({
            defaultValues: mockCustomBillingOrderFormValue,
        });

        const { autocompleteInput } = getAutocompleteInputByTestId(
            "LocationsLowestLevelAutocompleteHF__autocomplete"
        );

        expect(autocompleteInput).toBeInTheDocument();
        fireEvent.click(autocompleteInput);
        fireEvent.change(autocompleteInput, { target: { value: "" } });
        fireEvent.change(autocompleteInput, { target: { value: "HN" } });
        fireEvent.keyDown(autocompleteInput, { key: "ArrowDown" });
        fireEvent.keyDown(autocompleteInput, { key: "Enter" });

        expect(customBillingStudentInfoSectionProps.onLocationChange).toBeCalled();
    });
});
