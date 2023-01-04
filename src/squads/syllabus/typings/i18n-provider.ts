import { InterpolationOptions } from "node-polyglot";

export type Translate = (key: string, options?: number | InterpolationOptions) => string;

export enum LanguageEnums {
    VI = "vi",
    EN = "en",
    JA = "ja",
}
