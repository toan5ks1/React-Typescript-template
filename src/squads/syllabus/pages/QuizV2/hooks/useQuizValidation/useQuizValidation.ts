import { EditorState } from "draft-js";
import { HookFormControllerOptionProps } from "src/typings/react-hook-form";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import QuizV2 from "src/squads/syllabus/models/quizV2";

type ValidationRules = HookFormControllerOptionProps<QuizV2>["rules"];

type QuizValidationRules = Record<string, ValidationRules>;

const editorHasValue = (state: EditorState) => {
    const contentState = state.getCurrentContent();
    return contentState.hasText() && contentState.getPlainText().length > 0;
};

export default function useQuizValidation() {
    const t = useTranslate();

    const errorMessages = {
        required: t("resources.input.error.required"),
    };

    const rules: QuizValidationRules = {
        kind: {
            required: errorMessages.required,
        },
        externalId: {
            required: errorMessages.required,
        },
        "question.content": {
            validate: (state: EditorState) => {
                if (editorHasValue(state)) return true;
                return errorMessages.required;
            },
        },
        "answerField.content": {
            validate: (state: EditorState) => {
                if (editorHasValue(state)) return true;
                return errorMessages.required;
            },
        },
    };

    return rules;
}
