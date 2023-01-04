declare module NsStudyPlan {
    export interface Columns {
        start: string;
        due: string;
    }
    export interface RootObject {
        name: string;
        individual: string;
        grade: string;
        master: string;
        studyPlanName: string;
        studentName: string;
        showArchivedStudyPlan: string;
        bookAssociationName: string;
        bookAssociation: string;
        columns: Columns;
    }
}

export interface StudyPlans extends NsStudyPlan.RootObject {}
