import AutocompleteStudentsHF from "src/squads/lesson/components/Autocompletes/AutocompleteStudentsHF";

import { render, RenderResult, waitFor } from "@testing-library/react";
import { withReactHookForm } from "src/squads/lesson/test-utils/HOCs";

const mockStudent = {
    user_id: "student_id",
    name: "student_name",
    email: "student_email",
    avatar: null,
};

jest.mock("react-admin", () => {
    const originalModule = jest.requireActual("react-admin");

    return {
        ...originalModule,
        useDataProvider: () => ({
            getManyReference: () => {
                return { data: [mockStudent], total: 0 };
            },
        }),
    };
});

describe("<AutocompleteStudentsHF />", () => {
    const AutocompleteStudents = withReactHookForm(
        AutocompleteStudentsHF,
        {
            name: "students",
            firstOptions: [mockStudent],
        },
        {
            defaultValues: {
                students: [mockStudent],
            },
        }
    );

    it("should render correct UI", async () => {
        const wrapper: RenderResult = render(<AutocompleteStudents />);
        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );

        expect(wrapper.getByTestId("AutocompleteStudentsHF__autocomplete")).toBeInTheDocument();
        expect(wrapper.getByTestId("AutocompleteBase__input")).toBeInTheDocument();
        expect(wrapper.getByLabelText("Clear")).toBeInTheDocument();
    });
});

describe("<AutocompleteStudentsHF /> render with defaultValue", () => {
    const AutocompleteStudents = withReactHookForm(
        AutocompleteStudentsHF,
        {
            name: "students",
            limitChipText: "Ellipsis",
            multiple: true,
            firstOptions: [mockStudent],
        },
        {
            defaultValues: {
                students: [mockStudent],
            },
        }
    );

    it("should render correct defaultValue", async () => {
        const wrapper: RenderResult = render(<AutocompleteStudents />);
        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );
        expect(wrapper.getByTestId("ChipAutocomplete")).toHaveTextContent(mockStudent.name);
    });
});
