import debounce from "lodash/debounce";
import { inferStandaloneQuery } from "src/squads/user/service/infer-service";

import useFetchCourseAutocomplete from "../useFetchCourseAutocomplete";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/squads/user/hooks/useUserFeatureFlag");
jest.mock("src/squads/user/hooks/useShowSnackbar");
jest.mock("react-hook-form", () => {
    const reactHookForm = jest.requireActual("react-hook-form");
    return {
        ...reactHookForm,
        useFormContext: () => ({
            clearErrors: jest.fn(),
        }),
    };
});

jest.mock("lodash/debounce", () => jest.fn());

jest.useFakeTimers("modern");
jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferStandaloneQuery: jest.fn(),
}));

describe("useFetchAutocomplete", () => {
    it("should return correct data", async () => {
        (inferStandaloneQuery as jest.Mock).mockReturnValue([]);

        (debounce as jest.Mock).mockReturnValue("course");

        const {
            result: {
                current: { setInputValDebounced, options, loading },
            },
        } = renderHook(() => useFetchCourseAutocomplete({}));

        jest.runAllTimers();

        expect(setInputValDebounced).toBe("course");

        expect(loading).toBe(false);

        expect(options.length).toBe(0);
    });
});
