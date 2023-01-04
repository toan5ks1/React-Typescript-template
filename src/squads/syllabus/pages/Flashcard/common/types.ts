import { Quiz, QuizItemAttributeConfig } from "src/squads/syllabus/models/quiz";

export interface Flashcard extends Omit<Quiz, "question" | "answer" | "explanation" | "attribute"> {
    term: string;
    definition: string;
    termLanguage?: QuizItemAttributeConfig;
    definitionLanguage?: QuizItemAttributeConfig;
    draft?: boolean;
    image?: string;
    termAudio?: string;
    definitionAudio?: string;
}
