import { formatDate as formatDateUtil } from "src/common/utils/time";
import {
    AssignmentAttrsFragment,
    LearningObjectiveAttrsFragment,
} from "src/squads/syllabus/services/eureka/eureka-types";

import { GroupStudyPlanByStudentProps, StudyPlanListByStudent } from "../types";
import {
    formatDate,
    getEntityId,
    getEntityTopicId,
    groupStudyPlanByStudent,
    groupStudyPlanItemsByTopic,
} from "../utils";

describe(getEntityId.name, () => {
    it("should get assignment ID", () => {
        expect(getEntityId({ assignment_id: "id" } as AssignmentAttrsFragment)).toBe("id");
    });

    it("should get LO ID", () => {
        expect(getEntityId({ lo_id: "id" } as LearningObjectiveAttrsFragment)).toBe("id");
    });
});

describe(getEntityTopicId.name, () => {
    it("should get assignment topic ID", () => {
        expect(getEntityTopicId({ content: { topic_id: "id" } } as AssignmentAttrsFragment)).toBe(
            "id"
        );
    });

    it("should get LO topic ID", () => {
        expect(getEntityTopicId({ topic_id: "id" } as LearningObjectiveAttrsFragment)).toBe("id");
    });
});

describe(groupStudyPlanItemsByTopic.name, () => {
    it("should group assignments and learning objectives sorted by display order and grouped by topic", () => {
        type Props = Parameters<typeof groupStudyPlanItemsByTopic>[0];

        const topics = [
            { info: { id: "Topic1", name: "Topic 1" } },
            { info: { id: "Topic2", name: "Topic 2" } },
        ] as Props["topics"];
        const assignments = [
            {
                assignment_id: "Assignment1",
                name: "Assignment 1",
                content: { topic_id: "Topic1" },
                display_order: 1,
            },
            {
                assignment_id: "Assignment2",
                name: "Assignment 2",
                content: { topic_id: "Topic2" },
                display_order: 1,
            },
        ] as Props["assignments"];
        const learningObjectives = [
            { lo_id: "LO1", name: "LO 1", topic_id: "Topic1", display_order: 3 },
            { lo_id: "LO2", name: "LO 2", topic_id: "Topic1", display_order: 2 },
        ] as Props["learningObjectives"];
        const studyPlanItemsByAssignmentId = {
            [assignments[0].assignment_id]: {},
            [assignments[1].assignment_id]: {},
        } as Props["studyPlanItemsByAssignmentId"];
        const studyPlanItemsByLoId = {
            [learningObjectives[0].lo_id]: {},
            [learningObjectives[1].lo_id]: {},
        } as Props["studyPlanItemsByLoId"];
        const expectedResult = [
            {
                topicId: "Topic1",
                topicName: "Topic 1",
                studyPlanItems: [
                    { loName: assignments[0].name },
                    { loName: learningObjectives[1].name },
                    { loName: learningObjectives[0].name },
                ],
            },
            {
                topicId: "Topic2",
                topicName: "Topic 2",
                studyPlanItems: [{ loName: assignments[1].name }],
            },
        ];
        const actualResult = groupStudyPlanItemsByTopic({
            topics,
            assignments,
            learningObjectives,
            studyPlanItemsByAssignmentId,
            studyPlanItemsByLoId,
        });

        expect(actualResult).toMatchObject(expectedResult);
    });
});

describe(formatDate.name, () => {
    it("should return short date time format if it is in the current year", () => {
        const date = new Date();

        expect(
            formatDate({ isoDate: date.toISOString(), timezone: { value: "Asia/Saigon" } })
        ).toBe(formatDateUtil(date, "LL/dd, HH:mm"));
    });

    it("should return long date time format if the year is different from the current year", () => {
        const date = new Date();

        date.setFullYear(date.getFullYear() - 1);

        expect(
            formatDate({ isoDate: date.toISOString(), timezone: { value: "Asia/Saigon" } })
        ).toBe(formatDateUtil(date, "yyyy/LL/dd, HH:mm"));
    });

    it("should return long date time format if withYear is true", () => {
        const date = new Date();

        expect(
            formatDate({
                isoDate: date.toISOString(),
                timezone: { value: "Asia/Saigon" },
                withYear: true,
            })
        ).toBe(formatDateUtil(date, "yyyy/LL/dd, HH:mm"));
    });
});

describe(groupStudyPlanByStudent.name, () => {
    const studentList: GroupStudyPlanByStudentProps["studentList"] = [
        {
            user_id: "studentId2",
            name: "K Student 2",
            email: "kStudent2@manabie.com",
            avatar: null,
        },
        {
            user_id: "studentId1",
            name: "K Student 1",
            email: "kStudent1@manabie.com",
            avatar: null,
        },
    ];

    const student1 = studentList[0];
    const student2 = studentList[1];

    const studyPlanList: GroupStudyPlanByStudentProps["studyPlanList"] = [
        {
            studentId: student1.user_id,
            studyplanId: "studyPlanId2",
            name: "K Study Plan 2",
            grades: [1, 5],
            bookId: "bookId 01",
            created_at: "2021-04-01T11:37:56.282708+00:00",
        },
        {
            studentId: student1.user_id,
            studyplanId: "studyPlanId3",
            name: "K Study Plan 3",
            created_at: "2021-04-01T11:37:56.282708+00:00",
            bookId: "Book id 02",
            grades: [],
        },
        {
            studentId: student2.user_id,
            studyplanId: "studyPlanId1",
            name: "K Study Plan 1",
            created_at: "2021-04-01T11:37:56.282708+00:00",
            bookId: "Book id 02",
            grades: [],
        },
    ];

    const expectedResult: StudyPlanListByStudent[] = [
        {
            studentId: student1.user_id,
            studentName: student1.name,
            studyPlanList: [studyPlanList[0], studyPlanList[1]],
        },
        {
            studentId: student2.user_id,
            studentName: student2.name,
            studyPlanList: [studyPlanList[2]],
        },
    ];

    it("should group study plans by student", () => {
        const actualResult = groupStudyPlanByStudent({
            studentList,
            studyPlanList,
        });

        expect(actualResult).toMatchObject(expectedResult);
    });
});
