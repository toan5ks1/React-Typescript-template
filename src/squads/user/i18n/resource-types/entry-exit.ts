declare module NsEntryExit {
    export interface EntryExitColumns {
        date: string;
        entryTime: string;
        exitTime: string;
        duration: string;
        action: string;
    }

    export interface EntryExitFormError {
        entryEarlierThanExit: string;
        exitTimeIsFuture: string;
        entryTimeIsFuture: string;
    }

    export interface EntryExitForm {
        addTitle: string;
        editTitle: string;
        notifyParents: string;
        error: EntryExitFormError;
    }

    export interface DeleteConfirm {
        title: string;
        message: string;
    }

    export interface RootObject {
        name: string;
        title: string;
        history: string;
        columns: EntryExitColumns;
        form: EntryExitForm;
        deleteConfirm: DeleteConfirm;
        downloadQrUrls: DownloadQrUrls;
    }

    export interface DownloadQrUrls {
        message: {
            success: string;
            failed: string;
        };
    }
}

export interface EntryExit extends NsEntryExit.RootObject {}
