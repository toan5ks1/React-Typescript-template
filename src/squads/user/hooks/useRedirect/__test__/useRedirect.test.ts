// import { useHistory } from "react-router";
import useRedirect from "../useRedirect";

const mockUseHistory = jest.fn();
jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    __esModule: true,
    useHistory: () => mockUseHistory(),
}));
describe("useRedirect hook", () => {
    it("should it call useHistory", () => {
        useRedirect();
        expect(mockUseHistory).toHaveBeenCalledTimes(1);
    });
});
