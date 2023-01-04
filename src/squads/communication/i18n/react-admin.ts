declare module NsReactAdmin {
    export interface Message {
        maxFileSizeIs: string;
        unableToLoadData: string;
    }

    export interface Navigation {
        page_range_info: string;
        page_rows_per_page: string;
    }

    export interface Notification {
        item_doesnt_exist: string;
    }

    export interface Specified {
        cantEditSentNotification: string;
        cantDiscardSentNotification: string;
        cantSendSentNotification: string;
        cantEditDiscardedNotification: string;
        cantSendDiscardedNotification: string;
        cantDiscardDeletedNotification: string;
        cantSchedulePastTimeNotification: string;
        cantScheduleInvalidTimeNotification: string;
        cantSentNotificationWithInvalidToken: string;
        tagNameIsExist: string;
        tagNameIsEmpty: string;
        getBrightcoveProfileFail: string;
    }

    export interface ManabieError {
        specified: Specified;
        unknown: string;
        cannotUpload: string;
        uploadedFileIsInvalid: string;
        not_found: string;
    }

    export interface Action {
        delete: string;
        discard: string;
        dispose: string;
        upload: string;
        cancel: string;
        remove: string;
        save: string;
        viewResultQuestionnaire: string;
        downloadResultQuestionnaire: string;
        notifyUnread: string;
        filter: string;
    }

    export interface Common {
        action: Action;
        send: string;
        saveDraft: string;
        saveSchedule: string;
        editedSuccess: string;
        sendSuccess: string;
        createdSuccess: string;
        resendSuccess: string;
        deleteSuccess: string;
        discardMessage: string;
        disposeNotification: string;
        areYouSureWantToDiscardThisMessage: string;
        areYouSureWantToExitThisForm: string;
        resendFail: string;
        resendNotification: string;
        createdTagSuccess: string;
        addNewTag: string;
        addOptionPrefix: string;
        workInProgress: string;
    }
    export interface RootObject {
        message: Message;
        navigation: Navigation;
        notification: Notification;
        "manabie-error": ManabieError;
        common: Common;
    }
}
export interface ReactAdmin extends NsReactAdmin.RootObject {}
