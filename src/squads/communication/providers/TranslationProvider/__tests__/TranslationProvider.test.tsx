import { act } from "react-dom/test-utils";
import { ERPModules } from "src/common/constants/enum";
import reactiveStorage from "src/squads/communication/internals/reactive-storage";

import TranslationProvider from "../TranslationProvider";

import { render } from "@testing-library/react";
import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import { LanguageEnums } from "src/squads/communication/typings/i18n-provider";

describe("<TranslationProvider />", () => {
    const ChildComponent = () => {
        const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);

        return <div>{tNotification("title.notification")}</div>;
    };

    afterEach(() => {
        reactiveStorage.clear();
    });

    it("should render correct when changing language", () => {
        const { container, rerender } = render(
            <TranslationProvider>
                <ChildComponent />
            </TranslationProvider>
        );

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div>
                Notification
              </div>
            </div>
        `);

        act(() => {
            reactiveStorage.set("LANG", LanguageEnums.JA);
        });

        rerender(
            <TranslationProvider>
                <ChildComponent />
            </TranslationProvider>
        );

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div>
                お知らせ
              </div>
            </div>
        `);
    });
});
