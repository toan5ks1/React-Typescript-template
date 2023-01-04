import { KeyConversionTaskStatusTypes } from "src/squads/syllabus/common/constants/const";

import { RootState } from "../../store-types";
import { LessonCollection, LessonConvert, Material } from "../lesson-convert-types";
import {
    getCurrentLessonSelector,
    getConvertMaterialLessonSelector,
    hasLessonConverting,
} from "../selectors";

describe("LessonConvert getCurrentLessonSelector", () => {
    it("should return correct selector", () => {
        const state: LessonConvert = {
            course01: new Map([["lesson01", []]]),
        };
        const selectorFn = getCurrentLessonSelector({
            courseId: "course01",
            lessonGroupId: "lesson01",
        });
        const memorize = selectorFn({ lessonConvert: state } as RootState);
        expect(memorize).toEqual([]);
    });

    it("should return fallback is empty array", () => {
        const state: LessonConvert = {};
        const selectorFn = getCurrentLessonSelector({
            courseId: "course01",
            lessonGroupId: "lesson01",
        });
        const memorize = selectorFn({ lessonConvert: state } as RootState);
        expect(memorize).toEqual([]);
    });
});

describe("LessonConvert getConvertMaterialLessonSelector", () => {
    it("should return correct selector", () => {
        const lessonOne: LessonCollection = new Map();
        const lessonTwo: LessonCollection = new Map();

        lessonOne.set("lesson01", [
            {
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
                name: "01",
                id: "02",
            },
            {
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
                name: "02",
                id: "02",
            },
        ]);
        lessonOne.set("lesson02", [
            {
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
                name: "01",
                id: "02",
            },
            {
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
                name: "02",
                id: "02",
            },
        ]);
        lessonTwo.set("lesson01", [
            {
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
                name: "01",
                id: "02",
            },
        ]);

        const state: LessonConvert = {
            course01: lessonOne,
            course02: lessonTwo,
        };
        const expectedData: { courseId: string; lessonGroupId: string; material: Material[] }[] = [
            {
                courseId: "course01",
                lessonGroupId: "lesson01",
                material: [
                    {
                        status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
                        name: "01",
                        id: "02",
                    },
                    {
                        status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
                        name: "02",
                        id: "02",
                    },
                ],
            },
            {
                courseId: "course01",
                lessonGroupId: "lesson02",
                material: [
                    {
                        status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
                        name: "01",
                        id: "02",
                    },
                    {
                        status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
                        name: "02",
                        id: "02",
                    },
                ],
            },
            {
                courseId: "course02",
                lessonGroupId: "lesson01",
                material: [
                    {
                        status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
                        name: "01",
                        id: "02",
                    },
                ],
            },
        ];
        const memorize = getConvertMaterialLessonSelector({ lessonConvert: state } as RootState);
        expect(memorize).toEqual(expectedData);
    });
});

describe("hasLessonConverting", () => {
    it("should return true", () => {
        const materials: Material[] = [
            {
                id: "001",
                name: "Name",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
            },
        ];
        expect(hasLessonConverting(materials)).toEqual(true);
    });

    it("should return false", () => {
        const materials: Material[] = [
            {
                id: "001",
                name: "Name",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FAILED,
            },
            {
                id: "002",
                name: "Name",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FINISHED,
            },
            {
                id: "003",
                name: "Name",
                status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_INVALID,
            },
        ];
        expect(hasLessonConverting(materials)).toEqual(false);
    });
});
