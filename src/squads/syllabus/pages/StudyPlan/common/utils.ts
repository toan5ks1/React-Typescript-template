import { FormatDateOptions } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { arrayHasItem } from "src/common/utils/other";
import { convertToDate, formatDate as formatDateUtil } from "src/common/utils/time";
import { convertTime2AnotherTimezone } from "src/common/utils/timezone";
import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import { sortDisplayOrderEntities } from "src/squads/syllabus/common/helpers/display-order";
import { TimezoneOptions } from "src/squads/syllabus/models/timezone";
import {
    AssignmentAttrsFragment,
    AssignmentsManyQuery,
    LearningObjectiveAttrsFragment,
    LearningObjectivesManyQuery,
    StudyPlanItemAttrsFragment,
} from "src/squads/syllabus/services/eureka/eureka-types";

import { ListTopicsByStudyPlanResponse } from "manabuf/eureka/v1/course_reader_pb";

import {
    GroupStudyPlanByStudentProps,
    StudyPlanItemsByTopic,
    StudyPlanItemWithLoInfo,
    StudyPlanListByStudent,
} from "./types";

export const getEntityId = (entity: AssignmentAttrsFragment | LearningObjectiveAttrsFragment) => {
    const assignment = entity as AssignmentAttrsFragment;

    if (assignment.assignment_id) return assignment.assignment_id;

    return (entity as LearningObjectiveAttrsFragment).lo_id;
};

export const getEntityTopicId = (
    entity: AssignmentAttrsFragment | LearningObjectiveAttrsFragment
): string => {
    const assignment = entity as AssignmentAttrsFragment;

    if (assignment.content) {
        return assignment.content.topic_id;
    }

    return convertString((entity as LearningObjectiveAttrsFragment).topic_id);
};

export const groupStudyPlanItemsByTopic = ({
    topics,
    assignments,
    learningObjectives,
    studyPlanItemsByAssignmentId,
    studyPlanItemsByLoId,
}: {
    topics: ListTopicsByStudyPlanResponse.AsObject["itemsList"];
    studyPlanItemsByAssignmentId: { [id: string]: StudyPlanItemAttrsFragment };
    assignments: AssignmentsManyQuery["assignments"];
    learningObjectives: LearningObjectivesManyQuery["learning_objectives"];
    studyPlanItemsByLoId: { [id: string]: StudyPlanItemAttrsFragment };
}): StudyPlanItemsByTopic[] => {
    const mixedItems: Record<string, StudyPlanItemWithLoInfo[]> = [
        ...assignments,
        ...learningObjectives,
    ].reduce(
        (previous, current) => ({
            ...previous,
            [getEntityTopicId(current)]: [
                ...(previous[getEntityTopicId(current)] || []),
                {
                    ...(studyPlanItemsByAssignmentId[getEntityId(current)] ||
                        studyPlanItemsByLoId[getEntityId(current)]),
                    loName: current.name,
                    loType: current.type as keyof typeof KeyLOTypes,
                    display_order: current.display_order!,
                },
            ],
        }),
        {}
    );

    return topics
        .map(({ info }) => ({
            topicId: info!.id,
            topicName: info!.name,
            studyPlanItems: (mixedItems[info!.id] || []).sort(sortDisplayOrderEntities),
        }))
        .filter(({ studyPlanItems }) => arrayHasItem(studyPlanItems));
};

export const formatDate = ({
    isoDate,
    timezone,
    withYear,
}: {
    isoDate: string;
    timezone: TimezoneOptions;
    withYear?: boolean;
}) => {
    if (!isoDate) return "";

    const shortDateTimeFormat: FormatDateOptions = "LL/dd, HH:mm";
    const fullDateTimeFormat: FormatDateOptions = "yyyy/LL/dd, HH:mm";
    const userDate = convertToDate(convertTime2AnotherTimezone(new Date(), timezone.value));
    const dateInUserTimezone = convertToDate(convertTime2AnotherTimezone(isoDate, timezone.value));
    let displayFormat =
        dateInUserTimezone.getFullYear() === userDate.getFullYear()
            ? shortDateTimeFormat
            : fullDateTimeFormat;

    if (withYear) {
        displayFormat = fullDateTimeFormat;
    }

    return formatDateUtil(dateInUserTimezone, displayFormat);
};

export const groupStudyPlanByStudent = ({
    studentList,
    studyPlanList,
}: GroupStudyPlanByStudentProps): StudyPlanListByStudent[] =>
    studentList.map(({ user_id, name }) => {
        const studyPlansByStudentId = studyPlanList.filter(
            ({ studentId }) => studentId === user_id
        );

        let mapResult: StudyPlanListByStudent = {
            studentId: user_id,
            studentName: name,
            studyPlanList: studyPlansByStudentId,
        };

        return mapResult;
    });
