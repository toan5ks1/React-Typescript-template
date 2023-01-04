import { useForm } from "react-hook-form";
import { ProviderTypes } from "src/common/constants/enum";
import { TestQueryWrapper } from "src/squads/syllabus/test-utils/react-hooks";
import { changeTextInput, checkErrorMessage } from "src/squads/syllabus/test-utils/utils";

import { AssignmentFormValues } from "../../../common/types";
import AssignmentUpsert, { AssignmentUpsertProps } from "../AssignmentUpsert";

import { fireEvent, render, RenderResult, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useUpsertAssignment, {
    UseUpsertAssignmentReturn,
} from "src/squads/syllabus/pages/Book/hooks/useUpsertAssignment";
import TestApp from "src/squads/syllabus/test-utils/TestApp";
import TestHookFormProvider from "src/squads/syllabus/test-utils/TestHookFormProvider";

const mockMutateFn = jest.fn();

jest.mock("src/squads/syllabus/pages/Book/hooks/useUpsertAssignment", () => jest.fn());

jest.mock("src/squads/syllabus/hooks/useTranslate", () => {
    return () => (translateKey: string) => translateKey;
});

const defaultValues: AssignmentFormValues = {
    assignment_id: "",
    content: {
        loIdList: undefined,
        topicId: "topic1",
    },
    display_order: 0,
    files: [],
    is_required_grade: true,
    max_grade: undefined,
    name: "",
    settings: {
        require_assignment_note: false,
        require_attachment: false,
        require_video_submission: false,
        allow_late_submission: false,
        allow_resubmission: false,
    },
    instruction: "",
    attachment: [],
};

const props: AssignmentUpsertProps = {
    onClose: jest.fn(),
    action: ProviderTypes.CREATE,
    assignment: defaultValues,
    title: "Assignment",
    searchUrl: "/",
};

const ComposeFormWithHookFormProvider = ({ ...props }: AssignmentUpsertProps) => {
    const methods = useForm();
    return (
        <TestApp>
            <TestQueryWrapper>
                <TestHookFormProvider methodsOverride={methods}>
                    <AssignmentUpsert {...props} />
                </TestHookFormProvider>
            </TestQueryWrapper>
        </TestApp>
    );
};

const renderAssignmentUpsert = (
    props: AssignmentUpsertProps,
    isLoading: boolean = false
): RenderResult => {
    (useUpsertAssignment as jest.Mock).mockImplementation(
        (): UseUpsertAssignmentReturn => ({
            isLoading,
            upsertAssignment: mockMutateFn,
        })
    );

    const wrapper: RenderResult = render(<ComposeFormWithHookFormProvider {...props} />);
    return wrapper;
};

describe(AssignmentUpsert.name, () => {
    it("should match snapshot", () => {
        renderAssignmentUpsert(props);

        expect(screen.queryByTestId("DialogFullScreen__dialog")).toMatchSnapshot();
    });

    it("should validate required fields", async () => {
        const updatedProps: AssignmentUpsertProps = {
            ...props,
            assignment: {
                ...props.assignment,
                name: "",
                max_grade: undefined,
            },
        };

        renderAssignmentUpsert(updatedProps);

        const saveBtn = screen.getByRole("button", { name: /save/i });
        userEvent.click(saveBtn);

        const textInputs = ["name", "maxGrade"];
        for (const text of textInputs) {
            await waitFor(() => {
                expect(
                    screen.getAllByText(`resources.assignments.${text}`)[0] as HTMLInputElement
                ).toHaveClass("Mui-error");
            });
        }

        // Use checkErrorMessage
        await checkErrorMessage(2, "resources.input.error.required");
    });

    it("should close dialog when clicking close icon or cancel button", () => {
        renderAssignmentUpsert(props);

        const closeButton = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(closeButton);
        expect(props.onClose).toBeCalled();

        const dialogCloseButton = screen.getByTestId("DialogFullScreen__buttonClose");
        userEvent.click(dialogCloseButton);
        expect(props.onClose).toBeCalled();
    });

    it("should render correct UI", () => {
        renderAssignmentUpsert(props);

        const controlTestIds = [
            "UploadInput__inputFile",
            "UploadInput__description",
            "UploadInput",
            "FormUploadBrightCove__button",
            "FormUploadBrightCove__input",
            "AssignmentForm__instruction",
            "AssignmentForm__name",
            "AssignmentForm__maxGrade",
            "AssignmentForm__gradingMethod",
        ];
        for (const testId of controlTestIds) {
            expect(screen.getByTestId(testId)).toBeInTheDocument();
        }
    });

    it("should call CREATE upsert mutation when inputs are valid", async () => {
        renderAssignmentUpsert(props);

        // use changeTextInput
        changeTextInput("AssignmentForm__name", "name");

        changeTextInput("AssignmentForm__maxGrade", "100");

        const saveBtn = screen.getByRole("button", { name: /save/i });
        fireEvent.click(saveBtn);

        // wait for progress bar to disappear
        await waitFor(() => {
            expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
        });

        expect(mockMutateFn).toHaveBeenCalledWith(
            {
                ...defaultValues,
                name: "name",
                max_grade: "100",
            },
            {}
        );
    });

    it("should call UPDATE upsert mutation when inputs are valid", async () => {
        const updateProps: AssignmentUpsertProps = {
            ...props,
            action: ProviderTypes.UPDATE,
            assignment: {
                ...props.assignment,
                assignment_id: "assignmentId",
                name: "name",
                max_grade: 100,
            },
        };

        renderAssignmentUpsert(updateProps);

        // Check if name is already there.
        const nameInput = screen.getByTestId("AssignmentForm__name");
        expect(nameInput).toBeInTheDocument();

        userEvent.type(nameInput, "-edited");

        const saveBtn = screen.getByRole("button", { name: /save/i });
        fireEvent.click(saveBtn);

        // wait for progress bar to disappear
        await waitFor(() => {
            expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
        });

        expect(mockMutateFn).toHaveBeenCalledWith(
            {
                ...defaultValues,
                assignment_id: "assignmentId",
                name: "name-edited",
                max_grade: 100,
            },
            {}
        );
    });

    it("should show progressBar when isLoading true", () => {
        renderAssignmentUpsert(props, true);

        expect(screen.queryByRole("progressbar")).toBeInTheDocument();
    });
});
