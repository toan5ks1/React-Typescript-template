import { unparse as convertToCSV } from "papaparse";
import { FileType } from "src/squads/communication/common/constants/enum";
import { Array2D } from "src/squads/communication/common/constants/types";

type ObjectUrl = Parameters<typeof URL.createObjectURL>[0];

export function createCsvFile(content: Array2D<string>, headers: Array<string>): Blob {
    const MIMEType = "text/csv";
    const csv = convertToCSV<Array<string>>([headers, ...content]);

    return new Blob([csv], { type: MIMEType });
}

export function handleDownloadFile(fileObject: ObjectUrl, fileName: string, fileType: FileType) {
    const url = URL.createObjectURL(fileObject);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${fileName}.${fileType}`;

    link.click();
    link.remove();
}
