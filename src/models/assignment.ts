import { Assignment as AssignmentProto } from "manabuf/eureka/v1/assignments_pb";

export interface Assignment extends AssignmentProto.AsObject {
    attachment?: string[];
}
export interface SettingAssignmentHasura {
    [key: string]: boolean;
}
export interface AssignmentHasura {
    id: string;
    assignment_id: string;
    topic_id?: string;
    name: string;
    max_grade: number;
    settings: SettingAssignmentHasura;
    attachment: string[];
    instruction: string;
    content: {
        topic_id: string;
    };
    display_order: number;
    is_required_grade: boolean;
    created_at?: string;
}

export type SimpleAssignmentHasura = Pick<
    AssignmentHasura,
    "display_order" | "assignment_id" | "name"
> & {
    content: string;
};

export const SettingAssignment = {
    requireTextNoteSubmission: "require_assignment_note",
    requireAttachmentSubmission: "require_attachment",
    requireRecordedVideoSubmission: "require_video_submission",
    allowLateSubmission: "allow_late_submission",
    allowResubmission: "allow_resubmission",
};
