declare module NsLessonReport {
    interface Actions {
        submit: string;
    }
    export interface Messages {
        needToFillInTheRequiredInformation: string;
    }

    export interface RootObject {
        actions: Actions;
        messages: Messages;
        generalInfo: string;
        course: string;
        subject: string;
        previousReport: string;
        submitLessonReport: string;
        areYouSureSubmitLessonReport: string;
        submitLessonReportNote: string;
        internalOnly: string;
        applyToBlankOnly: string;
        addReport: string;
        editReport: string;
    }
}
export interface LessonReport extends NsLessonReport.RootObject {}
