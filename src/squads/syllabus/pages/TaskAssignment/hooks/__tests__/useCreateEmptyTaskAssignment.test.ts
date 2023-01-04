import { SettingTaskAssignment } from "src/squads/syllabus/models/assignment";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useCreateEmptyTaskAssignment, {
    UseCreateEmptyTaskAssignmentValues,
} from "src/squads/syllabus/pages/TaskAssignment/hooks/useCreateEmptyTaskAssignment";

describe(useCreateEmptyTaskAssignment.name, () => {
    let createEmptyTaskAssignmentHook: RenderHookResult<
        null,
        UseCreateEmptyTaskAssignmentValues["createEmptyTaskAssignment"]
    >;
    beforeEach(() => {
        createEmptyTaskAssignmentHook = renderHook(() => useCreateEmptyTaskAssignment());
    });

    it("should create task assignment with topic id, display order and settings correct", () => {
        const createEmptyTaskAssignment = createEmptyTaskAssignmentHook.result.current;
        const emptyFlashcard = createEmptyTaskAssignment("topic");

        expect(emptyFlashcard.content.topic_id).toBe("topic");
        expect(emptyFlashcard.display_order).toEqual(0);
        expect(
            emptyFlashcard.settings[SettingTaskAssignment.requireAttachmentSubmission]
        ).toBeFalsy();
        expect(emptyFlashcard.settings[SettingTaskAssignment.requireCorrectness]).toBeTruthy();
        expect(emptyFlashcard.settings[SettingTaskAssignment.requireDuration]).toBeTruthy();
        expect(
            emptyFlashcard.settings[SettingTaskAssignment.requireTextNoteSubmission]
        ).toBeTruthy();
        expect(
            emptyFlashcard.settings[SettingTaskAssignment.requireUnderstandingLevel]
        ).toBeTruthy();
    });
});
