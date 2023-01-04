import Configuration from "src/packages/configuration";
import reactiveStorage from "src/squads/syllabus/internals/reactive-storage";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";
import { PjOwner } from "src/squads/syllabus/typings/configuration";

import TranslationProvider from "../TranslationProvider";

import { render, act } from "@testing-library/react";
import polyglot from "src/squads/syllabus/i18n/polyglot";
import { LanguageEnums } from "src/squads/syllabus/typings/i18n-provider";

jest.mock("src/squads/syllabus/internals/reactive-storage", () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        registerListener: jest.fn(),
    },
}));

jest.mock("src/packages/configuration", () => ({
    __esModule: true,
    default: {
        getDefaultEnv: jest.fn(),
    },
}));

jest.mock("src/squads/syllabus/i18n/polyglot", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const renderUtil = () =>
    render(
        <TranslationProvider>
            <span>Child</span>
        </TranslationProvider>
    );

describe(TranslationProvider.name, () => {
    beforeEach(() => {
        (Configuration.getDefaultEnv as jest.Mock).mockReturnValue({ pjOwner: PjOwner.RENSEIKAI });
    });

    it("should set default language from storage", () => {
        const langInStorage = LanguageEnums.VI;
        (reactiveStorage.get as jest.Mock).mockReturnValue(langInStorage);

        renderUtil();

        expect(polyglot).toBeCalledWith(langInStorage);
    });

    it("should update polyglot when lang in storage change", () => {
        renderUtil();

        const [key, callbackListener] = getLatestCallParams(
            reactiveStorage.registerListener as jest.Mock
        );

        expect(polyglot).toBeCalledWith(LanguageEnums.JA);
        expect(key).toEqual("LANG");

        act(() => {
            callbackListener(LanguageEnums.EN);
        });

        expect(polyglot).toBeCalledTimes(2);
        expect(polyglot).toHaveBeenNthCalledWith(2, LanguageEnums.EN);
    });
});

describe(`${TranslationProvider.name} test for get lang by project owner when language from storage not found`, () => {
    beforeEach(() => {
        (reactiveStorage.get as jest.Mock).mockReturnValue(undefined);
    });

    it("should set default language is EN when project owner is manabie", () => {
        (Configuration.getDefaultEnv as jest.Mock).mockReturnValue({ pjOwner: PjOwner.MANABIE });

        renderUtil();
        expect(polyglot).toBeCalledWith(LanguageEnums.EN);
    });

    it("should set default language is JA when project owner is not manabie", () => {
        (Configuration.getDefaultEnv as jest.Mock).mockReturnValue({ pjOwner: PjOwner.RENSEIKAI });

        renderUtil();

        expect(polyglot).toBeCalledWith(LanguageEnums.JA);
    });
});
