import { createMockStudent } from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider, TestHookFormProvider } from "src/squads/user/test-utils/providers";

import { AutocompleteHFProps } from "src/components/Autocompletes/AutocompleteHF";

import CourseLocationAutocompleteHF, {
    CourseLocationAutocompleteHFProps,
} from "../CourseLocationAutocompleteHF";

import { render } from "@testing-library/react";
import useCourseLocations, {
    ICourseLocation,
} from "src/squads/user/modules/student-course-upsert/hooks/useCourseLocations";

const mockStudent = createMockStudent({
    id: "student-1",
    current_grade: 10,
});

const mockOptions: ICourseLocation[] = [
    {
        name: `Center 1`,
        location_id: `center_0`,
        location_type: `center`,
        parent_location_id: `parent_center`,
        access_path: "",
    },
];

jest.mock("src/squads/user/modules/student-course-upsert/hooks/useCourseLocations", () =>
    jest.fn()
);

const defaultProps: CourseLocationAutocompleteHFProps = {
    name: "location",
    courseId: "course-1",
    getOptionSelectedField: "location_id",
    studentLocations: mockStudent.user.locations || [],
};

const renderCourseLocationAutocomplete = (
    overrideProps?: Partial<AutocompleteHFProps<ICourseLocation>>,
    options: ICourseLocation[] = mockOptions
) => {
    (useCourseLocations as jest.Mock<ReturnType<typeof useCourseLocations>>).mockReturnValue({
        options: options,
        loading: false,
    });

    return render(
        <TestCommonAppProvider>
            <TestHookFormProvider>
                <CourseLocationAutocompleteHF {...defaultProps} {...overrideProps} />
            </TestHookFormProvider>
        </TestCommonAppProvider>
    );
};

describe("<CourseLocationAutocompleteHF />", () => {
    it("should render correct UI", () => {
        const wrapper = renderCourseLocationAutocomplete();
        expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument();
        expect(wrapper.getByTestId("StudentCourseUpsertTable__location")).toBeInTheDocument();
        expect(wrapper.getByTestId("AutocompleteBase__input")).toBeInTheDocument();
    });

    it("should render correct options with data", () => {
        const wrapper = renderCourseLocationAutocomplete({
            open: true,
        });

        expect(wrapper.getByTestId("AutocompleteBase__listBox")).toBeInTheDocument();
        expect(wrapper.getAllByTestId("AutocompleteBase__option")).toHaveLength(mockOptions.length);
        wrapper.getAllByTestId("AutocompleteBase__option").forEach((option, index) => {
            expect(option).toHaveTextContent(mockOptions[index].name);
        });
    });

    it("should render correct options without data", () => {
        const wrapper = renderCourseLocationAutocomplete({ open: true }, []);

        expect(wrapper.getByText("No options"));
    });
});
