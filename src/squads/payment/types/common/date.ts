export interface DateCommon {
    date: string | Date | number;
}

export type FormatDateOptions =
    | "HH"
    | "mm"
    | "HH:mm"
    | "LL"
    | "yyyy/LL/dd"
    | "yyyy/LL/dd, HH:mm"
    | "cccc"
    | "yyyy/LL/dd, cccc"
    | "LL/dd"
    | "LL/dd, HH:mm"
    | "yyyy/LL"
    | "LLL"
    | "yyyyLLdd";
