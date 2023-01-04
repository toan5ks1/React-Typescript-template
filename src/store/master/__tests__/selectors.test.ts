import { createMockMasterImportFile } from "src/squads/payment/test-utils/mocks/master";
import { createEmptyRootState } from "src/test-utils/root-state";

import { importedFilesSelector } from "../selectors";

const mockMaster = createMockMasterImportFile("1", true);

describe("importedFilesSelector", () => {
    it("should return imported files", () => {
        const state = createEmptyRootState({
            master: {
                fileImport: {
                    [mockMaster.id]: mockMaster,
                },
            },
        });

        expect(importedFilesSelector(state)).toEqual(Object.values(state.master.fileImport));
    });
});
