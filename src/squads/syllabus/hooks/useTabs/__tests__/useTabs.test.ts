import { ChangeEvent } from "react";

import { act, renderHook } from "@testing-library/react-hooks";
import useTabs from "src/squads/syllabus/hooks/useTabs";

const mockTabSearchURL: string = "TAB_SEARCH_URL";

jest.mock("src/squads/syllabus/common/utils/url", () => {
    const actual = jest.requireActual("src/squads/syllabus/common/utils/url");
    return {
        ...actual,
        parseQuery: () => ({
            tab: mockTabSearchURL,
        }),
    };
});

describe("useTabs", () => {
    it("should initial default tab", () => {
        const defaultTab = "DEFAULT_TAB";
        const { result } = renderHook(() => useTabs<string>(defaultTab));

        expect(result.current.currentTab).toEqual(defaultTab);
    });

    it("should initial tab from URL", () => {
        const { result } = renderHook(() => useTabs<string>());

        expect(result.current.currentTab).toEqual(mockTabSearchURL);
    });

    it("should change tab correct", () => {
        const defaultTab = "DEFAULT_TAB";
        const nextTab = "NEXT_TAB";
        const { result } = renderHook(() => useTabs<string>(defaultTab));

        act(() => result.current.handleChangeCurrentTabForTabBase({} as ChangeEvent<{}>, nextTab));

        expect(result.current.currentTab).toEqual(nextTab);
    });
});
