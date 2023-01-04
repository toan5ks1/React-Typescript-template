import { MasterActions } from "src/squads/payment/stores/master/actions";
import reducer, { initialState } from "src/squads/payment/stores/master/reducer";
import { ActionTypes } from "src/squads/payment/stores/master/types";
import { createMockMasterImportFile } from "src/squads/payment/test-utils/mocks/master";

const mockMasterFile = createMockMasterImportFile().file;

describe("MasterReducer", () => {
    test(ActionTypes.IMPORT_MASTER, () => {
        // Not imported yet
        let state = reducer(
            undefined,
            MasterActions.importMasterData({ file: mockMasterFile, isImporting: false })
        );
        expect(state.fileImport[mockMasterFile.name].file).toEqual(mockMasterFile);
        expect(state.fileImport[mockMasterFile.name].isImporting).toEqual(false);

        // Importing
        state = reducer(
            initialState,
            MasterActions.importMasterData({
                file: mockMasterFile,
                isImporting: true,
            })
        );

        expect(state.fileImport[mockMasterFile.name].file).toEqual(mockMasterFile);
        expect(state.fileImport[mockMasterFile.name].isImporting).toEqual(true);

        // Finish Importing
        state = reducer(
            initialState,
            MasterActions.importMasterData({
                file: mockMasterFile,
                isImporting: false,
            })
        );
        expect(state.fileImport[mockMasterFile.name].file).toEqual(mockMasterFile);
        expect(state.fileImport[mockMasterFile.name].isImporting).toEqual(false);
    });
});
