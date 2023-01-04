import { KeyMediaTypes } from "src/squads/syllabus/common/constants/const";
import { SettingAssignment } from "src/squads/syllabus/models/assignment";

import CommonTranslationProvider from "src/providers/TranslationProvider";

import { AssignmentFormValues } from "../../../common/types";
import AssignmentForm from "../AssignmentForm";

import { render } from "@testing-library/react";
import { Media } from "src/squads/syllabus/__generated__/bob/root-types";
import { withReactHookForm } from "src/squads/syllabus/test-utils/HOCs";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

const defaultValues: AssignmentFormValues = {
    assignment_id: "",
    files: [
        { media_id: "media_id", name: "media.pdf", type: KeyMediaTypes.MEDIA_TYPE_PDF } as Media,
    ],
    name: "Assignment",
    is_required_grade: true,
    max_grade: 10,
    settings: {
        ...Object.values(SettingAssignment).reduce(
            (previous, current) => ({ ...previous, [current]: false }),
            {}
        ),
        allow_resubmission: true,
    },
};

describe(AssignmentForm.name, () => {
    it("should match snapshot", () => {
        const AssignmentFormWithProvider = withReactHookForm(AssignmentForm, {}, { defaultValues });
        const { container } = render(
            <TestAppWithQueryClient>
                <CommonTranslationProvider>
                    <AssignmentFormWithProvider />
                </CommonTranslationProvider>
            </TestAppWithQueryClient>
        );

        expect(container).toMatchSnapshot();
    });

    it("should render max grade input correctly based on condition", () => {
        let AssignmentFormWithProvider = withReactHookForm(AssignmentForm, {}, { defaultValues });
        let wrapper = render(
            <TestAppWithQueryClient>
                <CommonTranslationProvider>
                    <AssignmentFormWithProvider />
                </CommonTranslationProvider>
            </TestAppWithQueryClient>
        );

        expect(wrapper.container.querySelector("input[name='max_grade']")).toBeInTheDocument();
        wrapper.unmount();

        AssignmentFormWithProvider = withReactHookForm(
            AssignmentForm,
            {},
            { defaultValues: { ...defaultValues, is_required_grade: false } }
        );
        wrapper = render(
            <TestAppWithQueryClient>
                <CommonTranslationProvider>
                    <AssignmentFormWithProvider />
                </CommonTranslationProvider>
            </TestAppWithQueryClient>
        );

        expect(wrapper.container.querySelector("input[name='max_grade']")).toBeNull();
    });

    it("should render with correct values", () => {
        const AssignmentFormWithProvider = withReactHookForm(AssignmentForm, {}, { defaultValues });
        const { container } = render(
            <TestAppWithQueryClient>
                <CommonTranslationProvider>
                    <AssignmentFormWithProvider />
                </CommonTranslationProvider>
            </TestAppWithQueryClient>
        );

        expect(container.querySelector("input[name='name']")).toHaveValue(defaultValues.name);
        expect(container.querySelector("input[name='is_required_grade']")).toHaveValue(
            defaultValues.is_required_grade!.toString()
        );
        expect(container.querySelector("input[name='max_grade']")).toHaveValue(
            defaultValues.max_grade
        );
        expect(container.querySelector("input[name='settings.allow_resubmission']")).toBeChecked();
        expect(container.querySelector(".MuiChip-label")).toHaveTextContent(
            defaultValues.files[0].name!
        );
    });
});
