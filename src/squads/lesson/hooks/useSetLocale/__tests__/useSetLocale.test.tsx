import { TestApp } from "src/squads/lesson/test-utils";

import { fireEvent, render, waitFor } from "@testing-library/react";
import { useTranslationContext } from "src/squads/lesson/contexts/TranslationContext";
import useSetLocale from "src/squads/lesson/hooks/useSetLocale";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import { LanguageEnums } from "src/squads/lesson/typings/i18n-provider";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/lesson/hooks/useTranslate", () => ({
    __esModule: true,
    default: () => (translateKey: string) => translateKey,
}));

jest.mock("src/squads/lesson/contexts/TranslationContext", () => {
    const originalModule = jest.requireActual("src/squads/lesson/contexts/TranslationContext");

    return {
        __esModule: true,
        ...originalModule,
        useTranslationContext: jest.fn(),
    };
});

const TestingComponent = ({ lang }: { lang: LanguageEnums }) => {
    const setLocale = useSetLocale();
    return <button onClick={() => setLocale(lang)}>Click me</button>;
};

describe("useSetLocale hook", () => {
    it("should be called with correct props", async () => {
        const changeLocale = jest.fn();
        const setLocale = jest.fn();

        (useTranslationContext as jest.Mock).mockImplementation(() => ({
            setLocale,
            i18nProvider: {
                changeLocale,
            },
        }));

        const wrapper = render(
            <TestApp>
                <TestingComponent lang={LanguageEnums.JA} />
            </TestApp>
        );
        const btn = wrapper.queryByText("Click me");

        expect(btn).toBeInTheDocument();
        fireEvent.click(btn!);

        await waitFor(() => {
            expect(setLocale).toBeCalledWith(LanguageEnums.JA);
        });

        await waitFor(() => {
            expect(changeLocale).toBeCalledWith(LanguageEnums.JA);
        });
    });

    it("should show error when catch error in provider i18n", async () => {
        (useTranslationContext as jest.Mock).mockImplementation(() => ({
            setLocale: jest.fn(),
            i18nProvider: {
                changeLocale: {},
            },
        }));
        const showSnackbar = jest.fn();
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const wrapper = render(
            <TestApp>
                <TestingComponent lang={LanguageEnums.JA} />
            </TestApp>
        );
        const btn = wrapper.queryByText("Click me");

        expect(btn).toBeInTheDocument();
        fireEvent.click(btn!);

        await waitFor(() => {
            expect(showSnackbar).toBeCalledWith("ra.notification.i18n_error", "error");
        });
    });
});
