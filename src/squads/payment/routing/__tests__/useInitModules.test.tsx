import { rawRoutes } from "../routings";
import useCheckFeatureAndPermissionFlag from "../useCheckFeatureAndPermissionFlag";
import useInitModules from "../useInitModules";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/squads/payment/domains/OrderManagement/OrderManagementRouter", () => {
    return {
        __esModule: true,
        default: () => <div>OrderManagementRouter</div>,
    };
});

jest.mock("src/squads/payment/routing/useCheckFeatureAndPermissionFlag", () => jest.fn());

describe("useInitModules hook", () => {
    it("should return /orders when useCheckFeatureAndPermissionFlag is true", () => {
        (useCheckFeatureAndPermissionFlag as jest.Mock<any>).mockImplementation(() => {
            return () => true;
        });
        const { result } = renderHook(() => useInitModules());

        expect(result.current).toMatchObject({
            routes: rawRoutes,
        });
    });
    it("should not return /orders when useCheckFeatureAndPermissionFlag is false", () => {
        (useCheckFeatureAndPermissionFlag as jest.Mock<any>).mockImplementation(() => {
            return () => false;
        });
        const { result } = renderHook(() => useInitModules());

        expect(result.current).toMatchObject({
            routes: [],
        });
    });
});
