declare module NsAssignments {
    export interface RootObject {
        assignment: string;
        createTitle: string;
        editTitle: string;
        attachment: string;
        assignmentInfo: string;
        name: string;
        gradingMethod: string;
        maxGrade: string;
        value: string;
        doesNotRequireGrading: string;
        requireTextNoteSubmission: string;
        requireAttachmentSubmission: string;
        requireRecordedVideoSubmission: string;
        allowLateSubmission: string;
        allowResubmission: string;
    }
}

export interface Assignments extends NsAssignments.RootObject {}
