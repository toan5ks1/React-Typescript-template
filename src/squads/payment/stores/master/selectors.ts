import { createSelector } from "reselect";

import { RootState } from "../store-types";

export const importedFilesSelector = createSelector(
    ({ master }: RootState) => master.fileImport,
    (files) => Object.values(files).filter((file) => file.isImporting)
);
