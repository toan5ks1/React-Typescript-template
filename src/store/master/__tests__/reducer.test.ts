import { createMockMasterImportFile } from "src/squads/payment/test-utils/mocks/master";

import { MasterActions } from "../actions";
import reducer, { initialState } from "../reducer";
import { ActionTypes } from "../types";

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
