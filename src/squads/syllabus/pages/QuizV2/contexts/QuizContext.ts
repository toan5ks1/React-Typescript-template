import { createContext, useContext } from "react";

import { LOWithQuizSet } from "src/squads/syllabus/models/quizset-lo";

export type QuizContextValue = {
    mode: "create" | "edit";
    lo: LOWithQuizSet;
};

const QuizContext = createContext<QuizContextValue>({
    mode: "create",
    lo: {} as any,
});

QuizContext.displayName = "QuizContext";

const useQuizContext = () => useContext(QuizContext);

export { QuizContext, useQuizContext };
