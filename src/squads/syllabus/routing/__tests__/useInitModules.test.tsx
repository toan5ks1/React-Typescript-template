import { rawRoutes } from "../routings";
import useCheckFeatureAndPermissionFlag from "../useCheckFeatureAndPermissionFlag";
import useInitModules from "../useInitModules";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/squads/syllabus/pages/Course/CourseRouter", () => {
    return {
        __esModule: true,
        default: () => <div>CourseRouter</div>,
    };
});
jest.mock("src/app/useFeatureController");

jest.mock("src/squads/syllabus/routing/useCheckFeatureAndPermissionFlag", () => jest.fn());

describe("useInitModules hook", () => {
    it("should return /courses when useCheckFeatureAndPermissionFlag is true", () => {
        (useCheckFeatureAndPermissionFlag as jest.Mock<any>).mockImplementation(() => {
            return () => true;
        });
        const { result } = renderHook(() => useInitModules());

        expect(result.current).toMatchObject({
            routes: rawRoutes,
        });
    });
    it("should not return /courses when useCheckFeatureAndPermissionFlag is false", () => {
        (useCheckFeatureAndPermissionFlag as jest.Mock<any>).mockImplementation(() => {
            return () => false;
        });
        const { result } = renderHook(() => useInitModules());

        expect(result.current).toMatchObject({
            routes: [],
        });
    });
});
