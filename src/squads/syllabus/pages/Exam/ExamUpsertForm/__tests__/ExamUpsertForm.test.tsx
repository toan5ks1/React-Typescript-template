import { useForm } from "react-hook-form";

import { render, screen } from "@testing-library/react";
import ExamUpsertForm from "src/squads/syllabus/pages/Exam/ExamUpsertForm/ExamUpsertForm";
import { createMockExamLOFormData } from "src/squads/syllabus/pages/Exam/test-utils/examLO";
import { CreateLOFormData } from "src/squads/syllabus/pages/LO/common/type";
import TestHookFormProvider from "src/squads/syllabus/test-utils/TestHookFormProvider";

const mockCreateLOFormDataEmpty: CreateLOFormData = createMockExamLOFormData();

interface ExamUpsertFormWithFormProviderProps {
    defaultValues: CreateLOFormData;
}

const ExamUpsertFormWithFormProvider = ({ defaultValues }: ExamUpsertFormWithFormProviderProps) => {
    const methods = useForm<CreateLOFormData>({
        defaultValues,
    });

    return (
        <TestHookFormProvider methodsOverride={methods}>
            <ExamUpsertForm />
        </TestHookFormProvider>
    );
};

const renderExamUpsertForm = (defaultValues: CreateLOFormData = mockCreateLOFormDataEmpty) => {
    return render(<ExamUpsertFormWithFormProvider defaultValues={defaultValues} />);
};

describe(ExamUpsertForm.name, () => {
    it("should render correct UI", () => {
        renderExamUpsertForm();

        expect(screen.getByText("resources.exam_los.examInformation")).toBeInTheDocument();
        expect(screen.getByTestId("ExamUpsertForm__name")).toBeInTheDocument();
        expect(screen.getByTestId("ExamUpsertForm__instruction")).toBeInTheDocument();
        expect(screen.getByTestId("ExamUpsertForm__name")).toHaveAttribute("required");
    });

    it("should render correct default values", () => {
        const mockExamLOName = "Exam LO name";

        renderExamUpsertForm({ ...mockCreateLOFormDataEmpty, name: mockExamLOName });

        const examLONameInput = screen.getByTestId("ExamUpsertForm__name");

        expect(examLONameInput).toBeInTheDocument();
        expect(examLONameInput).toHaveValue(mockExamLOName);
    });
});
