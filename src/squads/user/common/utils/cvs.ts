import { parse } from "papaparse";
import { errorCodesMap } from "src/common/utils/error";
import { arrayHasItem } from "src/common/utils/other";

interface DownloadCsvFromBase64Props {
    data: string | Uint8Array;
    nameFile: string;
}

export const downloadCsvFromBase64 = (props: DownloadCsvFromBase64Props) => {
    const { data, nameFile } = props;
    if (typeof data == "string") {
        //convert 1
        const csvContent = window.atob(data);
        //convert 2
        const finalCsv = window.atob(csvContent);

        const blob = new Blob([finalCsv], { type: "data:application/octet-stream;base64" });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${nameFile}.csv`;
        link.click();
        return;
    }
    throw new Error(errorCodesMap.INVALID_PARAMS);
};

export const convertFileToCSV = async (file: File) => {
    return new Promise((resolve, reject) => {
        parse(file, {
            complete: (result) => {
                if (arrayHasItem(result.errors)) {
                    reject(result.errors);
                    return;
                }
                resolve(result.data);
            },
            error: (err) => {
                reject(err);
            },
        });
    });
};
