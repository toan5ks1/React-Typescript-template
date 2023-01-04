import { DeleteAssignmentsRequest } from "manabuf/eureka/v1/assignment_writer_pb";
import { Assignment, AssignmentContent, AssignmentSetting } from "manabuf/eureka/v1/assignments_pb";

import { Media } from "src/squads/syllabus/__generated__/bob/root-types";

export declare namespace NsAssignmentEureka {
    interface UpdateAssignment
        extends Omit<
            Assignment.AsObject,
            "attachmentsList" | "setting" | "assignmentStatus" | "content"
        > {
        content: AssignmentContent.AsObject;
        files?: (File | Media)[];
        attachmentIds?: string[];
        settings?: AssignmentSetting.AsObject;
    }

    interface CreateAssignment extends Omit<UpdateAssignment, "assignmentId"> {}

    export type UpsertAssignment = UpdateAssignment | CreateAssignment;

    export interface DeleteAssignments extends DeleteAssignmentsRequest.AsObject {}
}
