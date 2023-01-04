import {
    Communication_GetListTagsByTagIdsQuery,
    Communication_GetListTagsByTagIdsQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { tagsService } from "src/squads/communication/service/bob/tags-services/tags-service";
import { inferQuery } from "src/squads/communication/service/infer-query";
import { createMockTagsByTagIds } from "src/squads/communication/test-utils/query-data";
import { mockWarner } from "src/squads/communication/test-utils/warner";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useTagsByTagIds from "src/squads/communication/pages/Notification/hooks/useTagsByTagIds";

jest.mock("src/squads/communication/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

jest.mock("src/squads/communication/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockQueryListTagsByTagIds = createMockTagsByTagIds();
const mockErrorMessage = "ERROR TAGS";

function mockInferQuery({
    isError,
    tags,
}: {
    isError: boolean;
    tags?: Communication_GetListTagsByTagIdsQuery["tags"];
}) {
    (inferQuery as jest.Mock).mockImplementation(
        (resource: { entity: "tags"; action: keyof typeof tagsService.query }) =>
            (
                _params: Communication_GetListTagsByTagIdsQueryVariables,
                options: UseQueryBaseOptions<
                    Communication_GetListTagsByTagIdsQuery["tags"] | undefined
                >
            ) => {
                if (resource.action === "communicationGetTagsByTagIds") {
                    if (isError) {
                        options.onError?.(Error("ERROR TAGS"));
                        return {
                            data: [],
                            isFetching: false,
                        };
                    }

                    return {
                        data: tags,
                        isFetching: false,
                    };
                }

                return {
                    data: [],
                    isFetching: false,
                };
            }
    );
}

describe("useTagsByTagIds", () => {
    const showSnackbar = jest.fn();

    const std = mockWarner();

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should return list tag by tag ids", () => {
        mockInferQuery({ isError: false, tags: mockQueryListTagsByTagIds });

        const {
            result: { current },
        } = renderHook(() => useTagsByTagIds({ tagIds: ["tagId1"] }));

        expect(current.data).toEqual(mockQueryListTagsByTagIds);
    });

    it("should return list tags by tag ids", () => {
        mockInferQuery({ isError: false, tags: [] });

        const {
            result: { current },
        } = renderHook(() => useTagsByTagIds({ tagIds: [] }));

        expect(current.data).toEqual([]);
    });

    it("should call onError when fetching list tags", () => {
        mockInferQuery({ isError: true });

        renderHook(() => useTagsByTagIds({ tagIds: ["tag_id_1"] }));

        expect(showSnackbar).toBeCalledWith(mockErrorMessage, "error");
        expect(std.warn).toBeCalledWith("useTagsByTagIds tags by tag ids", Error("ERROR TAGS"));
    });
});
