import { inferStandaloneQuery } from "src/squads/user/service/infer-service";
import { userGroupsManyReference } from "src/squads/user/test-utils/mocks/staff";

import useUserGroupsList from "../useUserGroupsList";

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

jest.mock("react-hook-form", () => ({
    ...jest.requireActual("react-hook-form"),
    useFormContext: () => ({
        setValues: () => jest.fn(),
    }),
}));

describe("useUserGroupsList", () => {
    const showSnackbar = jest.fn();

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should return correct user groups list", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(() => () => userGroupsManyReference);

        const { waitForNextUpdate, result } = renderHook(() => useUserGroupsList());

        await waitForNextUpdate();
        expect(inferStandaloneQuery).toBeCalledTimes(1);
        expect(result.current.loading).toBe(false);
        expect(result.current.options).toEqual(userGroupsManyReference);
    });

    it("should show snackbar error if there is an exception", () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(() => () => {
            throw Error("error");
        });

        const { result } = renderHook(() => useUserGroupsList());

        expect(inferStandaloneQuery).toBeCalledTimes(1);
        expect(result.current.loading).toBe(false);
        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData userGroups - userUserGroupGetManyReference",
            "error"
        );
    });
});
