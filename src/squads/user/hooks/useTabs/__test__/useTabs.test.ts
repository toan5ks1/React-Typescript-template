import { ChangeEvent } from "react";

import useTabs from "../useTabs";

import { act, renderHook } from "@testing-library/react-hooks";

const mockTabSearchURL: string = "TAB_SEARCH_URL";

jest.mock("src/common/helpers/helpers", () => {
    const actual = jest.requireActual("src/common/helpers/helpers");
    return {
        ...actual,
        get: jest.fn(),
    };
});
jest.mock("src/common/utils/query", () => {
    const actual = jest.requireActual("src/common/utils/query");
    return {
        ...actual,
        parseQuery: () => ({
            tab: mockTabSearchURL,
        }),
    };
});

jest.mock("src/internals/configuration", () => {
    const actual = jest.requireActual("src/internals/configuration");
    return {
        ...actual,
        getEndpoints: () => {
            return { OCR: "OCR" };
        },
        getCurrentPjOwner: jest.fn(actual.getCurrentPjOwner),
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
