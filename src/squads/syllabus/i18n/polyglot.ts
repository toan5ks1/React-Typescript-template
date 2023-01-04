import Polyglot from "node-polyglot";

// TODO: lazy load translation
import en from "./source/cms_en.json";
import ja from "./source/cms_ja.json";
import vi from "./source/cms_vi.json";
import TranslationKeys from "./types";

import { LanguageEnums } from "src/squads/syllabus/typings/i18n-provider";

const sources = {
    [LanguageEnums.EN]: en,
    [LanguageEnums.VI]: vi,
    [LanguageEnums.JA]: ja,
};

export const getMessagesLanguage = (name: string): TranslationKeys => {
    const result = sources[name];

    if (result) return result;

    return sources[LanguageEnums.EN];
};

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

    return polyglot.t.bind(polyglot);
};

const polyglot = (locale: LanguageEnums) => {
    const messages = getMessagesLanguage(locale);

    if (messages instanceof Promise) {
        const errMsg = `The i18nProvider returned a Promise for the messages of the default locale (${locale}).
        Please update your i18nProvider to return the messages of the default locale in a synchronous way.`;

        throw new Error(errMsg);
    }

    return setPolyglot({ messages, locale });
};

export default polyglot;
