import {
    Calendar_LocationTypesListQuery,
    Calendar_LocationTypesListQueryVariables,
} from "src/squads/calendar/service/bob/bob-types";
import { locationTypesService } from "src/squads/calendar/service/bob/location-types-service/location-types-service";
import { inferQuery } from "src/squads/calendar/service/infer-query";
import { mockLocationTypes } from "src/squads/calendar/test-utils/location-types";
import { mockWarner } from "src/squads/calendar/test-utils/warner";

import TranslationProvider from "src/squads/calendar/providers/TranslationProvider";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useLocationTypesList from "src/squads/calendar/domains/Calendar/hooks/useLocationTypesList";
import useShowSnackbar from "src/squads/calendar/hooks/useShowSnackbar";

jest.mock("src/squads/calendar/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

jest.mock("src/squads/calendar/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

describe("useLocationTypesList", () => {
    const showSnackbar = jest.fn();
    const onSuccess = jest.fn();
    const std = mockWarner();

    const runRenderHook = (props = {}) => {
        return renderHook(() => useLocationTypesList(props), {
            wrapper: TranslationProvider,
        });
    };

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should show default value", () => {
        (inferQuery as jest.Mock).mockImplementation(() => () => {
            return {
                data: undefined,
                isLoading: false,
            };
        });

        const {
            result: { current },
        } = runRenderHook();

        expect(current.data).toEqual([]);
    });

    it("should return correct location types list", () => {
        (inferQuery as jest.Mock).mockImplementation(() => () => {
            return {
                data: mockLocationTypes,
                isLoading: false,
            };
        });

        const {
            result: { current },
        } = runRenderHook();

        expect(inferQuery).toBeCalledWith({
            entity: "locationTypes",
            action: "calendarGetLocationTypesList",
        });
        expect(current.data).toEqual(mockLocationTypes);
    });

    it("should call onError when fetching location type", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "locationTypes";
                    action: keyof typeof locationTypesService["query"];
                }) =>
                (
                    _params: Calendar_LocationTypesListQueryVariables,
                    options: UseQueryBaseOptions<
                        Calendar_LocationTypesListQuery["location_types"] | undefined
                    >
                ) => {
                    if (resource.action === "calendarGetLocationTypesList") {
                        if (!callbackRan) {
                            options.onError?.(Error("Error useLocationTypesList"));
                            callbackRan = true;
                        }
                    }

                    return {
                        data: [],
                        isLoading: false,
                    };
                }
        );

        runRenderHook();

        expect(showSnackbar).toBeCalledWith("Unable to load data, please try again!", "error");

        //log function
        expect(std.warn).toBeCalledWith(
            `useLocationTypesList: `,
            Error("Error useLocationTypesList")
        );
    });

    it("should call onSuccess when fetching location type", () => {
        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "locationTypes";
                    action: keyof typeof locationTypesService["query"];
                }) =>
                (
                    _params: Calendar_LocationTypesListQueryVariables,
                    options: UseQueryBaseOptions<
                        Calendar_LocationTypesListQuery["location_types"] | undefined
                    >
                ) => {
                    if (resource.action === "calendarGetLocationTypesList") {
                        options.onSuccess?.(mockLocationTypes);
                    }

                    return {
                        data: [],
                        isLoading: false,
                    };
                }
        );

        runRenderHook({ onSuccess });

        expect(onSuccess).toBeCalledWith(mockLocationTypes);
    });
});
