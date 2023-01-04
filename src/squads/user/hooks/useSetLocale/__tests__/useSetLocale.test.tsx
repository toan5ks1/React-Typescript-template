import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import useSetLocale from "../useSetLocale";

import { fireEvent, render, waitFor } from "@testing-library/react";
import useLocale from "src/squads/user/hooks/useLocale";
import { LanguageEnums } from "src/squads/user/typings/i18n-provider";

jest.mock("src/squads/user/hooks/useShowSnackbar", () => jest.fn());

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
            <TestCommonAppProvider>
                <TestingComponent lang={LanguageEnums.JA} />
            </TestCommonAppProvider>
        );
        const btn = wrapper.queryByText("Click me");

        expect(btn).toBeInTheDocument();
        fireEvent.click(btn!);

        await waitFor(() => {
            expect(wrapper.queryByText(`Current locale: ${LanguageEnums.JA}`)).toBeInTheDocument();
        });
    });
});
