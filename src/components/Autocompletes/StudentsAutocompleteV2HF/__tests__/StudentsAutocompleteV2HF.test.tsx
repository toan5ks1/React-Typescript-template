import StudentsAutocompleteV2HF from "../StudentsAutocompleteV2HF";

import { render, RenderResult, waitFor } from "@testing-library/react";
import { withReactHookForm } from "src/test-utils/HOCs";

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

describe("<StudentsAutocompleteV2HF />", () => {
    const StudentsAutocompleteV2 = withReactHookForm(
        StudentsAutocompleteV2HF,
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
        const wrapper: RenderResult = render(<StudentsAutocompleteV2 />);
        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );

        expect(wrapper.getByTestId("StudentsAutocompleteV2HF__autocomplete")).toBeInTheDocument();
        expect(wrapper.getByTestId("AutocompleteBase__input")).toBeInTheDocument();
        expect(wrapper.getByLabelText("Clear")).toBeInTheDocument();
    });
});

describe("<StudentsAutocompleteV2HF /> render with defaultValue", () => {
    const StudentsAutocompleteV2 = withReactHookForm(
        StudentsAutocompleteV2HF,
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
        const wrapper: RenderResult = render(<StudentsAutocompleteV2 />);
        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );
        expect(wrapper.getByTestId("ChipAutocomplete")).toHaveTextContent(mockStudent.name);
    });
});
