import { createMockMasterImportFile } from "src/squads/payment/test-utils/mocks/master";

import { MasterActions } from "../actions";
import { ActionTypes, ImportMasterPayload } from "../types";

const mockFile = createMockMasterImportFile().file;

describe("MasterActions", () => {
    test(MasterActions.importMasterData.name, () => {
        const payload: ImportMasterPayload = {
            file: mockFile,
            isImporting: true,
        };

        expect(MasterActions.importMasterData(payload)).toEqual({
            type: ActionTypes.IMPORT_MASTER,
            payload,
        });
    });
});
