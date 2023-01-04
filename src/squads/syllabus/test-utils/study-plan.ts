import { KeyLOTypes, KeyStudyPlanTypes } from "src/squads/syllabus/common/constants/const";
import { genId } from "src/squads/syllabus/common/utils/generator";
import {
    StudyPlanOneV2Query,
    Syllabus_BooksManyReferenceQuery,
} from "src/squads/syllabus/services/eureka/eureka-types";
import { NsEurekaStudyPlanModifierService } from "src/squads/syllabus/services/eureka/study-plan-modifier-eureka/types";
import { ArrayElement } from "src/squads/syllabus/typings/support-types";

import { StudyPlanInfoProps } from "src/squads/syllabus/pages/StudyPlan/components/StudyPlanInfo";

import { StudyPlanStatus, StudyPlanType } from "manabuf/eureka/v1/enums_pb";

import { Grade } from "../models/grade";
import {
    StudyPlanFormData,
    StudyPlanItemsByTopic,
    StudyPlanItemWithLoInfo,
} from "../pages/StudyPlan/common/types";

import { UseAutocompleteReferenceReturns } from "src/squads/syllabus/hooks/useAutocompleteReference";
import {
    StudyPlanItemStatusKey,
    StudyPlanStatusKey,
} from "src/squads/syllabus/pages/StudyPlan/common/constants";

export const mockCourseId = "courseId";
//gradeList has to contain gradeIds
export const gradeList: Grade[] = [
    { id: 5, name: "Grade 5" },
    { id: 6, name: "Grade 6" },
];
export const gradeIdsByGradeList: number[] = [5, 6];

export const mockBookAutocomplete: UseAutocompleteReferenceReturns<
    ArrayElement<Syllabus_BooksManyReferenceQuery["books"]>
> = {
    options: [{ book_id: "book_id", name: "K Book", value: "K Book" }],
    isFetching: false,
    setInputVal: jest.fn(),
};

export const mockStudyPlanFormData: StudyPlanFormData = {
    name: "K Study Plan",
    book: mockBookAutocomplete.options[0],
    grades: gradeList,
    trackSchoolProgress: true,
};

export const mockStudyPlanInfo: StudyPlanInfoProps = {
    bookId: mockStudyPlanFormData.book!.book_id,
    bookName: mockStudyPlanFormData.book!.name,
    grades: gradeIdsByGradeList,
    trackSchoolProgress: mockStudyPlanFormData.trackSchoolProgress,
};

type MockStudyPlanItemsTableDataParams = {
    fromDate?: Date;
    toDate?: Date;
    items?: StudyPlanItemsByTopic[];
};
export const mockStudyPlanItemsTableData = ({
    fromDate = new Date(2010, 10, 10),
    toDate = new Date(2010, 10, 10),
    items = [],
}: MockStudyPlanItemsTableDataParams): StudyPlanItemsByTopic[] => {
    const status = {
        active: StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE,
        archived: StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED,
    };

    const types = {
        lo: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING,
        fc: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_FLASH_CARD,
        offline: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_OFFLINE_LEARNING,
    };

    const commonData = {
        available_from: fromDate,
        available_to: toDate,
        start_date: fromDate,
        end_date: toDate,
    };

    return [
        {
            topicId: genId(),
            topicName: "Topic 1",
            studyPlanItems: [
                {
                    study_plan_item_id: genId(),
                    loName: "Learning Objective",
                    loType: types.lo,
                    status: status.active,
                    ...commonData,
                },
                {
                    study_plan_item_id: genId(),
                    loName: "Flash Card",
                    loType: types.fc,
                    status: status.active,
                    ...commonData,
                    start_date: undefined,
                },
                {
                    study_plan_item_id: genId(),
                    loName: "Offline Study",
                    loType: types.offline,
                    status: status.archived,
                    ...commonData,
                },
                {
                    study_plan_item_id: genId(),
                    loName: "Assignment",
                    status: status.active,
                    ...commonData,
                },
            ],
        },
        {
            topicId: genId(),
            topicName: "Topic 2",
            studyPlanItems: [
                {
                    study_plan_item_id: genId(),
                    loName: "Some another item",
                    loType: types.lo,
                    status: status.active,
                    start_date: fromDate,
                    end_date: toDate,
                },
            ],
        },
        {
            topicId: genId(),
            topicName: "Topic 3",
            studyPlanItems: [],
        },
        ...items,
    ];
};

export const generateStudyPlanOneQuery = ({
    statusKey = StudyPlanStatusKey.STUDY_PLAN_STATUS_ACTIVE,
    studyPlanTypeKey = KeyStudyPlanTypes.STUDY_PLAN_TYPE_COURSE,
}: {
    statusKey?: keyof typeof StudyPlanStatus;
    studyPlanTypeKey?: keyof typeof StudyPlanType;
}): ArrayElement<StudyPlanOneV2Query["study_plans"]> => {
    const { name, book, trackSchoolProgress } = mockStudyPlanFormData;

    return {
        name: name,
        study_plan_id:
            studyPlanTypeKey === KeyStudyPlanTypes.STUDY_PLAN_TYPE_COURSE
                ? "master_study_plan_id"
                : "study_plan_id",
        created_at: "2021-12-07T07:49:32.513198+00:00",
        master_study_plan_id:
            studyPlanTypeKey === KeyStudyPlanTypes.STUDY_PLAN_TYPE_COURSE
                ? null
                : "master_study_plan_id",
        book_id: book!.book_id,
        grades: gradeIdsByGradeList,
        status: statusKey,
        study_plan_type: studyPlanTypeKey,
        course_id: mockCourseId,
        track_school_progress: trackSchoolProgress,
        study_plan_items: [],
    };
};

export const generateStudyPlanPayload = ({
    studyPlanId = undefined,
    statusKey = StudyPlanStatusKey.STUDY_PLAN_STATUS_ACTIVE,
}: {
    studyPlanId?: string | undefined;
    statusKey?: keyof typeof StudyPlanStatus;
}): NsEurekaStudyPlanModifierService.UpsertStudyPlan => {
    const { name, book, trackSchoolProgress } = mockStudyPlanFormData;

    return {
        studyPlanId: studyPlanId ? { value: studyPlanId } : undefined,
        name: name,
        bookId: book!.book_id,
        gradesList: gradeIdsByGradeList,
        schoolId: 1,
        courseId: mockCourseId,
        trackSchoolProgress,
        status: StudyPlanStatus[statusKey],
    };
};

export const createMockDataSelectedItemsWithCustomStatus = (
    selectedItems: StudyPlanItemWithLoInfo[],
    type: "active" | "archived" | "mixed"
): StudyPlanItemWithLoInfo[] => {
    let status: string;

    return selectedItems.map((item, index) => {
        switch (type) {
            case "active":
                status = StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE;
                break;

            case "archived":
                status = StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED;
                break;

            case "mixed":
                status =
                    index % 2 === 0
                        ? StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE
                        : StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED;
                break;
        }

        return {
            ...item,
            status,
        };
    });
};
