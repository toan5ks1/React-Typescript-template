import useCheckFeatureAndPermissionFlag from "../useCheckFeatureAndPermissionFlag";
import useInitModules from "../useInitModules";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/internals/permission", () => {
    const originalModule = jest.requireActual("src/internals/permission");
    return {
        ...originalModule,
        can: () => true,
    };
});

jest.mock("src/squads/user/hooks/useFeatureController");

jest.mock("src/squads/user/routing/useCheckFeatureAndPermissionFlag", () => jest.fn());
jest.mock("src/squads/user/routing/routings.ts");

describe("useInitModules hook", () => {
    it("should return /notifications when useCheckFeatureAndPermissionFlag is true", () => {
        (useCheckFeatureAndPermissionFlag as jest.Mock).mockImplementation(
            (): ReturnType<typeof useCheckFeatureAndPermissionFlag> => {
                return () => true;
            }
        );
        const { result } = renderHook(() => useInitModules());

        expect(result.current).toMatchObject({
            routes: [
                {
                    permissionConfigs: {
                        subject: "student_erp",
                        action: "SHOW",
                    },
                    viteRoutes: [
                        {
                            path: "/user/student_erp",
                            component: expect.anything(),
                        },
                    ],
                },
            ],
        });
    });
    it("should not return /notifications when useCheckFeatureAndPermissionFlag is false", () => {
        (useCheckFeatureAndPermissionFlag as jest.Mock).mockImplementation(
            (): ReturnType<typeof useCheckFeatureAndPermissionFlag> => {
                return () => false;
            }
        );
        const { result } = renderHook(() => useInitModules());

        expect(result.current).toMatchObject({
            routes: [],
        });
    });
});
