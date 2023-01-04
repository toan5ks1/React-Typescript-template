import { Entities, MIMETypes } from "src/common/constants/enum";

import { generateFiles } from "./file";

export const createMockCSVFiles = (count: number = 1) => {
    const fileSchemas = Array.from(Array(count), (_, i) => i + 1).map((number) => ({
        size: 300 * number,
        fileProperty: {
            type: MIMETypes.CSV,
        },
    }));

    return generateFiles(fileSchemas);
};

export const createMockMasterImportFile = (id: string = "1", isImporting: boolean = false) => {
    const file = createMockCSVFiles()[0];
    return {
        id: `${Entities.MASTERS}_${id}}`,
        file,
        isImporting,
    };
};
