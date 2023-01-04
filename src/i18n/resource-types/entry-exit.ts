declare module NsEntryExit {
    export interface RootObject {
        name: string;
        dismiss: string;
        allowCameraHeader: string;
        allowCameraText: string;
        message: {
            title: string;
            welcome: string;
            goodbye: string;
            exit: string;
            entry: string;
            scanLimit: string;
            invalid: string;
            permissionFail: string;
            error: string;
        };
    }
}

export interface EntryExit extends NsEntryExit.RootObject {}
