import { KeyConversionTaskStatusTypes } from "src/common/constants/const";

import { LessonConvertActions, LessonConvertActionTypes } from "../actions";
import { LessonCollection } from "../lesson-convert-types";
import reducer from "../reducer";

describe(LessonConvertActionTypes.ADD_LESSON_CONVERT, () => {
    it("should not change state when list material is empty", () => {
        const state = reducer(
            {},
            LessonConvertActions.addLessonConvert({
                courseId: "01",
                lessonGroupId: "02",
                materials: [],
            })
        );
        expect(state).toEqual({});
    });

    it("should add task with parent keys", () => {
        const state = reducer(
            {},
            LessonConvertActions.addLessonConvert({
                courseId: "01",
                lessonGroupId: "02",
                materials: [{ media_id: "01", name: "name" }],
            })
        );
        const lesson: LessonCollection = new Map();
        lesson.set("02", [
            {
                id: "01",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
                name: "name",
            },
        ]);
        expect(state).toEqual({
            "01": lesson,
        });
    });

    it("should add task into list", () => {
        const lesson: LessonCollection = new Map();
        lesson.set("02", [
            {
                id: "id",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
                name: "name",
            },
        ]);
        const state = reducer(
            {
                "01": lesson,
            },
            LessonConvertActions.addLessonConvert({
                courseId: "01",
                lessonGroupId: "02",
                materials: [{ media_id: "01", name: "name" }],
            })
        );
        const expected = [
            {
                id: "id",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
                name: "name",
            },
            {
                id: "01",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
                name: "name",
            },
        ];
        expect(state).toEqual({
            "01": new Map().set("02", expected),
        });
    });

    it("should update status when retry", () => {
        const lesson: LessonCollection = new Map();
        lesson.set("02", [
            {
                id: "01",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FAILED,
                name: "name",
            },
        ]);
        const state = reducer(
            {
                "01": lesson,
            },
            LessonConvertActions.addLessonConvert({
                courseId: "01",
                lessonGroupId: "02",
                materials: [{ media_id: "01", name: "name" }],
                isRetry: true,
            })
        );
        const expected = [
            {
                id: "01",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
                name: "name",
            },
        ];
        expect(state).toEqual({
            "01": new Map().set("02", expected),
        });
    });
});

describe(LessonConvertActionTypes.UPDATE_LESSON_CONVERT_STATUS, () => {
    it("should return previous state when don't have parent", () => {
        const state = reducer(
            {},
            LessonConvertActions.updateLessonConvertStatus({
                courseId: "01",
                lessonGroupId: "02",
                materials: [],
            })
        );
        expect(state).toEqual({});
    });

    it("should remove task is finished", () => {
        const lesson: LessonCollection = new Map();
        lesson.set("02", [
            {
                id: "01",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
                name: "name",
            },
        ]);
        const state = reducer(
            {
                "01": lesson,
            },
            LessonConvertActions.updateLessonConvertStatus({
                courseId: "01",
                lessonGroupId: "02",
                materials: [
                    {
                        id: "01",
                        name: "name",
                        status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FINISHED,
                    },
                ],
            })
        );
        expect(state).toEqual({
            "01": new Map([
                [
                    "02",
                    [
                        {
                            id: "01",
                            name: "name",
                            status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FINISHED,
                        },
                    ],
                ],
            ]),
        });
    });
});
