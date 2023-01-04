import useGoBack from "../useGoBack";

import { renderHook, act } from "@testing-library/react-hooks";

const mockPush = jest.fn();
jest.mock("react-router", () => ({
    __esModule: true,
    useHistory: () => ({
        push: mockPush,
    }),
}));
jest.mock("react-redux", () => ({
    __esModule: true,
    useSelector: jest.fn(),
}));
describe("useRedirect hook", () => {
    it("should it call push function", () => {
        const { result } = renderHook(() => useGoBack());
        act(() => result.current());
        expect(mockPush).toHaveBeenCalledTimes(1);
    });
});
