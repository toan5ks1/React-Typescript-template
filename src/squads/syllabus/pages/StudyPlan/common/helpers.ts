import { arrayHasItem } from "src/common/utils/other";
import { TimezoneOptions } from "src/squads/syllabus/models/timezone";
import { StudyPlanAttrsV2Fragment } from "src/squads/syllabus/services/eureka/eureka-types";

import { StudyPlanItemStatus } from "manabuf/eureka/v1/assignments_pb";

import { StudyPlanItemFormValues, StudyPlanItemsByTopic } from "./types";
import { formatDate } from "./utils";

// TODO: Refactor move it into test-util
export const convertGradesToString = (grades: Array<number>, gradeTitle: string): string => {
    if (!grades.length) return "";

    return `${gradeTitle} ${grades.join(`, ${gradeTitle} `)}`;
};

export const convertDataToStudyPlanItemDefaultValues = (
    studyPlanItems: StudyPlanItemsByTopic[],
    timezone: TimezoneOptions
): StudyPlanItemFormValues => {
    return {
        studyPlanItem: studyPlanItems.reduce((result, studyPlanItemsByTopic) => {
            const col: StudyPlanItemFormValues["studyPlanItem"] =
                studyPlanItemsByTopic.studyPlanItems.reduce((finalResult, studyPlanItem) => {
                    const nextValue: StudyPlanItemFormValues["studyPlanItem"] = {
                        [studyPlanItem.study_plan_item_id]: {
                            availableFrom: formatDate({
                                isoDate: studyPlanItem.available_from,
                                timezone,
                                withYear: true,
                            }),
                            availableTo: formatDate({
                                isoDate: studyPlanItem.available_to,
                                timezone,
                                withYear: true,
                            }),
                            startDate: formatDate({
                                isoDate: studyPlanItem.start_date,
                                timezone,
                                withYear: true,
                            }),
                            endDate: formatDate({
                                isoDate: studyPlanItem.end_date,
                                timezone,
                                withYear: true,
                            }),
                            contentStructure: studyPlanItem.content_structure,
                            status: studyPlanItem.status as keyof typeof StudyPlanItemStatus,
                        },
                    };
                    return {
                        ...finalResult,
                        ...nextValue,
                    };
                }, {});

            return { ...result, ...col };
        }, {}),
    };
};

// TODO: refactor to generic function
export const getBookIdsFromStudyplanList = (
    studyplanList: StudyPlanAttrsV2Fragment[],
    shouldUnique: boolean = true
): string[] => {
    const bookIds: string[] = [];
    const safeStudyplanList = arrayHasItem(studyplanList) ? studyplanList : [];

    safeStudyplanList.forEach((studyplan) => {
        if (studyplan.book_id) {
            bookIds.push(studyplan.book_id);
        }
    });

    if (shouldUnique) return [...new Set(bookIds)];

    return bookIds;
};
