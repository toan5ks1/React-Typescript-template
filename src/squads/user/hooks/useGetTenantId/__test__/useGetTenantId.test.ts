import { inferStandaloneQuery } from "src/squads/user/service/infer-service";

import useGetTenantId from "../useGetTenantId";

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

describe("useGetTenantId", () => {
    const showSnackbar = jest.fn();

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should return correct tenant id data if have data", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(() => () => [
            {
                tenant_id: "id_01",
                domain_name: "name_01",
            },
        ]);

        const {
            result: { current },
        } = renderHook(() => useGetTenantId());

        const tenantId = await current.getTenantIdByTenantName("name_01");

        expect(tenantId).toEqual("id_01");
    });

    it("should show snackbar if have no Data", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(() => () => []);

        const {
            result: { current },
        } = renderHook(() => useGetTenantId());

        await current.getTenantIdByTenantName("name_01");
        expect(showSnackbar).toBeCalledWith(
            "ra.manabie-error.specified.organization_not_found",
            "error"
        );
    });
});
