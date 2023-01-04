import { act } from "react-dom/test-utils";
import { Entities } from "src/common/constants/enum";
import reactiveStorage from "src/squads/adobo/domains/entry-exit/internals/reactive-storage";

import TranslationProvider from "../TranslationProvider";

import { render } from "@testing-library/react";
import useResourceTranslate from "src/squads/adobo/domains/entry-exit/hooks/useResourceTranslate";
import { LanguageEnums } from "src/squads/adobo/domains/entry-exit/typings/i18n-provider";

describe("<TranslationProvider />", () => {
    const ChildComponent = () => {
        const tEntryExit = useResourceTranslate(Entities.ENTRY_EXIT);

        return <div>{tEntryExit("name")}</div>;
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

        expect(container.textContent).toContain("QR Code Scanner");

        act(() => {
            reactiveStorage.set("LANG", LanguageEnums.JA);
        });

        rerender(
            <TranslationProvider>
                <ChildComponent />
            </TranslationProvider>
        );

        expect(container.textContent).toContain("QRコード読取り");
    });
});
