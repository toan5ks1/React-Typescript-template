import { KeyLiveLessonStatus } from "src/common/constants/const";
import { ERPModules } from "src/common/constants/enum";

import { convertToChoices } from "../choice";

describe(convertToChoices.name, () => {
    it("should return correct choices", async () => {
        expect(
            convertToChoices(KeyLiveLessonStatus, "lessonStatus", ERPModules.LIVE_LESSONS)
        ).toEqual([
            {
                id: "LESSON_STATUS_NONE",
                label: "LESSON_STATUS_NONE",
                value: "resources.live_lessons.choices.lessonStatus.LESSON_STATUS_NONE",
            },
            {
                id: "LESSON_STATUS_COMPLETED",
                label: "LESSON_STATUS_COMPLETED",
                value: "resources.live_lessons.choices.lessonStatus.LESSON_STATUS_COMPLETED",
            },
            {
                id: "LESSON_STATUS_IN_PROGRESS",
                label: "LESSON_STATUS_IN_PROGRESS",
                value: "resources.live_lessons.choices.lessonStatus.LESSON_STATUS_IN_PROGRESS",
            },
            {
                id: "LESSON_STATUS_NOT_STARTED",
                label: "LESSON_STATUS_NOT_STARTED",
                value: "resources.live_lessons.choices.lessonStatus.LESSON_STATUS_NOT_STARTED",
            },
            {
                id: "LESSON_STATUS_DRAFT",
                label: "LESSON_STATUS_DRAFT",
                value: "resources.live_lessons.choices.lessonStatus.LESSON_STATUS_DRAFT",
            },
        ]);
    });
});
