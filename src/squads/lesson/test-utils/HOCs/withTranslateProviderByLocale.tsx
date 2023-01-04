import { ReactNode } from "react";

import { render, RenderResult, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useLocale from "src/squads/lesson/hooks/useLocale";
import useSetLocale from "src/squads/lesson/hooks/useSetLocale";
import TestApp from "src/squads/lesson/test-utils/TestApp";
import { LanguageEnums } from "src/squads/lesson/typings/i18n-provider";

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
        <TestApp>
            <LocaleSwitchButton />
            {children}
        </TestApp>
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
