import { convertDateStringToTimestamp } from "src/common/utils/timezone";

import { ContentStructure, StudyPlanItem } from "manabuf/eureka/v1/assignments_pb";
import {
    UpsertStudyPlanItemV2Request,
    UpsertStudyPlanRequest,
} from "manabuf/eureka/v1/study_plan_modifier_pb";
import { StringValue } from "manabuf/google/protobuf/wrappers_pb";

import { formInvalidError } from "../../../internals/errors";
import { NsEurekaStudyPlanModifierService } from "./types";

export function validateUpsertStudyPlan(data: NsEurekaStudyPlanModifierService.UpsertStudyPlan) {
    if (!data || !data.schoolId || !data.courseId || !data.bookId || !data.name || !data.status)
        throw formInvalidError;
}

export const createUpsertStudyPlanRequest = (
    data: NsEurekaStudyPlanModifierService.UpsertStudyPlan
): UpsertStudyPlanRequest => {
    const req = new UpsertStudyPlanRequest();

    if (data.studyPlanId?.value) {
        const studyPlanIdStringValue = new StringValue();

        studyPlanIdStringValue.setValue(data.studyPlanId.value);
        req.setStudyPlanId(studyPlanIdStringValue);
    }

    req.setSchoolId(data.schoolId);
    req.setCourseId(data.courseId);
    req.setBookId(data.bookId);
    req.setName(data.name);
    req.setStatus(data.status);
    req.setGradesList(data.gradesList);
    req.setTrackSchoolProgress(data.trackSchoolProgress);

    return req;
};

export const createRequestContentStructure = ({
    bookId,
    chapterId,
    topicId,
    assignmentId,
    loId,
    courseId,
}: NsEurekaStudyPlanModifierService.UpsertStudyPlanItem["contentStructure"]) => {
    const requestContentStructure = new ContentStructure();

    requestContentStructure.setBookId(bookId);
    requestContentStructure.setChapterId(chapterId);
    requestContentStructure.setTopicId(topicId);
    requestContentStructure.setCourseId(courseId);

    if (assignmentId?.value) {
        const assignmentIdStringValue = new StringValue();

        assignmentIdStringValue.setValue(assignmentId.value);
        requestContentStructure.setAssignmentId(assignmentIdStringValue);
    }

    if (loId?.value) {
        const loIdStringValue = new StringValue();

        loIdStringValue.setValue(loId.value);
        requestContentStructure.setLoId(loIdStringValue);
    }

    return requestContentStructure;
};

export const createUpsertStudyPlanItemsRequest = (
    data: NsEurekaStudyPlanModifierService.UpsertStudyPlanItems
) => {
    const req = new UpsertStudyPlanItemV2Request();
    const studyPlanItems = data.map(
        ({
            studyPlanId,
            studyPlanItemId,
            availableFrom,
            availableTo,
            startDate,
            endDate,
            contentStructure,
            status,
        }) => {
            const studyPlanItem = new StudyPlanItem();

            studyPlanItem.setStudyPlanId(studyPlanId);
            studyPlanItem.setStudyPlanItemId(studyPlanItemId);
            studyPlanItem.setStatus(status);

            if (contentStructure) {
                studyPlanItem.setContentStructure(createRequestContentStructure(contentStructure));
            }

            if (availableFrom) {
                studyPlanItem.setAvailableFrom(
                    convertDateStringToTimestamp(availableFrom, "yyyy/LL/dd, HH:mm")
                );
            }

            if (availableTo) {
                studyPlanItem.setAvailableTo(
                    convertDateStringToTimestamp(availableTo, "yyyy/LL/dd, HH:mm")
                );
            }

            if (startDate) {
                studyPlanItem.setStartDate(
                    convertDateStringToTimestamp(startDate, "yyyy/LL/dd, HH:mm")
                );
            }

            if (endDate) {
                studyPlanItem.setEndDate(
                    convertDateStringToTimestamp(endDate, "yyyy/LL/dd, HH:mm")
                );
            }

            return studyPlanItem;
        }
    );

    req.setStudyPlanItemsList(studyPlanItems);

    return req;
};
