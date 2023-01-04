import { Answer, Quiz } from "src/squads/syllabus/models/quiz";

import { removeAllLoadingImage } from "src/squads/syllabus/pages/Quiz/components/WYSWYG/wyswyg-utils";

export const removeAllLoadingImageFromHTML = () => {
    const loadingImages = document.querySelectorAll(`[data-testid="Editor__loading-image"]`);
    if (loadingImages && loadingImages.length > 0) {
        loadingImages.forEach((loadingImage) => {
            loadingImage.remove();
        });
    }
};

export const removeLoadingImageFromQuizPayload = (quiz: Quiz) => {
    const answerList = new Map();
    quiz.answer.list.forEach((answer) => {
        answerList.set(answer.id, {
            ...answer,
            content: removeAllLoadingImage(answer.content),
        });
    });
    removeAllLoadingImageFromHTML();
    return {
        ...quiz,
        answer: {
            ...quiz.answer,
            list: answerList,
        },
        question: {
            ...quiz.question,
            content: removeAllLoadingImage(quiz.question.content),
        },
        explanation: {
            ...quiz.explanation,
            content: removeAllLoadingImage(quiz.explanation.content),
        },
    };
};

// Check answer or alternative by index in array (return by getAllAnswerGroupsByGroupKey)
export const isMainAnswerFIB = (index: number) => {
    return index === 0;
};

// Push answer (with alternatives) in array by groupKey
// All these array will need to render UI of FIB question
export const getAllAnswerGroupsByGroupKey = (answers: Answer[]): Array<Answer[]> => {
    const quantity = answers.length;
    const map: Map<string, Answer[]> = new Map();

    for (let i = 0; i < quantity; i++) {
        const currentAnswer = answers[i];
        const { groupKey } = currentAnswer;

        if (groupKey) {
            const mapValues = map.get(groupKey);

            if (mapValues) {
                map.set(groupKey, [...mapValues, currentAnswer]);
                continue;
            }

            map.set(groupKey, [currentAnswer]);
        }
    }
    return Array.from(map.values());
};
