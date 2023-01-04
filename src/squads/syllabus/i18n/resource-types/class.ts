declare module NsClass {
    export interface Columns {
        className: string;
        location: string;
        action: string;
    }

    export interface Messages {
        editSuccessfully: string;
        deleteSuccessfully: string;
    }

    export interface Titles {
        edit: string;
        deleteAClass: string;
    }

    export interface RootObject {
        class: string;
        columns: Columns;
        messages: Messages;
        titles: Titles;
        areYouSureToDelete: string;
        youCanNotDeleteThisClass: string;
        thereAreLessonInTheClass: string;
        thereAreStudentInTheClass: string;
    }
}

export interface Class extends NsClass.RootObject {}
