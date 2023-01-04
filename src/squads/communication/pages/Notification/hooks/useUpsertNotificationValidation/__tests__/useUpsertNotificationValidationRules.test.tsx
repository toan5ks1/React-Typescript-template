import { EditorState } from "draft-js";
import {
    MAX_LENGTH_EDITOR,
    MAX_LENGTH_TITLE,
} from "src/squads/communication/common/constants/enum";
import { NotificationFormData } from "src/squads/communication/common/constants/types";
import { getExampleDraftContent } from "src/squads/communication/test-utils/draft-js";
import { createMockNotificationFormData } from "src/squads/communication/test-utils/notification";

import useUpsertNotificationValidationRules from "../useUpsertNotificationValidationRules";

import { renderHook } from "@testing-library/react-hooks";
import { emptyFormData } from "src/squads/communication/pages/Notification/hooks/useNotificationFormData";
import TestHookFormProvider from "src/squads/communication/test-utils/TestHookFormProvider";

const mockDefaultValues: NotificationFormData = createMockNotificationFormData();

const mockRef = { current: true };

const renderUseUpsertNotificationValidationRules = (
    defaultValues: NotificationFormData = mockDefaultValues
) => {
    return renderHook(() => useUpsertNotificationValidationRules(mockRef), {
        wrapper: TestHookFormProvider,
        initialProps: {
            useFormOptions: {
                defaultValues,
            },
        },
    });
};

describe("useUpsertNotificationValidationRules should validate every field of a form", () => {
    it("should show error message when the form doesn't have any data", () => {
        const defaultValues: NotificationFormData = emptyFormData;

        const {
            result: { current },
        } = renderUseUpsertNotificationValidationRules(defaultValues);

        expect(current.title.validate(defaultValues.title)).toEqual(
            "resources.input.error.required"
        );
        expect(current.content.validate(defaultValues.content)).toEqual(
            "resources.input.error.required"
        );
        expect(current.courses.validate()).toEqual("resources.input.error.required");
        expect(current.grades.validate()).toEqual("resources.input.error.required");
        expect(current.students.validate()).toEqual("resources.input.error.required");
    });

    it("should show required error message when time picker doesn't have any data", () => {
        const defaultValues: NotificationFormData = {
            ...mockDefaultValues,
            scheduleTime: undefined,
        };

        const {
            result: { current },
        } = renderUseUpsertNotificationValidationRules(defaultValues);

        expect(current.scheduleTime.validate(defaultValues.scheduleTime)).toEqual(
            "resources.input.error.required"
        );
    });

    it("should not show error message that says [courses, grades, students] is required if one of them has value", () => {
        const defaultValues: NotificationFormData = {
            ...mockDefaultValues,
            title: "",
            content: EditorState.createEmpty(),
        };

        const {
            result: { current },
        } = renderUseUpsertNotificationValidationRules(defaultValues);

        expect(current.title.validate(defaultValues.title)).toEqual(
            "resources.input.error.required"
        );
        expect(current.content.validate(defaultValues.content)).toEqual(
            "resources.input.error.required"
        );
        expect(current.courses.validate()).toBeUndefined();
        expect(current.grades.validate()).toBeUndefined();
        expect(current.students.validate()).toBeUndefined();
    });

    it("should show error message when [title, content] exceeds max length", () => {
        const defaultValues: NotificationFormData = {
            ...mockDefaultValues,
            title: "a".repeat(MAX_LENGTH_TITLE + 1),
            content: getExampleDraftContent("a".repeat(MAX_LENGTH_EDITOR + 1)),
        };

        const {
            result: { current },
        } = renderUseUpsertNotificationValidationRules(defaultValues);

        expect(current.title.validate(defaultValues.title)).toEqual(
            "resources.input.error.limitLength"
        );
        expect(current.content.validate(defaultValues.content)).toEqual(
            "resources.input.error.limitLength"
        );
        expect(current.courses.validate()).toBeUndefined();
        expect(current.grades.validate()).toBeUndefined();
        expect(current.students.validate()).toBeUndefined();
    });

    it("should trim the content and title", () => {
        const defaultValues: NotificationFormData = {
            ...mockDefaultValues,
            title: "      ",
            content: getExampleDraftContent("     "),
        };

        const {
            result: { current },
        } = renderUseUpsertNotificationValidationRules(defaultValues);

        expect(current.title.validate(defaultValues.title)).toEqual(
            "resources.input.error.required"
        );
        expect(current.content.validate(defaultValues.content)).toEqual(
            "resources.input.error.required"
        );
    });

    it("should pass validation", () => {
        const {
            result: { current },
        } = renderUseUpsertNotificationValidationRules();

        expect(current.title.validate(mockDefaultValues.title)).toBeUndefined();
        expect(current.content.validate(mockDefaultValues.content)).toBeUndefined();
        expect(current.courses.validate()).toBeUndefined();
        expect(current.grades.validate()).toBeUndefined();
        expect(current.students.validate()).toBeUndefined();
    });
});
