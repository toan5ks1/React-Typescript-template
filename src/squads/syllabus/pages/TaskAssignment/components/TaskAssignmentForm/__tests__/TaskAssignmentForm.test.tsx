import { KeyMediaTypes } from "src/squads/syllabus/common/constants/const";
import { SettingTaskAssignment } from "src/squads/syllabus/models/assignment";

import CommonTranslationProvider from "src/providers/TranslationProvider";

import { TaskAssignmentFormValues } from "../../../common/types";
import TaskAssignmentForm from "../TaskAssignmentForm";

import { render, RenderResult } from "@testing-library/react";
import { Media } from "src/squads/syllabus/__generated__/bob/root-types";
import { withReactHookForm } from "src/squads/syllabus/test-utils/HOCs";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

const defaultValues: TaskAssignmentFormValues = {
    assignment_id: "",
    files: [
        { media_id: "media_id", name: "media.pdf", type: KeyMediaTypes.MEDIA_TYPE_PDF } as Media,
    ],
    name: "Task Assignment",
    settings: {
        ...Object.values(SettingTaskAssignment).reduce(
            (previous, current) => ({ ...previous, [current]: false }),
            {}
        ),
        require_assignment_note: true,
    },
};

const renderTaskAssignmentForm = (): RenderResult => {
    const TaskAssignmentFormWithProvider = withReactHookForm(
        TaskAssignmentForm,
        {},
        { defaultValues }
    );
    const wrapper: RenderResult = render(
        <TestAppWithQueryClient>
            <CommonTranslationProvider>
                <TaskAssignmentFormWithProvider />
            </CommonTranslationProvider>
        </TestAppWithQueryClient>
    );
    return wrapper;
};

describe(TaskAssignmentForm.name, () => {
    it("should match snapshot", () => {
        const { container } = renderTaskAssignmentForm();

        expect(container).toMatchSnapshot();
    });

    it("should render with correct values", () => {
        const { container } = renderTaskAssignmentForm();

        expect(container.querySelector("input[name='name']")).toHaveValue(defaultValues.name);
        expect(
            container.querySelector("input[name='settings.require_assignment_note']")
        ).toBeChecked();
        expect(container.querySelector(".MuiChip-label")).toHaveTextContent(
            defaultValues.files[0].name!
        );
    });
});
