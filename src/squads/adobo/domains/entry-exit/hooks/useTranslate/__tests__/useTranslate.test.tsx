import { render } from "@testing-library/react";
import { useTranslationContext } from "src/squads/adobo/domains/entry-exit/contexts/TranslationContext";
import useTranslate from "src/squads/adobo/domains/entry-exit/hooks/useTranslate";
import TestApp from "src/squads/adobo/domains/entry-exit/test-utils/TestApp";

jest.mock("src/squads/adobo/domains/entry-exit/contexts/TranslationContext", () => {
    const originalModule = jest.requireActual(
        "src/squads/adobo/domains/entry-exit/contexts/TranslationContext"
    );

    return {
        __esModule: true,
        ...originalModule,
        useTranslationContext: jest.fn(),
    };
});

const TranslateComponent = ({ keyTrans }: { keyTrans: string }) => {
    const t = useTranslate();
    return <div>{t(keyTrans, { param: 1 }, { lowercase: true })}</div>;
};

const Component = ({ keyTrans }: { keyTrans: string }) => {
    return (
        <TestApp>
            <TranslateComponent keyTrans={keyTrans} />
        </TestApp>
    );
};

describe("useTranslate", () => {
    it("should translate correctly", () => {
        const translateFunc = jest.fn();
        (useTranslationContext as jest.Mock).mockImplementation(() => ({
            i18nProvider: {
                translate: translateFunc,
            },
        }));

        render(<Component keyTrans="key" />);
        expect(translateFunc).toBeCalledWith("key", { param: 1 });
    });
});
