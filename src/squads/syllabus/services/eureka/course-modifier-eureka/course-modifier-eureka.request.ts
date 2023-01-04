import { formInvalidError } from "src/squads/syllabus/internals/errors";

import {
    AddBooksRequest,
    DuplicateBookRequest,
    UpdateDisplayOrdersOfLOsAndAssignmentsRequest,
} from "manabuf/eureka/v1/course_modifier_pb";

import { NsEurekaCourseModifierService } from "./types";

const invalidFormErr = new Error("ra.message.invalid_form");

export const validateAddBooksToCourse = (data: NsEurekaCourseModifierService.AddBooksToCourse) => {
    const { courseId, bookIdsList } = data;

    if (!courseId || !bookIdsList || !bookIdsList.length) throw formInvalidError;
};

export function validateDuplicateBook(data?: NsEurekaCourseModifierService.DuplicateBook) {
    if (!data || !data.bookId || !data.bookName) {
        throw invalidFormErr;
    }
}

export const createDuplicateBookRequest = (data: NsEurekaCourseModifierService.DuplicateBook) => {
    const req = new DuplicateBookRequest();

    req.setBookId(data.bookId);
    req.setBookName(data.bookName);

    return req;
};

export const createUpdateDisplayOrdersOfLOsAndAssignmentsRequest = (
    data: NsEurekaCourseModifierService.UpdateDisplayOrdersOfLOsAndAssignments
): UpdateDisplayOrdersOfLOsAndAssignmentsRequest => {
    const req = new UpdateDisplayOrdersOfLOsAndAssignmentsRequest();

    data.assignmentsList.forEach((item, index) => {
        const assignment = new UpdateDisplayOrdersOfLOsAndAssignmentsRequest.Assignment();
        assignment.setTopicId(item.topicId);
        assignment.setAssignmentId(item.assignmentId);
        assignment.setDisplayOrder(item.displayOrder);
        req.addAssignments(assignment, index);
    });

    data.learningObjectivesList.forEach((item, index) => {
        const lo = new UpdateDisplayOrdersOfLOsAndAssignmentsRequest.LearningObjective();
        lo.setTopicId(item.topicId);
        lo.setLoId(item.loId);
        lo.setDisplayOrder(item.displayOrder);
        req.addLearningObjectives(lo, index);
    });

    return req;
};

export const createAddBooksToCourseRequest = (
    data: NsEurekaCourseModifierService.AddBooksToCourse
) => {
    const request = new AddBooksRequest();
    request.setCourseId(data.courseId);

    request.setBookIdsList(data.bookIdsList);
    return request;
};
