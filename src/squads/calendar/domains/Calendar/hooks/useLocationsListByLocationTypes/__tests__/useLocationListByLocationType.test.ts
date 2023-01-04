import {
    Calendar_LocationsListByLocationTypesQuery,
    Calendar_LocationsListByLocationTypesQueryVariables,
} from "src/squads/calendar/service/bob/bob-types";
import { locationsService } from "src/squads/calendar/service/bob/locations-service/locations-service";
import { inferQuery } from "src/squads/calendar/service/infer-query";
import { mockLocations, mockVariables } from "src/squads/calendar/test-utils/locations";
import { mockWarner } from "src/squads/calendar/test-utils/warner";

import TranslationProvider from "src/squads/calendar/providers/TranslationProvider";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useLocationListByLocationType from "src/squads/calendar/domains/Calendar/hooks/useLocationsListByLocationTypes";
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

describe("useLocationListByLocationType", () => {
    const showSnackbar = jest.fn();
    const std = mockWarner();
    const runRenderHook = () => {
        return renderHook(
            () => useLocationListByLocationType({ locationTypeId: mockVariables.location_type_id }),
            { wrapper: TranslationProvider }
        );
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

    it("should return correct location list", () => {
        (inferQuery as jest.Mock).mockImplementation(() => () => {
            return {
                data: mockLocations,
                isLoading: false,
            };
        });

        const {
            result: { current },
        } = runRenderHook();

        expect(inferQuery).toBeCalledWith({
            entity: "locations",
            action: "calendarGetLocationsListByLocationTypes",
        });
        expect(current.data).toMatchObject(mockLocations);
    });

    it("should call onError when fetching locations", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "locations"; action: keyof typeof locationsService["query"] }) =>
                (
                    _params: Calendar_LocationsListByLocationTypesQueryVariables,
                    options: UseQueryBaseOptions<
                        Calendar_LocationsListByLocationTypesQuery["locations"] | undefined
                    >
                ) => {
                    if (resource.action === "calendarGetLocationsListByLocationTypes") {
                        if (!callbackRan) {
                            options.onError?.(Error("Error useLocationsListByLocationTypes"));
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
            `useLocationsListByLocationTypes: `,
            Error("Error useLocationsListByLocationTypes")
        );
    });
});
