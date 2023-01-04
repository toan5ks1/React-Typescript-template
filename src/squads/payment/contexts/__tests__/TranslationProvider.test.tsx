import { act } from "react-dom/test-utils";
import { Entities } from "src/common/constants/enum";
import reactiveStorage from "src/squads/payment/internals/reactive-storage";

import TranslationProvider from "../TranslationProvider";

import { render } from "@testing-library/react";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import { LanguageEnums } from "src/squads/payment/typings/i18n-provider";

describe("<TranslationProvider />", () => {
    const ChildComponent = () => {
        const tOrder = useResourceTranslate(Entities.ORDERS);

        return <div>{tOrder("name")}</div>;
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
                Order Management
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
                オーダー管理
              </div>
            </div>
        `);
    });
});
