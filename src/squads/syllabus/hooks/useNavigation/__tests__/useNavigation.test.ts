import useNavigation from "../useNavigation";

import { renderHook } from "@testing-library/react-hooks";

const mockUseHistory = jest.fn();
jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...originalModule,
        useHistory: () => mockUseHistory,
    };
});

describe(useNavigation.name, () => {
    it("should return history", () => {
        const {
            result: { current },
        } = renderHook(() => useNavigation());

        expect(current).toEqual(mockUseHistory);
    });
});
