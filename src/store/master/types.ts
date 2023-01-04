export interface ImportMasterPayload {
    file: File;
    isImporting: boolean;
}

export enum ActionTypes {
    IMPORT_MASTER = "IMPORT_MASTER",
}

export declare namespace NsAction {
    interface ImportMaster {
        type: ActionTypes;
        payload: ImportMasterPayload;
    }
}

export type MasterActions = NsAction.ImportMaster;

export interface FileImportMaster extends ImportMasterPayload {
    id: string;
}

export interface MasterState {
    fileImport: {
        [id: string]: FileImportMaster;
    };
}
