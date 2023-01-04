import { MasterActions } from "src/squads/payment/stores/master/actions";
import { ActionTypes, ImportMasterPayload } from "src/squads/payment/stores/master/types";
import { createMockMasterImportFile } from "src/squads/payment/test-utils/mocks/master";

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
