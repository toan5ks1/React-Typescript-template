import { KeyQuestionTypes } from "src/squads/communication/common/constants/const";

import { questionTypeChoice } from "../choice";

describe("questionTypeChoice", () => {
    it("should return correct choices", async () => {
        expect(questionTypeChoice).toEqual([
            {
                id: KeyQuestionTypes.QUESTION_TYPE_MULTIPLE_CHOICE,
                label: KeyQuestionTypes.QUESTION_TYPE_MULTIPLE_CHOICE,
                value: "resources.notifications.choices.questionType.QUESTION_TYPE_MULTIPLE_CHOICE",
            },
            {
                id: KeyQuestionTypes.QUESTION_TYPE_CHECK_BOX,
                label: KeyQuestionTypes.QUESTION_TYPE_CHECK_BOX,
                value: "resources.notifications.choices.questionType.QUESTION_TYPE_CHECK_BOX",
            },
            {
                id: KeyQuestionTypes.QUESTION_TYPE_FREE_TEXT,
                label: KeyQuestionTypes.QUESTION_TYPE_FREE_TEXT,
                value: "resources.notifications.choices.questionType.QUESTION_TYPE_FREE_TEXT",
            },
        ]);
    });
});
