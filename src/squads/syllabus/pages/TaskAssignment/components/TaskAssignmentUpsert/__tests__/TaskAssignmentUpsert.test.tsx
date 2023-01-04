import { useForm } from "react-hook-form";
import { ProviderTypes } from "src/common/constants/enum";
import { changeTextInput, checkErrorMessage } from "src/squads/syllabus/test-utils/utils";

import { TaskAssignmentFormValues } from "../../../common/types";
import TaskAssignmentUpsert, { TaskAssignmentUpsertProps } from "../TaskAssignmentUpsert";

import { fireEvent, render, RenderResult, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useUpsertTaskAssignment, {
    UseUpsertTaskAssignmentReturn,
} from "src/squads/syllabus/pages/TaskAssignment/hooks/useUpsertTaskAssignment";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";
import TestHookFormProvider from "src/squads/syllabus/test-utils/TestHookFormProvider";

const mockMutateFn = jest.fn();

jest.mock("src/squads/syllabus/pages/TaskAssignment/hooks/useUpsertTaskAssignment", () =>
    jest.fn()
);

jest.mock("src/squads/syllabus/hooks/useTranslate", () => {
    return () => (translateKey: string) => translateKey;
});

const defaultValues: TaskAssignmentFormValues = {
    assignment_id: "",
    content: {
        loIdList: undefined,
        topicId: "topic1",
    },
    display_order: 0,
    files: [],
    name: "",
    settings: {
        require_assignment_note: false,
        require_attachment: false,
        require_duration: false,
        require_correctness: false,
        require_understanding_level: false,
    },
    instruction: "",
    attachment: [],
};

const props: TaskAssignmentUpsertProps = {
    onClose: jest.fn(),
    action: ProviderTypes.CREATE,
    defaultValues: defaultValues,
    title: "Task Assignment",
    searchUrl: "/",
};

const ComposeFormWithHookFormProvider = ({ ...props }: TaskAssignmentUpsertProps) => {
    const methods = useForm();
    return (
        <TestAppWithQueryClient>
            <TestHookFormProvider methodsOverride={methods}>
                <TaskAssignmentUpsert {...props} />
            </TestHookFormProvider>
        </TestAppWithQueryClient>
    );
};

const renderUtil = (props: TaskAssignmentUpsertProps): RenderResult => {
    const wrapper: RenderResult = render(<ComposeFormWithHookFormProvider {...props} />);
    return wrapper;
};

describe(TaskAssignmentUpsert.name, () => {
    beforeEach(() => {
        (useUpsertTaskAssignment as jest.Mock).mockImplementation(
            (): UseUpsertTaskAssignmentReturn => ({
                isLoading: false,
                upsertTaskAssignment: mockMutateFn,
            })
        );
    });

    it("should match snapshot", () => {
        renderUtil(props);

        expect(screen.queryByTestId("DialogFullScreen__dialog")).toMatchSnapshot();
    });

    it("should validate required fields", async () => {
        const updatedProps: TaskAssignmentUpsertProps = {
            ...props,
            defaultValues: {
                ...props.defaultValues,
                name: "",
            },
        };

        renderUtil(updatedProps);

        const saveBtn = screen.getByRole("button", { name: /save/i });
        userEvent.click(saveBtn);

        await waitFor(() => {
            expect(screen.getByTestId("TaskAssignmentForm__name")).toHaveAttribute(
                "aria-invalid",
                "true"
            );
        });

        // Use checkErrorMessage
        await checkErrorMessage(1, "resources.input.error.required");
    });

    it("should close dialog when clicking close icon or cancel button", () => {
        renderUtil(props);

        const closeButton = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(closeButton);
        expect(props.onClose).toBeCalled();

        const dialogCloseButton = screen.getByTestId("DialogFullScreen__buttonClose");
        userEvent.click(dialogCloseButton);
        expect(props.onClose).toBeCalled();
    });

    it("should call CREATE upsert mutation when inputs are valid", async () => {
        renderUtil(props);

        // use changeTextInput
        changeTextInput("TaskAssignmentForm__name", "name");

        const saveBtn = screen.getByRole("button", { name: /save/i });
        fireEvent.click(saveBtn);

        await waitFor(() => {
            expect(mockMutateFn).toHaveBeenCalledWith(
                {
                    ...defaultValues,
                    name: "name",
                },
                {}
            );
        });
    });

    it("should call UPDATE upsert mutation when inputs are valid", async () => {
        const updateProps: TaskAssignmentUpsertProps = {
            ...props,
            action: ProviderTypes.UPDATE,
            defaultValues: {
                ...props.defaultValues,
                assignment_id: "assignmentId",
                name: "name",
            },
        };

        renderUtil(updateProps);

        // Check if name is already there.
        const nameInput = screen.getByTestId("TaskAssignmentForm__name");
        expect(nameInput).toBeInTheDocument();

        userEvent.type(nameInput, "-edited");

        const saveBtn = screen.getByRole("button", { name: /save/i });
        fireEvent.click(saveBtn);

        await waitFor(() => {
            expect(mockMutateFn).toHaveBeenCalledWith(
                {
                    ...defaultValues,
                    assignment_id: "assignmentId",
                    name: "name-edited",
                },
                {}
            );
        });
    });
});
