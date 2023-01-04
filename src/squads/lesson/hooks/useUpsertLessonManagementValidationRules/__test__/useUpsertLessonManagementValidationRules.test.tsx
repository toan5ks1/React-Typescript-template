import { FieldPath, UseFormClearErrors, useFormContext, UseFormReturn } from "react-hook-form";

import { renderHook } from "@testing-library/react-hooks";
import useUpsertLessonManagementValidationRules from "src/squads/lesson/hooks/useUpsertLessonManagementValidationRules";
import {
    LessonManagementUpsertFormType,
    LessonSavingMethodKeys,
} from "src/squads/lesson/pages/LessonManagement/common/types";

jest.mock("src/squads/lesson/hooks/useDatePickerPairHF", () => {
    return jest.fn();
});

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");

    return {
        __esModule: true,
        ...originalModule,
        useFormContext: jest.fn(),
    };
});

describe("useUpsertLessonValidationRules hook", () => {
    const now = new Date("2021-01-01T15:00:00.000");

    const futureTime = new Date(now.setHours(now.getHours() + 1));
    const pastTime = new Date(now.setHours(now.getHours() - 1));
    const translate = (key: string) => key;
    const translateResource = (key: string) => key;

    it("Check invalid value", () => {
        const lessonData: LessonManagementUpsertFormType = {
            startTime: futureTime,
            endTime: pastTime,
            teachers: [],
            center: {
                name: "Center Name 01",
                locationId: "Center ID 01",
            },
            learners: [], //TODO: validate empty learners
            materialsList: [],
            date: futureTime,
            method: LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_ONE_TIME,
            teachingMedium: "LESSON_TEACHING_MEDIUM_OFFLINE",
            teachingMethod: "LESSON_TEACHING_METHOD_GROUP",
        };
        (useFormContext as jest.Mock).mockImplementation(() => {
            return {
                getValues: (fields: FieldPath<LessonManagementUpsertFormType>) => {
                    return lessonData[fields];
                },
                clearErrors: jest.fn() as UseFormClearErrors<LessonManagementUpsertFormType>,
            } as UseFormReturn<LessonManagementUpsertFormType>;
        });

        const {
            result: { current },
        } = renderHook(() =>
            useUpsertLessonManagementValidationRules(translate, translateResource)
        );

        expect(
            current.teachers.validate(
                lessonData.teachers as LessonManagementUpsertFormType["teachers"]
            )
        ).toEqual("resources.input.error.required");

        expect(current.startTime.validate(lessonData.startTime)).toEqual(
            "resources.input.error.timeMustComeBefore"
        );

        expect(current.endTime.validate(lessonData.endTime)).toEqual(
            "resources.input.error.timeMustComeBefore"
        );
    });

    it("Check valid value", () => {
        const lessonData: LessonManagementUpsertFormType = {
            date: pastTime,
            startTime: pastTime,
            endTime: futureTime,
            teachers: [
                {
                    name: "Teacher Test",
                    user_id: "teacher_id_1",
                    email: "teacher@test.com",
                },
            ],
            center: {
                name: "Center Name 01",
                locationId: "Center ID 01",
            },
            learners: [], //TODO: validate empty learners
            materialsList: [],
            method: LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_ONE_TIME,
            teachingMedium: "LESSON_TEACHING_MEDIUM_OFFLINE",
            teachingMethod: "LESSON_TEACHING_METHOD_GROUP",
        };
        (useFormContext as jest.Mock).mockImplementation(() => {
            return {
                getValues: (fields: FieldPath<LessonManagementUpsertFormType>) => {
                    return lessonData[fields];
                },
                clearErrors: jest.fn() as UseFormClearErrors<LessonManagementUpsertFormType>,
            } as UseFormReturn<LessonManagementUpsertFormType>;
        });

        const {
            result: { current },
        } = renderHook(() =>
            useUpsertLessonManagementValidationRules(translate, translateResource)
        );

        expect(
            current.teachers.validate(
                lessonData.teachers as LessonManagementUpsertFormType["teachers"]
            )
        ).not.toEqual("resources.input.error.required");

        expect(current.startTime.validate(lessonData.startTime)).not.toEqual(
            "resources.input.error.timeMustComeBefore"
        );
        expect(current.endTime.validate(lessonData.endTime)).not.toEqual(
            "resources.input.error.timeMustComeBefore"
        );
    });
});
