import { UseQueryBaseOptions } from "src/squads/syllabus/hooks/data/data-types";
import { NsMasterDataReaderService } from "src/squads/syllabus/services/bob/master-reader-service/type";
import { inferQuery } from "src/squads/syllabus/services/infer-query";
import masterReader from "src/squads/syllabus/services/master-reader-service";
import { mockTreeLocations, mockFlatLocations } from "src/squads/syllabus/test-utils/locations";

import useMapTreeLocations, { TreeLocationProps } from "../useMapTreeLocations";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import TestCommonAppProvider from "src/squads/syllabus/test-utils/TestCommonAppProvider";

jest.mock("src/squads/syllabus/internals/logger");

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("useMapTreeLocations", () => {
    it("should return correct data and state of loading successfully", () => {
        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "masterReader"; action: keyof typeof masterReader.query }) =>
                (
                    _params: any,
                    options?: UseQueryBaseOptions<
                        NsMasterDataReaderService.LocationObjectResponse[],
                        TreeLocationProps[]
                    >
                ) => {
                    if (resource.entity === "masterReader" && options?.selector) {
                        const tree = options.selector(mockFlatLocations);
                        return { data: tree, isLoading: false };
                    }
                }
        );

        const {
            result: { current },
        } = renderHook(() => useMapTreeLocations(), { wrapper: TestCommonAppProvider });

        const { treeLocations, isLoading } = current;

        expect(mockTreeLocations[0].children).toMatchObject(treeLocations);
        expect(isLoading).toBe(false);
    });

    it("should return correct data and state of loading on fail", async () => {
        const showSnackbar = jest.fn();

        (inferQuery as jest.Mock).mockImplementation(
            (_resource: { entity: "masterReader"; action: keyof typeof masterReader.query }) =>
                (
                    _params: any,
                    options?: UseQueryBaseOptions<
                        NsMasterDataReaderService.LocationObjectResponse[],
                        TreeLocationProps[]
                    >
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
