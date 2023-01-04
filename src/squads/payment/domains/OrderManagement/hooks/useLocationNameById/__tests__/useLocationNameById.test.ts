import {
    Payment_GetLocationNameByLocationIdQuery,
    Payment_GetLocationNameByLocationIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { locationsService } from "src/squads/payment/service/fatima/locations-service/locations-service";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { createMockLocation } from "src/squads/payment/test-utils/mocks/location";
import { mockWarner } from "src/squads/payment/test-utils/warner";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useLocationNameById from "src/squads/payment/domains/OrderManagement/hooks/useLocationNameById";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";

jest.mock("src/squads/payment/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/payment/hooks/useShowSnackbar");

const showSnackbar = jest.fn();
const onSuccess = jest.fn();

const mockLocation = createMockLocation();

describe("useLocationNameById", () => {
    const std = mockWarner();

    it("should return location data on success", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "locations"; action: keyof typeof locationsService.query }) =>
                (
                    _params: Payment_GetLocationNameByLocationIdQueryVariables,
                    options: UseQueryBaseOptions<
                        | ArrayElement<Payment_GetLocationNameByLocationIdQuery["locations"]>
                        | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "paymentGetLocationTitleByLocationId") {
                            callbackRan = true;

                            options.onSuccess?.(mockLocation);

                            return {
                                data: mockLocation,
                                isFetched: true,
                            };
                        }
                    }

                    return { data: undefined, isFetched: true };
                }
        );

        const { result } = renderHook(() =>
            useLocationNameById({ locationId: "location_id_1", onSuccess })
        );
        expect(result.current.data).toEqual(mockLocation);
    });

    it("should log warning and show snackbar when the query fails", () => {
        const queryError = new Error("Error when query in useLocationNameById");
        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "locations"; action: keyof typeof locationsService.query }) =>
                (
                    _params: Payment_GetLocationNameByLocationIdQueryVariables,
                    options: UseQueryBaseOptions<
                        | ArrayElement<Payment_GetLocationNameByLocationIdQuery["locations"]>
                        | undefined
                    >
                ) => {
                    if (resource.action === "paymentGetLocationTitleByLocationId") {
                        options.onError?.(queryError);
                        return { data: undefined, isFetched: true };
                    }
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const { result } = renderHook(() =>
            useLocationNameById({ locationId: "location_id_1", onSuccess })
        );

        expect(std.warn).toBeCalledWith("useLocationNameById in Payment Order", queryError);

        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData locations - paymentGetLocationTitleByLocationId",
            "error"
        );

        expect(result.current.data).toBeUndefined();
    });
});
