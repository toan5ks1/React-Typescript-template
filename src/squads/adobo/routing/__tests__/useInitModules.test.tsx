import useCheckFeatureAndPermissionFlag from "../useCheckFeatureAndPermissionFlag";
import useInitModules from "../useInitModules";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/squads/adobo/domains/entry-exit/pages/scanner/EntryExitRouter", () => {
    return {
        __esModule: true,
        default: () => <div>EntryExitRouter</div>,
    };
});

jest.mock("src/squads/adobo/domains/invoice/pages/invoice-list/InvoiceManagementRouter", () => {
    return {
        __esModule: true,
        default: () => <div>InvoiceManagementRouter</div>,
    };
});

jest.mock("src/squads/adobo/routing/useCheckFeatureAndPermissionFlag", () => jest.fn());

describe("useInitModules hook", () => {
    it("should return /entry_exit when useCheckFeatureAndPermissionFlag is true", () => {
        (useCheckFeatureAndPermissionFlag as jest.Mock<any>).mockImplementation(() => {
            return () => true;
        });
        const { result } = renderHook(() => useInitModules());

        expect(result.current).toMatchObject({
            routes: [
                {
                    path: "/student_qr_scanner",
                    component: expect.anything(),
                },
                {
                    path: "/invoice_management",
                    component: expect.anything(),
                },
            ],
        });
    });
    it("should not return anything when useCheckFeatureAndPermissionFlag is false", () => {
        (useCheckFeatureAndPermissionFlag as jest.Mock<any>).mockImplementation(() => {
            return () => false;
        });
        const { result } = renderHook(() => useInitModules());

        expect(result.current).toMatchObject({
            routes: [],
        });
    });
});
