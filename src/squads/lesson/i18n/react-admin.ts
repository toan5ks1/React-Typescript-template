declare module NsReactAdmin {
    export interface Action {
        add: string;
        delete: string;
        discard: string;
        edit: string;
        remove: string;
        close: string;
        leave: string;
        save: string;
        apply: string;
    }

    export interface Message {
        noDataInformation: string;
        unableToLoadData: string;
        invalidSearchQueryReturningAllItems: string;
        maxFileSizeIs: string;
        uploadBrightcoveLinkFail: string;
    }

    export interface Notification {
        i18n_error: string;
    }

    export interface Specified {
        getBrightcoveProfileFail: string;
    }

    export interface ManabieError {
        specified: Specified;
        unknown: string;
        invalid_params: string;
    }

    export interface Action2 {
        add: string;
        delete: string;
        OK: string;
        cancel: string;
        filter: string;
        upload: string;
    }

    export interface Common {
        action: Action2;
        saveDraft: string;
        convertingAllFilesSuccessfully: string;
    }

    export interface RootObject {
        action: Action;
        message: Message;
        notification: Notification;
        "manabie-error": ManabieError;
        common: Common;
    }
}
export interface ReactAdmin extends NsReactAdmin.RootObject {}
