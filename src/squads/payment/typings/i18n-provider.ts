import { InterpolationOptions } from "node-polyglot";

export type Translate = (key: string, options?: number | InterpolationOptions) => string;

export type I18nProvider = {
    translate: Translate;
    changeLocale: (locale: string, options?: number | InterpolationOptions) => Promise<void>;
    getLocale: () => LanguageEnums;
    [key: string]: any;
};

export enum LanguageEnums {
    VI = "vi",
    EN = "en",
    JA = "ja",
}

export type LanguageKeys = keyof typeof LanguageEnums;
