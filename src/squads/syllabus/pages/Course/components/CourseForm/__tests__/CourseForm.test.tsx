import { TestQueryWrapper } from "src/squads/syllabus/test-utils/react-hooks";

import CourseForm, { CourseTeachingMethodOption } from "../CourseForm";

import { render, screen, waitFor, within } from "@testing-library/react";
import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";
import TestHookFormProvider from "src/squads/syllabus/test-utils/TestHookFormProvider";

jest.mock("src/squads/syllabus/hooks/useFeatureToggle", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const renderComponent = ({
    enabledTeachingMethod,
    isEditMode,
    teachingMethodOption,
}: {
    enabledTeachingMethod: boolean;
    isEditMode?: boolean;
    teachingMethodOption?: CourseTeachingMethodOption;
}) => {
    (useFeatureToggle as jest.Mock).mockImplementation(() => {
        return {
            isEnabled: enabledTeachingMethod,
        };
    });

    render(
        <TestQueryWrapper>
            <TestHookFormProvider>
                <CourseForm isEditMode={isEditMode} defaultTeachingMethod={teachingMethodOption} />
            </TestHookFormProvider>
        </TestQueryWrapper>
    );
};
describe(CourseForm.name, () => {
    it("should render form with teaching method", () => {
        renderComponent({ enabledTeachingMethod: true });
        expect(screen.getByTestId("AvatarInput__labelHtmlFor")).toHaveAttribute("for", "iconFile");

        expect(screen.getByTestId("TextFieldHF__input")).toHaveAttribute("name", "name");
        expect(screen.getByTestId("LocationSelectInputHF__root")).toBeInTheDocument();
        expect(
            screen.getByTestId("TeachingMethodAutocompleteHF__autocomplete")
        ).toBeInTheDocument();
    });

    it("should render form without teaching method field", async () => {
        renderComponent({ enabledTeachingMethod: false });
        await waitFor(() => {
            expect(
                screen.queryByTestId("TeachingMethodAutocompleteHF__autocomplete")
            ).not.toBeInTheDocument();
        });
    });
});

describe(`${CourseForm.name} with teaching method`, () => {
    it("should be able to edit teaching method when course hadn't teaching method already", async () => {
        renderComponent({ enabledTeachingMethod: true });

        const teachingMethodAutoComplete = screen.getByTestId(
            "TeachingMethodAutocompleteHF__autocomplete"
        );
        const inputTeachingMethod = within(teachingMethodAutoComplete).getByTestId(
            "AutocompleteBase__input"
        );
        expect(inputTeachingMethod).toBeEnabled();
    });
    it("should not be able to edit teaching method when course had teaching method already", async () => {
        const teachingMethodOption: CourseTeachingMethodOption = {
            id: 1,
            name: "teaching method",
        };
        renderComponent({ enabledTeachingMethod: true, isEditMode: true, teachingMethodOption });

        const teachingMethodAutoComplete = screen.getByTestId(
            "TeachingMethodAutocompleteHF__autocomplete"
        );

        const inputTeachingMethod = within(teachingMethodAutoComplete).getByTestId(
            "AutocompleteBase__input"
        );
        expect(inputTeachingMethod).toBeDisabled();
    });
});
