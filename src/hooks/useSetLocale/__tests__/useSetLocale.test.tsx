import { TestApp } from "src/test-utils";

import useSetLocale from "../useSetLocale";

import { fireEvent, render, waitFor } from "@testing-library/react";
import useLocale from "src/hooks/useLocale";
import { LanguageEnums } from "src/typings/i18n-provider";

jest.mock("src/hooks/useShowSnackbar", () => jest.fn());

const TestingComponent = ({ lang }: { lang: LanguageEnums }) => {
    const setLocale = useSetLocale();
    const locale = useLocale();

    return (
        <div>
            <button onClick={() => setLocale(lang)}>Click me</button>
            <div>Current locale: {locale}</div>
        </div>
    );
};

describe("useSetLocale hook", () => {
    it("should be called with correct props", async () => {
        const wrapper = render(
            <TestApp>
                <TestingComponent lang={LanguageEnums.JA} />
            </TestApp>
        );
        const btn = wrapper.queryByText("Click me");

        expect(btn).toBeInTheDocument();
        fireEvent.click(btn!);

        await waitFor(() => {
            expect(wrapper.queryByText(`Current locale: ${LanguageEnums.JA}`)).toBeInTheDocument();
        });
    });
});
