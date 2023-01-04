import { useForm } from "react-hook-form";
import { ProviderTypes } from "src/common/constants/enum";

import { render, screen } from "@testing-library/react";
import ExamUpsertDialog, {
    ExamUpsertDialogProps,
} from "src/squads/syllabus/pages/Exam/ExamUpsertDialog/ExamUpsertDialog";
import { createMockExamLOFormData } from "src/squads/syllabus/pages/Exam/test-utils/examLO";
import { CreateLOFormData } from "src/squads/syllabus/pages/LO/common/type";
import TestApp from "src/squads/syllabus/test-utils/TestApp";
import TestHookFormProvider from "src/squads/syllabus/test-utils/TestHookFormProvider";

interface ExamUpsertDialogWithFormProviderProps {
    examUpsertDialogProps: ExamUpsertDialogProps;
}

const mockCreateLOFormDataEmpty: CreateLOFormData = createMockExamLOFormData();

const ExamUpsertDialogWithFormProvider = ({
    examUpsertDialogProps,
}: ExamUpsertDialogWithFormProviderProps) => {
    const methods = useForm();

    return (
        <TestApp>
            <TestHookFormProvider methodsOverride={methods}>
                <ExamUpsertDialog {...examUpsertDialogProps} />
            </TestHookFormProvider>
        </TestApp>
    );
};

const defaultExamUpsertDialogProps: ExamUpsertDialogProps = {
    title: "Edit exam",
    action: ProviderTypes.CREATE,
    topicId: "topicId",
    defaultValues: mockCreateLOFormDataEmpty,
    onClose: jest.fn(),
};

const renderExamUpsertDialog = (props = defaultExamUpsertDialogProps) => {
    return render(<ExamUpsertDialogWithFormProvider examUpsertDialogProps={props} />);
};

describe("<ExamUpsertDialog/>", () => {
    it("should render correct UI", () => {
        renderExamUpsertDialog();
        expect(screen.getByTestId("ExamUpsertDialog__dialog")).toBeInTheDocument();
        expect(screen.getByTestId("ExamUpsertForm__form")).toBeInTheDocument();
        expect(screen.getByTestId("DialogFullScreen__dialogTitle")).toHaveTextContent(
            defaultExamUpsertDialogProps.title
        );
    });

    it("should render correct default values", () => {
        const mockExamName = "Exam LO Name";

        renderExamUpsertDialog({
            ...defaultExamUpsertDialogProps,
            defaultValues: {
                ...mockCreateLOFormDataEmpty,
                name: mockExamName,
            },
        });
        expect(screen.getByTestId("ExamUpsertDialog__dialog")).toBeInTheDocument();

        const examNameInput = screen.getByTestId("ExamUpsertForm__name");
        expect(examNameInput).toHaveValue(mockExamName);
    });
});
