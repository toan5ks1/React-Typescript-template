import { Media } from "src/squads/communication/common/constants/types";
import {
    MediasManyQuery,
    MediasManyQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { mediaService } from "src/squads/communication/service/bob/media-service/media-service";
import { inferQuery } from "src/squads/communication/service/infer-query";
import { mockWarner } from "src/squads/communication/test-utils/warner";

import { mediaList } from "../__mocks__";
import useMediaList from "../useMediaList";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";

jest.mock("src/squads/communication/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

function mockInferQuery(result?: Media[]) {
    let callbackRan = false;

    (inferQuery as jest.Mock).mockImplementation(
        (resource: { entity: "media"; action: keyof typeof mediaService["query"] }) => () => {
            if (!callbackRan) {
                if (resource.action === "communicationGetManyMedias") {
                    callbackRan = true;

                    return {
                        data: result,
                        isFetching: false,
                        refetch: jest.fn(),
                    };
                }
            }

            return {
                data: [],
                isFetching: false,
                refetch: jest.fn(),
            };
        }
    );
}

describe("useMediaList", () => {
    const showSnackbar = jest.fn();
    const std = mockWarner();

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should get notification msg detail data", () => {
        mockInferQuery(mediaList);

        const {
            result: { current },
        } = renderHook(() => useMediaList({ mediaIds: ["media1", "media2"] }));

        expect(current.mediaList).toMatchObject(mediaList);
        expect(current.isFetchingMediaList).toEqual(false);
    });

    it("should show default value", () => {
        mockInferQuery(undefined);

        const { result } = renderHook(() => useMediaList({ mediaIds: ["media3"] }));

        expect(result.current.isFetchingMediaList).toEqual(false);
        expect(result.current.mediaList).toEqual([]);
    });

    it("should call onError when fetching mediaList", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "media"; action: keyof typeof mediaService["query"] }) =>
                (
                    _params: MediasManyQueryVariables,
                    options: UseQueryBaseOptions<MediasManyQuery["media"]>
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "communicationGetManyMedias") {
                            callbackRan = true;

                            options.onError?.(Error("ERROR MEDIA"));
                        }
                    }

                    return {
                        data: [],
                        isFetching: false,
                        refetch: jest.fn(),
                    };
                }
        );

        renderHook(() => useMediaList({ mediaIds: ["media3"] }));

        // log function
        expect(std.warn).toBeCalledWith(`ERP useMediaList`, Error("ERROR MEDIA"));
    });
});
