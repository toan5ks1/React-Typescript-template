declare module NsExams {
    export interface ExamMessage {
        createExamLOSuccessfully: string;
    }

    export interface Label {
        name: string;
    }

    export interface RootObject {
        instruction: string;
        editExam: string;
        details: string;
        examInformation: string;
        messages: ExamMessage;
        label: Label;
    }
}

export interface Exams extends NsExams.RootObject {}
