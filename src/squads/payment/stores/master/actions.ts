import { ActionTypes, ImportMasterPayload, NsAction } from "./types";

export const MasterActions = {
    importMasterData(payload: ImportMasterPayload): NsAction.ImportMaster {
        return {
            type: ActionTypes.IMPORT_MASTER,
            payload,
        };
    },
};
