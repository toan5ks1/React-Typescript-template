import { ERPModules } from "src/common/constants/enum";
import reactiveStorage from "src/squads/user/internals/reactive-storage";

import TranslationProvider from "../TranslationProvider";

import { render, act, screen } from "@testing-library/react";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import { LanguageEnums } from "src/squads/user/typings/i18n-provider";

describe("<TranslationProvider/>", () => {
    const ChildComponent = () => {
        const tStudent = useResourceTranslate(ERPModules.STUDENTS);
        return <div>{tStudent("titles.studentManagement")}</div>;
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
        expect(screen.getByText("Student Management")).toBeInTheDocument();
    });
    it(`should match to snapshot and render correctly when change form lang = ${LanguageEnums.EN} to lang = ${LanguageEnums.JA}`, () => {
        const { container, rerender } = renderComponent();
        expect(screen.getByText("Student Management")).toBeInTheDocument();

        act(() => {
            reactiveStorage.set("LANG", LanguageEnums.JA);
        });

        rerender(
            <TranslationProvider>
                <ChildComponent />
            </TranslationProvider>
        );
        expect(screen.getByText("生徒管理")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
