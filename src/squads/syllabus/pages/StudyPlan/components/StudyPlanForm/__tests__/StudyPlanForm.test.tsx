import { mockStudyPlanFormData } from "src/squads/syllabus/test-utils/study-plan";

import StudyPlanForm, { StudyPlanFormProps } from "../StudyPlanForm";

import { render } from "@testing-library/react";
import { defaultStudyPlanFormValues } from "src/squads/syllabus/pages/StudyPlan/common/constants";
import { withReactHookForm } from "src/squads/syllabus/test-utils/HOCs";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("src/squads/syllabus/hooks/useAutocompleteReference");

describe(StudyPlanForm.name, () => {
    it("should render correct default values with add mode", () => {
        const defaultProps: StudyPlanFormProps = { isAddMode: true };
        const StudyPlanHF = withReactHookForm(StudyPlanForm, defaultProps, {
            defaultValues: defaultStudyPlanFormValues,
        });

        const { getByTestId, container } = render(<StudyPlanHF />, {
            wrapper: TestAppWithQueryClient,
        });

        const bookAutocomplete = container.querySelector("input[name='book']");
        const gradesAutocompleteChoices = getByTestId(
            "GradesAutocompleteHF__autocomplete"
        ).querySelectorAll("div[data-testid='AutocompleteBase__tagBox']");

        expect(bookAutocomplete).toBeEnabled();
        expect(bookAutocomplete).toHaveValue("");
        expect(container.querySelector("input[name='name']")).toHaveValue("");
        expect(gradesAutocompleteChoices.length).toEqual(0);
        expect(container.querySelector("input[name='trackSchoolProgress']")).not.toBeChecked();
    });

    it("should render correct default values with edit mode", () => {
        const defaultProps: StudyPlanFormProps = { isAddMode: false };
        const StudyPlanHF = withReactHookForm(StudyPlanForm, defaultProps, {
            defaultValues: mockStudyPlanFormData,
        });

        const { getByTestId, container } = render(<StudyPlanHF />, {
            wrapper: TestAppWithQueryClient,
        });

        const bookAutocomplete = container.querySelector("input[name='book']");
        const gradesAutocompleteChoices = getByTestId(
            "GradesAutocompleteHF__autocomplete"
        ).querySelectorAll("div[data-testid='AutocompleteBase__tagBox']");

        expect(bookAutocomplete).toBeDisabled();
        expect(bookAutocomplete).toHaveValue(mockStudyPlanFormData.book!.name);
        expect(container.querySelector("input[name='name']")).toHaveValue(
            mockStudyPlanFormData.name
        );
        expect(gradesAutocompleteChoices.length).toEqual(mockStudyPlanFormData.grades.length);
        expect(container.querySelector("input[name='trackSchoolProgress']")).toBeChecked();
    });
});
