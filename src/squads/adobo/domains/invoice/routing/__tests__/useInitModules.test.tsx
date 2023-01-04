import useCheckFeatureAndPermissionFlag from "../useCheckFeatureAndPermissionFlag";
import useInitModules from "../useInitModules";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/squads/adobo/domains/invoice/routing/useCheckFeatureAndPermissionFlag", () =>
    jest.fn()
);

describe("useInitModules hook", () => {
    it("should return /invoice when useCheckFeatureAndPermissionFlag is true", () => {
        (useCheckFeatureAndPermissionFlag as jest.Mock<any>).mockImplementation(() => {
            return () => true;
        });
        const { result } = renderHook(() => useInitModules());

        expect(result.current).toMatchObject({
            routes: [
                {
                    path: "/invoice_management",
                    component: expect.anything(),
                },
            ],
        });
    });
    it("should not return /invoice when useCheckFeatureAndPermissionFlag is false", () => {
        (useCheckFeatureAndPermissionFlag as jest.Mock<any>).mockImplementation(() => {
            return () => false;
        });
        const { result } = renderHook(() => useInitModules());

        expect(result.current).toMatchObject({
            routes: [],
        });
    });
});
