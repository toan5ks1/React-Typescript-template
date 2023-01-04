import { Features } from "src/common/constants/enum";

import { renderHook } from "@testing-library/react-hooks";
import useCheckFeatureAndPermissionFlag from "src/squads/calendar/routing/useCheckFeatureAndPermissionFlag";
import useInitModules from "src/squads/calendar/routing/useInitModules";

jest.mock("src/squads/calendar/domains/Calendar/CalendarRouter", () => {
    return {
        __esModule: true,
        default: () => <div>CalendarRouter</div>,
    };
});

jest.mock("src/squads/calendar/routing/useCheckFeatureAndPermissionFlag", () => jest.fn());

describe("useInitModules hook", () => {
    it("should return /schedule when useCheckFeatureAndPermissionFlag is true", () => {
        (useCheckFeatureAndPermissionFlag as jest.Mock<any>).mockImplementation(() => {
            return () => true;
        });
        const { result } = renderHook(() => useInitModules());
        expect(result.current).toEqual({
            routes: [
                {
                    featureConfigs: {
                        feature: Features.SCHEDULE_MANAGEMENT,
                    },
                    path: "/schedule",
                    component: expect.anything(),
                },
            ],
        });
    });
    it("should not return /calendar when useCheckFeatureAndPermissionFlag is false", () => {
        (useCheckFeatureAndPermissionFlag as jest.Mock<any>).mockImplementation(() => {
            return () => false;
        });
        const { result } = renderHook(() => useInitModules());

        expect(result.current).toEqual({
            routes: [],
        });
    });
});
