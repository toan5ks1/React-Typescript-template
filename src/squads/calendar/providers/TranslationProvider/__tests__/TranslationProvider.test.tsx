import { act } from "react-dom/test-utils";
import { ERPModules } from "src/common/constants/enum";
import reactiveStorage from "src/squads/calendar/internals/reactive-storage";

import TranslationProvider from "src/squads/calendar/providers/TranslationProvider";

import { render } from "@testing-library/react";
import useResourceTranslate from "src/squads/calendar/hooks/useResourceTranslate";
import { LanguageEnums } from "src/squads/calendar/typings/i18n-provider";

describe("<TranslationProvider />", () => {
    const ChildComponent = () => {
        const tCalendar = useResourceTranslate(ERPModules.SCHEDULE);

        return <div>{tCalendar("name")}</div>;
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
                Calendar
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
                カレンダー
              </div>
            </div>
        `);
    });
});
