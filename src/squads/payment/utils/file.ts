import { parse } from "papaparse";
import { arrayHasItem } from "src/common/utils/other";

export async function parseCSVFile<T>(file: File): Promise<T[]> {
    return new Promise((resolve, reject) => {
        parse(file, {
            header: true,
            transform: (fielValue) => {
                return fielValue.trim();
            },
            complete: (result) => {
                if (arrayHasItem(result.errors)) {
                    reject(result.errors);
                    return;
                }

                resolve(result.data as T[]);
            },
            error: (err) => {
                reject(err);
            },
        });
    });
}
