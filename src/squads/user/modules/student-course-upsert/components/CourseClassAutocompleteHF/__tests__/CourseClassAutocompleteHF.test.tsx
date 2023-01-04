import { TestCommonAppProvider, TestHookFormProvider } from "src/squads/user/test-utils/providers";

import { AutocompleteHFProps } from "src/components/Autocompletes/AutocompleteHF";

import CourseClassAutocompleteHF, {
    CourseClassAutocompleteHFProps,
} from "../CourseClassAutocompleteHF";

import { render } from "@testing-library/react";
import useCourseClasses, {
    ICourseClass,
} from "src/squads/user/modules/student-course-upsert/hooks/useCourseClasses";

const mockOptions: ICourseClass[] = [
    {
        name: `Class 1`,
        class_id: `class_1`,
    },
];

jest.mock("src/squads/user/modules/student-course-upsert/hooks/useCourseClasses", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const defaultProps: CourseClassAutocompleteHFProps = {
    name: "class",
    courseId: "course-1",
    locationId: "location-1",
    getOptionSelectedField: "class_id",
};

const renderCourseClassAutocomplete = (
    overrideProps?: Partial<AutocompleteHFProps<ICourseClass>>,
    options: ICourseClass[] = mockOptions
) => {
    (useCourseClasses as jest.Mock<ReturnType<typeof useCourseClasses>>).mockReturnValue({
        options: options,
        loading: false,
    });

    return render(
        <TestCommonAppProvider>
            <TestHookFormProvider>
                <CourseClassAutocompleteHF {...defaultProps} {...overrideProps} />
            </TestHookFormProvider>
        </TestCommonAppProvider>
    );
};

describe("<CourseClassAutocompleteHF />", () => {
    it("should render correct UI", () => {
        const wrapper = renderCourseClassAutocomplete();
        expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument();
        expect(wrapper.getByTestId("StudentCourseUpsertTable__class")).toBeInTheDocument();
        expect(wrapper.getByTestId("AutocompleteBase__input")).toBeInTheDocument();
    });

    it("should render correct options with data", () => {
        const wrapper = renderCourseClassAutocomplete({
            open: true,
        });

        expect(wrapper.getByTestId("AutocompleteBase__listBox")).toBeInTheDocument();
        expect(wrapper.getAllByTestId("AutocompleteBase__option")).toHaveLength(mockOptions.length);
        wrapper.getAllByTestId("AutocompleteBase__option").forEach((option, index) => {
            expect(option).toHaveTextContent(mockOptions[index].name);
        });
    });

    it("should render correct options without data", () => {
        const wrapper = renderCourseClassAutocomplete({ open: true }, []);

        expect(wrapper.getByText("No options"));
    });
});
