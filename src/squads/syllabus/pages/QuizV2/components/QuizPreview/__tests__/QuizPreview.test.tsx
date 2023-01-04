import { MathJaxLoadStatus } from "src/common/constants/enum";
import { LabelTypes } from "src/common/utils/label-generator";
import appConfigs from "src/internals/configuration";
import { Rules } from "src/internals/permission/rules";
import { createEditorStateFromText } from "src/squads/syllabus/common/utils/draft-js";
import { QuizType } from "src/squads/syllabus/models/quiz";
import { inferQuery } from "src/squads/syllabus/services/infer-query";
import { PjOwner } from "src/squads/syllabus/typings/configuration";

import { PermissionContext } from "src/providers/PermissonProvider";
import QuizPreview, {
    QuizPreviewProps,
} from "src/squads/syllabus/pages/QuizV2/components/QuizPreview";
import useInstallMathJax from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/useInstallMathJax";

import { Ability, AbilityBuilder, AbilityType } from "@manabie-com/role-based-permission";
import { fireEvent, render, screen } from "@testing-library/react";
import { AnswerFieldV2, ExplanationField, QuestionField } from "src/squads/syllabus/models/quizV2";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";
import {
    createCustomTestAnswers,
    createCustomTestQuiz,
} from "src/squads/syllabus/test-utils/quizV2";

const difficultyLevel: number = 5;
const externalId: string = "123abc";
const answers: string[] = ["answer 1", "answer 2", "answer 3", "answer 4"];

jest.mock("src/internals/configuration");
jest.mock("src/internals/permission");

(appConfigs.getCurrentPjOwner as jest.Mock).mockReturnValue(PjOwner.MANABIE);

jest.mock("src/squads/syllabus/services/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

jest.mock("src/squads/syllabus/pages/QuizV2/components/WYSWYG/useInstallMathJax", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const loList = [{ name: "lo 1" }, { name: "lo 2" }];
const props: QuizPreviewProps = {
    open: true,
    title: "Quiz title",
    onClose: jest.fn(),
    quiz: createCustomTestQuiz({ kind: QuizType.QUIZ_TYPE_MCQ, difficultyLevel, externalId }),
};
const closeButtonLabel: string = "close preview";
const editLabel: string = "Edit question";
const deleteLabel: string = "Delete question";
const explanationText: string = "Explanation text";
const questionText: string = "Question text";
const correctLabel: string = "Correct";

const mockInferQuery = (isLoading: boolean = false) => {
    (inferQuery as jest.Mock).mockReturnValue(jest.fn(() => ({ isLoading, data: loList })));
};

const mockUseInstallMathJax = (loadStatus: MathJaxLoadStatus) => {
    (useInstallMathJax as jest.Mock).mockImplementation(() => ({
        loadStatus,
    }));
};

const mockPermission = (isManabie: boolean = true): Ability<AbilityType<Rules>> | never => {
    const ability: Ability<AbilityType<Rules>> = new Ability();
    const { can, cannot, rules } = new AbilityBuilder();

    if (isManabie) {
        can("show.difficulty", "quizzes");
        can("show.tag_lo", "quizzes");
        cannot("show.external_id", "quizzes");
    } else {
        can("show.difficulty", "quizzes");
        can("show.tag_lo", "quizzes");
        can("show.external_id", "quizzes");
    }

    ability.update(rules as any);

    return ability;
};

const renderUtil = (
    props: QuizPreviewProps,
    ability: Ability<AbilityType<Rules>> = mockPermission()
) =>
    render(
        <PermissionContext.Provider value={ability}>
            <QuizPreview {...props} />
        </PermissionContext.Provider>,
        { wrapper: TestAppWithQueryClient }
    );

describe(QuizPreview.name, () => {
    beforeEach(() => {
        mockInferQuery();
        mockUseInstallMathJax(MathJaxLoadStatus.LOADED);
    });

    it("should render nothing while waiting for LO data", () => {
        mockInferQuery(true);
        const { container } = renderUtil(props);

        expect(container).toBeEmptyDOMElement();
    });

    it("should render preview panel", () => {
        renderUtil(props);

        expect(screen.getByRole("heading", { name: props.title })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: closeButtonLabel })).toBeInTheDocument();
    });

    it("should trigger onClose handler once clicked on close button", () => {
        const onClose = jest.fn();

        renderUtil({ ...props, onClose });
        fireEvent.click(screen.getByRole("button", { name: closeButtonLabel }));

        expect(onClose).toBeCalled();
    });

    it("should render question info section with question type, difficulty level, tagged LO and external id", () => {
        renderUtil(props, mockPermission(false));

        expect(screen.getByTestId("QuizPreview__externalId")).toBeInTheDocument();
        expect(screen.getByText(externalId)).toBeInTheDocument();
        expect(screen.getByTestId("QuizPreview__kind")).toBeInTheDocument();
        expect(screen.getByText("Multiple choice")).toBeInTheDocument();
        expect(screen.queryByTestId("QuizPreview__difficultyLevel")).toBeInTheDocument();
        expect(screen.getByText(difficultyLevel)).toBeInTheDocument();
        expect(screen.queryByTestId("QuizPreview__taggedLO")).toBeInTheDocument();
        expect(screen.getByText(loList.map((lo) => lo.name).join(", "))).toBeInTheDocument();
    });

    it("should render question info section without external id", () => {
        renderUtil(props);

        expect(screen.queryByTestId("QuizPreview__externalId")).not.toBeInTheDocument();
        expect(screen.queryByText(externalId)).not.toBeInTheDocument();
        expect(screen.getByTestId("QuizPreview__kind")).toBeInTheDocument();
        expect(screen.getByText("Multiple choice")).toBeInTheDocument();
        expect(screen.queryByTestId("QuizPreview__difficultyLevel")).toBeInTheDocument();
        expect(screen.getByText(difficultyLevel)).toBeInTheDocument();
        expect(screen.queryByTestId("QuizPreview__taggedLO")).toBeInTheDocument();
        expect(screen.getByText(loList.map((lo) => lo.name).join(", "))).toBeInTheDocument();
    });

    it("should render action buttons section", () => {
        renderUtil({ ...props, onEdit: jest.fn(), onDelete: jest.fn() });

        expect(screen.getByRole("button", { name: editLabel })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: deleteLabel })).toBeInTheDocument();
    });

    it("should trigger onEdit handler once clicked on edit button", () => {
        const onEdit = jest.fn();

        renderUtil({ ...props, onEdit });
        fireEvent.click(screen.getByRole("button", { name: editLabel }));

        expect(onEdit).toBeCalled();
    });

    it("should trigger onDelete handler once clicked on delete button", () => {
        const onDelete = jest.fn();

        renderUtil({ ...props, onDelete });
        fireEvent.click(screen.getByRole("button", { name: deleteLabel })).valueOf;

        expect(onDelete).toBeCalled();
    });

    it("should render explanation section with correct content", () => {
        const explanation: ExplanationField = {
            content: createEditorStateFromText(explanationText),
            rects: [],
        };

        renderUtil({
            ...props,
            quiz: createCustomTestQuiz({ kind: QuizType.QUIZ_TYPE_MCQ, explanation }),
        });

        expect(screen.getByTestId("QuizPreview__explanation")).toBeInTheDocument();
        expect(screen.getByText(explanationText)).toBeInTheDocument();
    });

    it("should render question description section with question content", () => {
        const question: QuestionField = {
            content: createEditorStateFromText(questionText),
            rects: [],
        };

        renderUtil({
            ...props,
            quiz: createCustomTestQuiz({ kind: QuizType.QUIZ_TYPE_MCQ, question }),
        });

        expect(screen.getByTestId("QuizPreview__description")).toBeInTheDocument();
        expect(screen.getByText(questionText)).toBeInTheDocument();
    });

    it("should render correct answer list if the question is multiple choice", () => {
        const answer: AnswerFieldV2 = {
            configs: [],
            labelType: null,
            list: createCustomTestAnswers(QuizType.QUIZ_TYPE_MCQ, answers),
        };

        renderUtil({
            ...props,
            quiz: createCustomTestQuiz({ kind: QuizType.QUIZ_TYPE_MCQ, answer }),
        });

        answers.forEach((value) => expect(screen.getByText(value)).toBeInTheDocument());
        expect(screen.getByText(correctLabel)).toBeInTheDocument();
    });

    it("should render correct answer list if the question is multiple answer", () => {
        const answer: AnswerFieldV2 = {
            configs: [],
            labelType: null,
            list: createCustomTestAnswers(QuizType.QUIZ_TYPE_MAQ, answers),
        };

        renderUtil({
            ...props,
            quiz: createCustomTestQuiz({ kind: QuizType.QUIZ_TYPE_MAQ, answer }),
        });

        answers.forEach((value) => expect(screen.getByText(value)).toBeInTheDocument());
        expect(screen.getAllByText(correctLabel)).toHaveLength(3);
    });

    it("should render correct answer list if the question is fill in the blank", () => {
        const answer: AnswerFieldV2 = {
            configs: [0],
            labelType: LabelTypes.NUMBER,
            list: createCustomTestAnswers(QuizType.QUIZ_TYPE_FIB, answers),
        };

        renderUtil({
            ...props,
            quiz: createCustomTestQuiz({ kind: QuizType.QUIZ_TYPE_FIB, difficultyLevel, answer }),
        });

        answers.forEach((value, idx) => {
            expect(screen.getByText(value)).toBeInTheDocument();
            expect(screen.getByText(String(idx + 1))).toBeInTheDocument();
        });
        expect(screen.queryByText(correctLabel)).not.toBeInTheDocument();
    });

    it("should not render answer list if the question is manual input", () => {
        renderUtil({ ...props, quiz: createCustomTestQuiz({ kind: QuizType.QUIZ_TYPE_MIQ }) });

        answers.forEach((value) => expect(screen.queryByText(value)).not.toBeInTheDocument());
        expect(screen.queryByText(correctLabel)).not.toBeInTheDocument();
    });
});
