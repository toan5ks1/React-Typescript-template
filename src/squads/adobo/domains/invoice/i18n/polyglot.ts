import Polyglot from "node-polyglot";
import appConfigs from "src/internals/configuration";
import reactiveStorage from "src/squads/adobo/domains/invoice/internals/reactive-storage";
import { PjOwner } from "src/squads/adobo/domains/invoice/typings/configuration";

// TODO: lazy load translation
import en from "./source/cms_en.json";
import ja from "./source/cms_ja.json";
import vi from "./source/cms_vi.json";
import TranslationKeys from "./types";

import {
    I18nProvider,
    LanguageEnums,
} from "src/squads/adobo/domains/invoice/typings/i18n-provider";

const isManabie = appConfigs?.getCurrentPjOwner() === PjOwner.MANABIE;

const sources = {
    [LanguageEnums.EN]: en,
    [LanguageEnums.VI]: vi,
    [LanguageEnums.JA]: ja,
};

export const getMessagesLanguage = (name: string = LanguageEnums.EN): TranslationKeys => {
    const result = sources[name];
    if (result) {
        return result;
    }

    return sources[LanguageEnums.EN];
};

const defaultLanguage = isManabie ? LanguageEnums.EN : LanguageEnums.JA;

const setPolyglot = ({
    messages,
    locale,
}: {
    messages: TranslationKeys;
    locale: LanguageEnums;
}) => {
    const polyglot = new Polyglot({
        locale,
        phrases: { ...messages },
        allowMissing: true,
        pluralRules: {
            pluralTypes: {
                manabieLike: function (n: number | string) {
                    if (typeof n === "string" && n) return 1;
                    if (typeof n === "number" && n === 2) return 1;
                    return 0;
                },
            },
            pluralTypeToLanguages: {
                manabieLike: Object.values(LanguageEnums),
            },
        },
        onMissingKey: (key: string) => {
            window.warner?.warn(`[Missing translation]: ${key}`);
            return key;
        },
    });
    let translate = polyglot.t.bind(polyglot);

    return translate;
};

const polyglot = (): I18nProvider => {
    let locale = reactiveStorage.get("LANG") || defaultLanguage;
    const messages = getMessagesLanguage(locale);

    if (messages instanceof Promise) {
        throw new Error(
            `The i18nProvider returned a Promise for the messages of the default locale (${locale}). Please update your i18nProvider to return the messages of the default locale in a synchronous way.`
        );
    }

    let translate = setPolyglot({ messages, locale });
    return {
        translate: (key: string, options?: number | Polyglot.InterpolationOptions) => {
            const msg = translate(key, options);
            return msg;
        },
        changeLocale: (newLocale: LanguageEnums) => {
            // We systematically return a Promise for the messages because
            // getMessages may return a Promise
            return Promise.resolve(getMessagesLanguage(newLocale)).then(
                (messages: TranslationKeys) => {
                    translate = setPolyglot({ messages, locale: newLocale });
                }
            );
        },
        getLocale: () => locale,
    };
};

export default polyglot;
