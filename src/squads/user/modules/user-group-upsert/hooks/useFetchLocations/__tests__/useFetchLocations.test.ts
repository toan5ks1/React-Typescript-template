import { inferStandaloneQuery } from "src/squads/user/service/infer-service";

import useFetchLocations from "../useFetchLocations";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";

jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferStandaloneQuery: jest.fn(),
}));
jest.mock("src/squads/user/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("useFetchLocations", () => {
    it("should return correct data", async () => {
        const showSnackbar = jest.fn();
        (inferStandaloneQuery as jest.Mock).mockImplementation(() => () => {
            return [];
        });

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        const {
            result: { current },
            waitForNextUpdate,
        } = renderHook(() => useFetchLocations());

        await waitForNextUpdate();

        expect(inferStandaloneQuery).toBeCalledTimes(1);

        expect(current.leafLocations).toMatchObject([]);

        expect(current.treeLocations).toMatchObject({
            locationId: "",
            name: "",
            locationType: "",
            parentLocationId: "",
            accessPath: "",
        });
    });
});
