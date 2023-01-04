import reactiveStorage from "src/squads/timesheet/internals/reactive-storage";

import TranslationProvider from "../TranslationProvider";

import { render, act, screen } from "@testing-library/react";
import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";
import { LanguageEnums } from "src/squads/timesheet/typings/i18n-provider";

// TODO: update when have translation
describe("<TranslationProvider/>", () => {
    const ChildComponent = () => {
        const tCommon = useResourceTranslate("common");
        return <div>{tCommon("name")}</div>;
    };
    const renderComponent = () => {
        return render(
            <TranslationProvider>
                <ChildComponent />
            </TranslationProvider>
        );
    };
    afterEach(() => {
        reactiveStorage.clear();
    });
    it(`should match to snapshot and render correctly lang = ${LanguageEnums.EN}`, () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
        expect(screen.getByText("Name")).toBeInTheDocument();
    });
    it(`should match to snapshot and render correctly when change form lang = ${LanguageEnums.EN} to lang = ${LanguageEnums.JA}`, () => {
        const { container, rerender } = renderComponent();
        expect(screen.getByText("Name")).toBeInTheDocument();

        act(() => {
            reactiveStorage.set("LANG", LanguageEnums.JA);
        });

        rerender(
            <TranslationProvider>
                <ChildComponent />
            </TranslationProvider>
        );
        expect(screen.getByText("名前")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
