import { UseQueryBaseOptions } from "src/squads/syllabus/hooks/data/data-types";
import logger from "src/squads/syllabus/internals/logger";
import {
    MediasManyQuery,
    MediasManyQueryVariables,
} from "src/squads/syllabus/services/bob/bob-types";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import { renderHook } from "@testing-library/react-hooks";
import useMediaList from "src/squads/syllabus/hooks/useMediaList";
import { mediaList } from "src/squads/syllabus/hooks/useMediaList/__mocks__";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";

jest.mock("src/squads/syllabus/internals/logger");

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/services/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

describe("useMediaList", () => {
    const showSnackbar = jest.fn();

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should get notification msg detail data", () => {
        (inferQuery as jest.Mock).mockImplementation(
            () =>
                (
                    _params: MediasManyQueryVariables,
                    _options?: UseQueryBaseOptions<MediasManyQuery["media"] | undefined>
                ) => {
                    return { data: mediaList, isFetching: false };
                }
        );

        const {
            result: { current },
        } = renderHook(() => useMediaList({ mediaIds: ["media1", "media2"] }));

        expect(current.mediaList).toMatchObject(mediaList);
        expect(current.isFetchingMediaList).toEqual(false);
    });

    it("should show default value", () => {
        (inferQuery as jest.Mock).mockImplementation(
            () =>
                (
                    _params: MediasManyQueryVariables,
                    _options?: UseQueryBaseOptions<MediasManyQuery["media"] | undefined>
                ) => {
                    return { data: undefined, isFetching: false };
                }
        );

        const { result } = renderHook(() => useMediaList({ mediaIds: ["media3"] }));

        expect(result.current.isFetchingMediaList).toEqual(false);
        expect(result.current.mediaList).toEqual([]);
    });

    it("should call onError when fetching mediaList", () => {
        let ranOnError = false;
        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "media"; action: "MEDIA_GET_MANY" }) =>
                (
                    _params: MediasManyQueryVariables,
                    options?: UseQueryBaseOptions<MediasManyQuery["media"] | undefined>
                ) => {
                    switch (resource.entity) {
                        case "media":
                            if (!ranOnError) {
                                options?.onError?.(Error("ERROR MEDIA"));
                                ranOnError = true;
                            }
                            break;

                        default:
                            return { data: [], isFetching: false };
                    }
                }
        );

        renderHook(() => useMediaList({ mediaIds: ["media3"] }));

        // log function
        expect(logger.error).toBeCalledWith(`ERP useMediaList`, Error("ERROR MEDIA"));
    });

    it("should return default empty media list with empty mediaIds", () => {
        (inferQuery as jest.Mock).mockImplementation(
            () =>
                (
                    _params: MediasManyQueryVariables,
                    _options?: UseQueryBaseOptions<MediasManyQuery["media"] | undefined>
                ) => {
                    return { data: mediaList, isFetching: false };
                }
        );

        const {
            result: { current },
        } = renderHook(() => useMediaList({ mediaIds: [] }));

        expect(current.mediaList).toMatchObject([]);
        expect(current.isFetchingMediaList).toEqual(false);
    });
});
