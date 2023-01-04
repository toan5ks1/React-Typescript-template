import { ReactNode } from "react";

import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import { render, RenderResult, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useLocale from "src/squads/user/hooks/useLocale";
import useSetLocale from "src/squads/user/hooks/useSetLocale";
import { LanguageEnums } from "src/squads/user/typings/i18n-provider";

type WithTranslateProviderByLocaleReturn = {
    wrapper: RenderResult;
    changeLocale: () => Promise<void>;
};

export const withTranslateProviderByLocale = (props: {
    lang: LanguageEnums;
    children: ReactNode;
}): WithTranslateProviderByLocaleReturn => {
    const { lang, children } = props;

    const LocaleSwitchButton = () => {
        const locale = useLocale();
        const setLocale = useSetLocale();

        return (
            <>
                <button onClick={() => setLocale(lang)} data-testid="LocaleSwitchButton"></button>
                <p>{`Current locale: ${locale}`}</p>
            </>
        );
    };

    const wrapper = render(
        <TestCommonAppProvider>
            <LocaleSwitchButton />
            {children}
        </TestCommonAppProvider>
    );

    const changeLocale = async () => {
        const changeLocaleButton = wrapper.getByTestId("LocaleSwitchButton");
        userEvent.click(changeLocaleButton);

        await waitFor(() => expect(wrapper.getByText(`Current locale: ${lang}`)).toBeVisible());
    };

    return {
        wrapper,
        changeLocale,
    };
};
