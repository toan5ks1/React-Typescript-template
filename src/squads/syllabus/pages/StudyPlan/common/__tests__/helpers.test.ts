import { StudyPlanAttrsV2Fragment } from "src/squads/syllabus/services/eureka/eureka-types";

import { StudyPlanItemStatusKey } from "../constants";
import {
    convertDataToStudyPlanItemDefaultValues,
    convertGradesToString,
    getBookIdsFromStudyplanList,
} from "../helpers";
import { QueryContentStructure, StudyPlanItemFormValues } from "../types";

describe(convertGradesToString.name, () => {
    it("should convert grades to string", () => {
        expect(convertGradesToString([1, 2, 6], "Grade")).toBe("Grade 1, Grade 2, Grade 6");
    });

    it("should return empty string if grades is empty", () => {
        expect(convertGradesToString([], "Grade")).toBe("");
    });
});

describe(convertDataToStudyPlanItemDefaultValues.name, () => {
    it("should return the correct data", () => {
        const genStructure = (
            override: Partial<QueryContentStructure> = {}
        ): QueryContentStructure => {
            if (override.assignment_id && override.lo_id) {
                throw new Error("Study plan structure accept only assignmentId or lOId");
            }

            return {
                topic_id: "topic_id",
                assignment_id: "assignment_id",
                book_id: "book_id",
                chapter_id: "chapter_id",
                course_id: "course_id",
                lo_id: "lo_id",
                ...override,
            };
        };
        const result = convertDataToStudyPlanItemDefaultValues(
            [
                {
                    studyPlanItems: [
                        {
                            loName: "lo_name",
                            available_from: "2022-01-19T17:00:00+00:00",
                            available_to: "2023-01-19T17:00:00+00:00",
                            start_date: "2022-02-19T17:00:00+00:00",
                            end_date: "2022-12-19T17:00:00+00:00",
                            status: StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE,
                            study_plan_item_id: "study_plan_item_id_01",
                            content_structure: genStructure({ lo_id: "lo_id_01" }),
                        },
                        {
                            loName: "lo_name_02",
                            available_from: "2022-01-19T17:00:00+00:00",
                            available_to: "2023-01-19T17:00:00+00:00",
                            start_date: "2022-02-19T17:00:00+00:00",
                            end_date: "2022-12-19T17:00:00+00:00",
                            status: StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED,
                            study_plan_item_id: "study_plan_item_id_02",
                            content_structure: genStructure({ lo_id: "lo_id_02" }),
                        },
                    ],
                    topicId: "topic_01",
                    topicName: "topic_name_01",
                },
                {
                    studyPlanItems: [
                        {
                            loName: "lo_name_03",
                            available_from: "2022-01-19T17:00:00+00:00",
                            available_to: "2023-01-19T17:00:00+00:00",
                            start_date: "2022-02-19T17:00:00+00:00",
                            end_date: "2022-12-19T17:00:00+00:00",
                            status: StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED,
                            study_plan_item_id: "study_plan_item_id_03",
                            content_structure: genStructure({
                                lo_id: "lo_id_03",
                                topic_id: "topic_02",
                            }),
                        },
                    ],
                    topicId: "topic_02",
                    topicName: "topic_name_02",
                },
            ],
            { value: "Asia/Saigon" }
        );

        expect(result).toEqual<StudyPlanItemFormValues>({
            studyPlanItem: {
                study_plan_item_id_01: {
                    availableFrom: "2022/01/19, 17:00",
                    availableTo: "2023/01/19, 17:00",
                    contentStructure: {
                        assignment_id: "assignment_id",
                        book_id: "book_id",
                        chapter_id: "chapter_id",
                        course_id: "course_id",
                        lo_id: "lo_id_01",
                        topic_id: "topic_id",
                    },
                    endDate: "2022/12/19, 17:00",
                    startDate: "2022/02/19, 17:00",
                    status: StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE,
                },
                study_plan_item_id_02: {
                    availableFrom: "2022/01/19, 17:00",
                    availableTo: "2023/01/19, 17:00",
                    contentStructure: {
                        assignment_id: "assignment_id",
                        book_id: "book_id",
                        chapter_id: "chapter_id",
                        course_id: "course_id",
                        lo_id: "lo_id_02",
                        topic_id: "topic_id",
                    },
                    endDate: "2022/12/19, 17:00",
                    startDate: "2022/02/19, 17:00",
                    status: StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED,
                },
                study_plan_item_id_03: {
                    availableFrom: "2022/01/19, 17:00",
                    availableTo: "2023/01/19, 17:00",
                    contentStructure: {
                        assignment_id: "assignment_id",
                        book_id: "book_id",
                        chapter_id: "chapter_id",
                        course_id: "course_id",
                        lo_id: "lo_id_03",
                        topic_id: "topic_02",
                    },
                    endDate: "2022/12/19, 17:00",
                    startDate: "2022/02/19, 17:00",
                    status: StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED,
                },
            },
        });
    });
});

describe(getBookIdsFromStudyplanList.name, () => {
    it("should return book ids unique", () => {
        const studyplanList: StudyPlanAttrsV2Fragment[] = [
            {
                created_at: new Date("2021/05/12, 07:15"),
                study_plan_id: "study_plan_id_01",
                book_id: "book_01",
            },
            {
                created_at: new Date("2021/05/12, 07:15"),
                study_plan_id: "study_plan_id_02",
                book_id: "book_02",
            },
            {
                created_at: new Date("2021/05/12, 07:15"),
                study_plan_id: "study_plan_id_03",
                book_id: "book_01",
            },
        ];

        expect(getBookIdsFromStudyplanList(studyplanList)).toEqual(["book_01", "book_02"]);
    });

    it("should return an empty array when course studyplan list is bad data", () => {
        // @ts-ignore
        const studyplanListBadData: StudyPlanAttrsV2Fragment[] = null;

        expect(getBookIdsFromStudyplanList(studyplanListBadData)).toEqual([]);
    });
});
