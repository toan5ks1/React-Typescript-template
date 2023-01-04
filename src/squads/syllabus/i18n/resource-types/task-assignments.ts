declare module NsTaskAssignments {
    export interface RootObject {
        task: string;
        createTitle: string;
        editTitle: string;
        attachment: string;
        taskInformation: string;
        name: string;
        description: string;
        requiredItems: string;
        requireTextNoteSubmission: string;
        requireDuration: string;
        requireCorrectness: string;
        requireUnderstandingLevel: string;
        requireAttachmentSubmission: string;
        createdAt: string;
        noInformation: string;
    }
}

export interface TaskAssignments extends NsTaskAssignments.RootObject {}
