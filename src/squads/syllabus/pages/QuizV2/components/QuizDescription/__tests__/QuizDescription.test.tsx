import { FC } from "react";

import { get } from "lodash";
import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import { createEmptyQuiz, QuizType } from "src/squads/syllabus/models/quiz";

import TestQuizProvider from "../../../test-utils/TestQuizProvider";
import QuizDescription from "../QuizDescription";

import { render, screen } from "@testing-library/react";
import Can from "src/contexts/Can";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";
import TestHookForm from "src/squads/syllabus/test-utils/TestHookForm";
import { createTestLO } from "src/squads/syllabus/test-utils/quizV2";

jest.mock("src/contexts/Can");
jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: () => () => ({}),
    };
});

type RenderProps = {
    mode?: "create" | "edit";
};

const renderComponent = (props: RenderProps = {}) => {
    const lo = createTestLO();
    return render(
        <TestAppWithQueryClient>
            <TestQuizProvider mode={props.mode} lo={lo}>
                <TestHookForm
                    defaultValues={createEmptyQuiz({
                        loId: lo.lo_id,
                        schoolId: lo.school_id,
                        isLo: lo.type === KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING,
                        kind:
                            lo.type === KeyLOTypes.LEARNING_OBJECTIVE_TYPE_EXAM_LO
                                ? QuizType.QUIZ_TYPE_MCQ
                                : undefined,
                    })}
                >
                    <QuizDescription />
                </TestHookForm>
            </TestQuizProvider>
        </TestAppWithQueryClient>
    );
};

type MockAbility = Record<string, boolean>;

type MockAbilities = Record<string, MockAbility | Record<string, MockAbility>>;

const mockCanComponent = (abilities: MockAbilities) => {
    const MockComponent: FC<{
        I: string;
        a: string;
    }> = ({ children, ...props }) => {
        const entity = get(abilities, props.a);
        const canI = get(entity, props.I);
        if (!canI) return <></>;
        return <>{children}</>;
    };
    (Can as jest.Mock).mockImplementation(MockComponent);
};

describe(QuizDescription.name, () => {
    beforeEach(() => {
        mockCanComponent({});
    });
    it("should render QuizTypeSelect", () => {
        renderComponent();
        expect(screen.getByTestId("QuizTypeSelect__root")).toBeInTheDocument();
    });

    it("should show taggedLOs, difficulty not mapped id on manabie", () => {
        const abilities: MockAbilities = {
            quizzes: {
                show: {
                    tag_lo: true,
                    difficulty: true,
                    external_id: false,
                },
            },
        };
        mockCanComponent(abilities);

        renderComponent({ mode: "create" });

        expect(screen.getByTestId("QuizDescription__lo")).toBeInTheDocument();
        expect(screen.getByTestId("QuizDescription__difficulty")).toBeInTheDocument();
        expect(screen.queryByTestId("QuizDescription__externalId")).not.toBeInTheDocument();
    });

    it("should show mapped id and hide taggedLOs, difficulty on jprep", () => {
        const abilities: MockAbilities = {
            quizzes: {
                show: {
                    tag_lo: false,
                    difficulty: false,
                    external_id: true,
                },
            },
        };

        mockCanComponent(abilities);

        renderComponent({ mode: "create" });

        expect(screen.queryByTestId("QuizDescription__lo")).not.toBeInTheDocument();
        expect(screen.queryByTestId("QuizDescription__difficulty")).not.toBeInTheDocument();
        expect(screen.getByTestId("QuizDescription__externalId")).toBeInTheDocument();
    });

    it("should disable editing mapped id on edit on jprep", () => {
        const abilities: MockAbilities = {
            quizzes: {
                show: {
                    tag_lo: false,
                    difficulty: false,
                    external_id: true,
                },
            },
        };

        mockCanComponent(abilities);

        renderComponent({ mode: "edit" });

        const mappedIdInput = screen
            .getByTestId("QuizDescription__externalId")
            .querySelector("input");

        expect(mappedIdInput).toBeDisabled();
    });
});
