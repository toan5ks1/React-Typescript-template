import { FC } from "react";

import { QuizContext, QuizContextValue } from "../contexts/QuizContext";

import { createTestLO } from "src/squads/syllabus/test-utils/quizV2";

export interface TestQuizProviderProps {
    mode?: QuizContextValue["mode"];
    lo?: QuizContextValue["lo"];
}

const TestQuizProvider: FC<TestQuizProviderProps> = ({
    mode = "create",
    lo = createTestLO(),
    children,
}) => {
    return <QuizContext.Provider value={{ lo: lo, mode }}>{children}</QuizContext.Provider>;
};

export default TestQuizProvider;
