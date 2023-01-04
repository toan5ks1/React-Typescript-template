import { mockWarner } from "src/squads/syllabus/test-utils/warner";

import polyglot, { getMessagesLanguage } from "../polyglot";

import { LanguageEnums } from "src/typings/i18n-provider";

describe("getMessagesLanguage", () => {
    it("should return lang collection base on lang passed", () => {
        const vi: object = require("../source/cms_vi.json");
        const ja: object = require("../source/cms_ja.json");
        const en: object = require("../source/cms_en.json");

        expect(getMessagesLanguage("vi")).toMatchObject(vi);
        expect(getMessagesLanguage("ja")).toMatchObject(ja);

        expect(getMessagesLanguage("en")).toMatchObject(en);

        //default case
        expect(getMessagesLanguage("")).toMatchObject(en);
    });
});

describe("polyglot", () => {
    const std = mockWarner();

    it("should call warner when input missing key to translate", () => {
        const missKey = "missing.key";
        const translatedLabel = polyglot(LanguageEnums.EN)(missKey);

        expect(translatedLabel).toEqual(missKey);
        expect(std.warn).toBeCalledWith(`[Missing translation]: ${missKey}`);
    });

    it("should not call warner when input existing key to translate", () => {
        const existingKey = "resources.input.error.required";
        const translatedLabel = polyglot(LanguageEnums.EN)(existingKey);

        expect(translatedLabel).toEqual("This field is required");
        expect(std.warn).not.toBeCalledWith(`[Missing translation]: ${existingKey}`);
    });
});
