import { LocationInformation } from "src/squads/user/common/types";
import location from "src/squads/user/service/define-service/location-service";
import { inferQuery } from "src/squads/user/service/infer-service";
import type { UseQueryBaseOptions } from "src/squads/user/service/service-creator";
import { mockTreeLocations, mockFlatLocations } from "src/squads/user/test-utils/mocks/locations";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import useMapTreeLocations, { TreeLocationProps } from "../useMapTreeLocations";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";

jest.mock("src/squads/user/service/infer-service", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/user/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("useMapTreeLocations", () => {
    beforeEach(() => {
        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "location"; action: keyof typeof location.query }) =>
                (
                    _params: any,
                    options?: UseQueryBaseOptions<LocationInformation[], TreeLocationProps[]>
                ) => {
                    if (resource.entity === "location" && options?.selector) {
                        const tree = options.selector(mockFlatLocations);
                        return { data: tree, isLoading: false };
                    }
                }
        );
    });
    it("should return correct data and state of loading successfully", () => {
        const {
            result: { current },
        } = renderHook(() => useMapTreeLocations(), { wrapper: TestCommonAppProvider });
        const { treeLocations, isLoading } = current;

        expect(mockTreeLocations[0].children).toMatchObject(treeLocations);
        expect(isLoading).toBe(false);
    });

    it("should return correct data and state of loading successfully when show root Org", () => {
        const {
            result: { current },
        } = renderHook(() => useMapTreeLocations(true), { wrapper: TestCommonAppProvider });

        const { treeLocations, isLoading } = current;

        expect(mockTreeLocations).toMatchObject(treeLocations);
        expect(isLoading).toBe(false);
    });

    it("should return correct data and state of loading on fail", async () => {
        const showSnackbar = jest.fn();

        (inferQuery as jest.Mock).mockImplementation(
            (_resource: { entity: "masterReader"; action: keyof typeof location.query }) =>
                (
                    _params: any,
                    options?: UseQueryBaseOptions<LocationInformation[], TreeLocationProps[]>
                ) => {
                    options?.onError?.(new Error("ERROR Location"));
                    return { data: {}, isLoading: false };
                }
        );
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const {
            result: { current },
        } = renderHook(() => useMapTreeLocations(), { wrapper: TestCommonAppProvider });

        const { treeLocations, isLoading } = current;

        expect(treeLocations).toMatchObject({});
        expect(isLoading).toBe(false);

        expect(showSnackbar).toBeCalledWith("ERROR Location", "error");
    });
});
