import { inferStandaloneQuery } from "src/squads/user/service/infer-service";
import { mockLocationCourseChoice } from "src/squads/user/test-utils/mocks/student-course-package";

import useCourseLocations from "../useCourseLocations";

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

describe("useCourseLocations", () => {
    let showSnackbar = jest.fn();
    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should return empty data with empty location id", () => {
        const {
            result: {
                current: { options, loading },
            },
        } = renderHook(() => useCourseLocations(""));

        expect(loading).toBe(false);

        expect(options.length).toBe(0);
    });
    it("should return array data with location id", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(
            () => () => mockLocationCourseChoice
        );

        const { waitForNextUpdate, result } = renderHook(() => useCourseLocations("location_id"));

        await waitForNextUpdate();
        expect(inferStandaloneQuery).toBeCalledTimes(1);
        expect(result.current.loading).toBe(false);
        expect(result.current.options).toMatchObject(
            mockLocationCourseChoice.map((data) => data.location)
        );
    });
});
