import { UseFormProps } from "react-hook-form";
import { getStudentName } from "src/squads/payment/helpers/student";
import { createMockOrderFormValues } from "src/squads/payment/test-utils/mocks/order-form";
import { getAutocompleteInputByTestId } from "src/squads/payment/test-utils/utils";

import StudentInfoSection, {
    StudentInfoSectionProps,
} from "src/squads/payment/components/Sections/StudentInfoSection";

import { fireEvent, render, within } from "@testing-library/react";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";

const mockOrderFormValues = createMockOrderFormValues();
const firstStudentIndex = 0;
const studentInfoSectionProps: StudentInfoSectionProps = {
    onLocationChange: jest.fn(),
    studentIndex: firstStudentIndex,
};

jest.mock(
    "src/squads/payment/components/Autocompletes/LocationsLowestLevelAutocompleteHF/useLowestLevelLocations"
);
const renderStudentInfoSection = (useFormOptions?: UseFormProps) => {
    return render(
        <TestHookFormProvider useFormOptions={useFormOptions}>
            <StudentInfoSection {...studentInfoSectionProps} />
        </TestHookFormProvider>
    );
};

describe("<StudentInfoSection />", () => {
    it("should render student info and location autocomplete", () => {
        const wrapper = renderStudentInfoSection();

        expect(wrapper.getByTestId("StudentInfoSection__studentNameContainer")).toBeInTheDocument();
        expect(
            wrapper.getByTestId("LocationsLowestLevelAutocompleteHF__autocomplete")
        ).toBeInTheDocument();

        const studentNameLabelElement = wrapper.getByTestId("StudentInfoSection__studentNameTitle");
        expect(
            within(studentNameLabelElement).getByText("resources.orders.label.name")
        ).toBeInTheDocument();
    });

    it("should display correct data", () => {
        const wrapper = renderStudentInfoSection({
            defaultValues: mockOrderFormValues,
        });

        const studentNameElement = wrapper.getByTestId("StudentInfoSection__studentNameContainer");
        const studentFormValue = mockOrderFormValues.students[firstStudentIndex];
        expect(
            within(studentNameElement).getByText(getStudentName(studentFormValue.studentInfo?.user))
        ).toBeInTheDocument();
    });

    it("should call onLocationChange when location is changed or selected", () => {
        renderStudentInfoSection({
            defaultValues: mockOrderFormValues,
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

        expect(studentInfoSectionProps.onLocationChange).toBeCalled();
    });
});
