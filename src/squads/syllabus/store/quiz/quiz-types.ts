import { Quiz } from "../../models/quiz";
import { LOWithQuizSet } from "../../models/quizset-lo";

export interface QuizState {
    readonly quizzes: Quiz[];
    readonly lo: LOWithQuizSet | null;
    readonly currentQuizIndex: number;
    readonly quizOnReview: Quiz | null;
    readonly pdfUrl: string | null;
}
