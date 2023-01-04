import useCheckFeatureAndPermissionFlag from "../useCheckFeatureAndPermissionFlag";
import useInitModules from "../useInitModules";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/squads/timesheet/internals/permission", () => {
    const originalModule = jest.requireActual("src/squads/timesheet/internals/permission");
    return {
        ...originalModule,
        can: () => true,
    };
});

jest.mock("src/squads/timesheet/hooks/useFeatureController");

jest.mock("src/squads/timesheet/routing/useCheckFeatureAndPermissionFlag", () => jest.fn());
jest.mock("src/squads/timesheet/routing/routings.ts");

describe("useInitModules hook", () => {
    it("should return /timesheet_management when useCheckFeatureAndPermissionFlag is true", () => {
        (useCheckFeatureAndPermissionFlag as jest.Mock<any>).mockImplementation(() => {
            return () => true;
        });
        const { result } = renderHook(() => useInitModules());

        expect(result.current).toMatchObject({
            routes: [
                {
                    permissionConfigs: {
                        subject: "timesheet_management",
                        action: "SHOW",
                    },
                    viteRoutes: [
                        {
                            path: "/timesheet/timesheet_management",
                            component: expect.anything(),
                        },
                    ],
                },
            ],
        });
    });
    it("should not return /timesheet_management when useCheckFeatureAndPermissionFlag is false", () => {
        (useCheckFeatureAndPermissionFlag as jest.Mock<any>).mockImplementation(() => {
            return () => false;
        });
        const { result } = renderHook(() => useInitModules());

        expect(result.current).toMatchObject({
            routes: [],
        });
    });
});
