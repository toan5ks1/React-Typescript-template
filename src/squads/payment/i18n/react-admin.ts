//TODO refactor react-admin name
declare module NsReactAdmin {
    export interface Message {
        maxFileSizeIs: string;
        invalidSearchQueryReturningAllItems: string;
        noDataInformation: string;
        unableToLoadData: string;
        notImplementedYet: string;
    }

    export interface CommonAction {
        cancel: string;
        submit: string;
        create: string;
        filter: string;
        uploadFile: string;
        addRow: string;
        deleteRow: string;
        close: string;
        leave: string;
        downloadFile: string;
        update: string;
        next: string;
        back: string;
        restore: string;
        save: string;
        confirm: string;
        submitAll: string;
    }

    export interface CommonTitle {
        cancelDialogTitle: string;
        previousDialogTitle: string;
    }

    export interface Specified {
        orderMismatch: string;
        csvFileIsEmpty: string;
        getBrightcoveProfileFail: string;
    }

    export interface ManabieError {
        specified: Specified;
        unknown: string;
        invalid_params: string;
    }

    export interface Common {
        action: CommonAction;
        title: CommonTitle;
    }

    export interface Validation {
        requiredAll: string;
    }

    export interface RootObject {
        message: Message;
        common: Common;
        validation: Validation;
        "manabie-error": ManabieError;
    }
}
export interface ReactAdmin extends NsReactAdmin.RootObject {}
