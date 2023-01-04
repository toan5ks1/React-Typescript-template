import { UseFormProps } from "react-hook-form";
import { ArrayElement } from "src/common/constants/types";
import { firstOptionsChoice } from "src/common/helpers/helpers";
import { CoursesManyReferenceQuery } from "src/squads/communication/service/bob/bob-types";
import { TestApp } from "src/squads/communication/test-utils";

import MuiPickersUtilsProvider from "src/providers/MuiPickersUtilsProvider";
import CoursesAutocompleteHF, {
    CoursesAutocompleteHFProps,
} from "src/squads/communication/pages/Notification/components/Autocompletes/CoursesAutocompleteHF";

import { render, screen } from "@testing-library/react";
import useAutocompleteReference, {
    ChoiceType,
} from "src/squads/communication/hooks/useAutocompleteReference";
import { withReactHookForm } from "src/squads/communication/test-utils/HOCs/withReactHookForm";

jest.mock("src/squads/communication/hooks/useAutocompleteReference", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const defaultCoursesAutocompleteHFProps: CoursesAutocompleteHFProps = {
    name: "courses",
    disableClearable: false,
    disableCloseOnSelect: true,
    getOptionSelectedField: "value",
};

const defaultUseFormOptions: UseFormProps = {
    defaultValues: {
        courses: [],
    },
};

const renderCourseAutocompleteHF = (
    props = defaultCoursesAutocompleteHFProps,
    useFormOptions = defaultUseFormOptions
) => {
    const CoursesAutocomplete = withReactHookForm(CoursesAutocompleteHF, props, useFormOptions);

    render(
        <MuiPickersUtilsProvider>
            <TestApp>
                <CoursesAutocomplete />
            </TestApp>
        </MuiPickersUtilsProvider>
    );
};

describe("<CoursesAutocompleteHF />", () => {
    it("should render correct UI", () => {
        (useAutocompleteReference as jest.Mock).mockReturnValue({
            options: [],
            isFetching: false,
        });

        renderCourseAutocompleteHF();

        expect(screen.getByTestId("CoursesAutocompleteHF__autocomplete")).toBeInTheDocument();
        expect(screen.getByTestId("AutocompleteBase__input")).toBeInTheDocument();
    });
});

describe("<CoursesAutocompleteHF /> render with firstOptions", () => {
    it("should render correct option listing", () => {
        (useAutocompleteReference as jest.Mock).mockReturnValue({
            options: [
                { course_id: undefined, value: "All Courses", name: "All Courses", school_id: 123 },
            ],
            isFetching: false,
        });

        renderCourseAutocompleteHF({
            ...defaultCoursesAutocompleteHFProps,
            open: true,
            firstOptions: [
                firstOptionsChoice<ChoiceType<ArrayElement<CoursesManyReferenceQuery["courses"]>>>({
                    firstChoiceLabel: "All Courses",
                    key: "course_id",
                    keyValue: "name",
                }),
            ],
        });

        expect(screen.getAllByTestId("AutocompleteBase__option")[0]).toBeInTheDocument();
        expect(screen.getAllByTestId("AutocompleteBase__option")[0]).toHaveTextContent(
            "All Courses"
        );
    });
});
