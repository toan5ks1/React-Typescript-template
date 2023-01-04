import { formInvalidError, paramsInvalidError } from "src/squads/syllabus/internals/errors";
import { SettingAssignment, SettingTaskAssignment } from "src/squads/syllabus/models/assignment";

import {
    DeleteAssignmentsRequest,
    UpsertAssignmentRequest,
    UpsertAssignmentsRequest,
} from "manabuf/eureka/v1/assignment_writer_pb";
import { Assignment, AssignmentContent, AssignmentSetting } from "manabuf/eureka/v1/assignments_pb";
import { AssignmentStatus, AssignmentType } from "manabuf/eureka/v1/enums_pb";

import { NsAssignmentEureka } from "./types";

export const validateUpsertAssignment = (data: NsAssignmentEureka.UpsertAssignment) => {
    if (!data.name || typeof data.displayOrder === undefined) {
        throw formInvalidError;
    }

    if (data.requiredGrade && data.maxGrade <= 0) {
        throw formInvalidError;
    }
};

export const createUpsertAssignmentRequest = (data: NsAssignmentEureka.UpsertAssignment) => {
    const {
        name,
        settings,
        content,
        instruction,
        displayOrder,
        requiredGrade,
        maxGrade,
        attachmentIds = [],
        assignmentType,
    } = data;

    const req = new UpsertAssignmentRequest();

    const assign = new Assignment();
    const assignContent = new AssignmentContent();
    const assignSetting = new AssignmentSetting();

    assign.setName(name);
    assign.setDisplayOrder(displayOrder);
    assign.setInstruction(instruction);
    assign.setRequiredGrade(requiredGrade);
    assign.setAttachmentsList(attachmentIds);

    // TODO: Ask BE why we need to send status and type
    assign.setAssignmentStatus(AssignmentStatus.ASSIGNMENT_STATUS_ACTIVE);
    assign.setAssignmentType(assignmentType);

    if (requiredGrade) assign.setMaxGrade(maxGrade);

    if ("assignmentId" in data && data.assignmentId) assign.setAssignmentId(data.assignmentId);

    if (content) {
        assignContent.setLoIdList(content.loIdList);
        assignContent.setTopicId(content.topicId);

        assign.setContent(assignContent);
    }

    if (settings) {
        assignSetting.setAllowLateSubmission(settings[SettingAssignment.allowLateSubmission]);
        assignSetting.setAllowResubmission(settings[SettingAssignment.allowResubmission]);
        assignSetting.setRequireVideoSubmission(
            settings[SettingAssignment.requireRecordedVideoSubmission]
        );
        assignSetting.setRequireAssignmentNote(
            settings[SettingAssignment.requireTextNoteSubmission]
        );
        assignSetting.setRequireAttachment(settings[SettingAssignment.requireAttachmentSubmission]);
        assignSetting.setRequireCompleteDate(
            assignmentType === AssignmentType.ASSIGNMENT_TYPE_TASK
        );
        assignSetting.setRequireDuration(settings[SettingTaskAssignment.requireDuration]);
        assignSetting.setRequireCorrectness(settings[SettingTaskAssignment.requireCorrectness]);
        assignSetting.setRequireUnderstandingLevel(
            settings[SettingTaskAssignment.requireUnderstandingLevel]
        );

        assign.setSetting(assignSetting);
    }

    req.addAssignments(assign);

    return req;
};

export const createUpsertAssignmentRequestV2 = (data: NsAssignmentEureka.UpsertAssignment) => {
    const {
        name,
        settings,
        content,
        instruction,
        displayOrder,
        requiredGrade,
        maxGrade,
        attachmentIds = [],
        assignmentType,
    } = data;

    const req = new UpsertAssignmentsRequest();

    const assign = new Assignment();
    const assignContent = new AssignmentContent();
    const assignSetting = new AssignmentSetting();

    assign.setName(name);
    assign.setDisplayOrder(displayOrder);
    assign.setInstruction(instruction);
    assign.setRequiredGrade(requiredGrade);
    assign.setAttachmentsList(attachmentIds);

    // TODO: Ask BE why we need to send status and type
    assign.setAssignmentStatus(AssignmentStatus.ASSIGNMENT_STATUS_ACTIVE);
    assign.setAssignmentType(assignmentType);

    if (requiredGrade) assign.setMaxGrade(maxGrade);

    if ("assignmentId" in data && data.assignmentId) assign.setAssignmentId(data.assignmentId);

    if (content) {
        assignContent.setLoIdList(content.loIdList);
        assignContent.setTopicId(content.topicId);

        assign.setContent(assignContent);
    }

    if (settings) {
        assignSetting.setAllowLateSubmission(settings[SettingAssignment.allowLateSubmission]);
        assignSetting.setAllowResubmission(settings[SettingAssignment.allowResubmission]);
        assignSetting.setRequireVideoSubmission(
            settings[SettingAssignment.requireRecordedVideoSubmission]
        );
        assignSetting.setRequireAssignmentNote(
            settings[SettingAssignment.requireTextNoteSubmission]
        );
        assignSetting.setRequireAttachment(settings[SettingAssignment.requireAttachmentSubmission]);
        assignSetting.setRequireCompleteDate(
            assignmentType === AssignmentType.ASSIGNMENT_TYPE_TASK
        );
        assignSetting.setRequireDuration(settings[SettingTaskAssignment.requireDuration]);
        assignSetting.setRequireCorrectness(settings[SettingTaskAssignment.requireCorrectness]);
        assignSetting.setRequireUnderstandingLevel(
            settings[SettingTaskAssignment.requireUnderstandingLevel]
        );

        assign.setSetting(assignSetting);
    }

    req.addAssignments(assign);

    return req;
};

export function validateDeleteAssignments(data: NsAssignmentEureka.DeleteAssignments) {
    const shouldThrowErr = !data.assignmentIdsList || !data.assignmentIdsList.length;

    if (shouldThrowErr) {
        throw paramsInvalidError;
    }
}

export function createDeleteAssignmentsRequest({
    assignmentIdsList,
}: NsAssignmentEureka.DeleteAssignments) {
    const request = new DeleteAssignmentsRequest();

    request.setAssignmentIdsList(assignmentIdsList);

    return request;
}
