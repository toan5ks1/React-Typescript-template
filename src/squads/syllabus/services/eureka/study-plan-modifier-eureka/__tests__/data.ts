import { CreateMockDataTest } from "src/squads/syllabus/test-utils/types";

import { StudyPlanItemStatus } from "manabuf/eureka/v1/assignments_pb";

import { NsEurekaStudyPlanModifierService } from "../types";

export const createMockDataUpsertStudyPlanItem: CreateMockDataTest<
    NsEurekaStudyPlanModifierService.UpsertStudyPlanItem,
    {
        contentStructure?: Partial<
            NsEurekaStudyPlanModifierService.UpsertStudyPlanItem["contentStructure"]
        >;
    }
> = (override = {}, options = {}) => {
    return {
        status: StudyPlanItemStatus.STUDY_PLAN_ITEM_STATUS_ACTIVE,
        studyPlanId: "studyPlanId",
        studyPlanItemId: "studyPlanItemId",
        availableFrom: new Date("2022/01/01").toISOString(),
        availableTo: new Date("2022/03/01").toISOString(),
        startDate: new Date("2022/01/15").toISOString(),
        endDate: new Date("2022/02/01").toISOString(),
        contentStructure: {
            bookId: "bookId",
            chapterId: "chapterId",
            courseId: "courseId",
            topicId: "topicId",
            ...(options.contentStructure || { assignmentId: { value: "assignmentId" } }),
        },
        ...override,
    };
};

export const createMockDataUpsertStudyPlan: CreateMockDataTest<NsEurekaStudyPlanModifierService.UpsertStudyPlan> =
    (override = {}) => ({
        bookId: "bookId",
        studyPlanId: { value: "studyPlanId" },
        courseId: "courseId",
        gradesList: [12, 4],
        name: "name",
        schoolId: 12,
        status: 1,
        trackSchoolProgress: true,
        ...override,
    });
