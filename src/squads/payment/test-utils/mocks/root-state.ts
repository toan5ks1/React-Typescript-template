import { RootState } from "src/squads/payment/stores/store-types";

import { createMockMasterImportFile } from "./master";

const mockMasterFile = createMockMasterImportFile();

export function createEmptyRootState(override?: Partial<RootState>): RootState {
    return {
        router: {},
        snackbar: { open: false, message: "" },
        master: {
            fileImport: {
                "1": mockMasterFile,
            },
        },
        ...override,
    };
}
