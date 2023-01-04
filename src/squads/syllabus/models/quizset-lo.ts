import { LOHasura } from "./learning-objective";
import { QuizSetHasura } from "./quiz-set";

export interface LOWithQuizSet extends LOHasura {
    quiz_sets?: QuizSetHasura[];
}
