import {
    Communication_GetTagsSelectedByNotificationIdQueryVariables,
    Communication_GetTagsSelectedByNotificationIdQuery,
} from "src/squads/communication/service/bob/bob-types";
import { inferQuery } from "src/squads/communication/service/infer-query";
import { createMockTagsSelectedByNotificationIdQueryReturn } from "src/squads/communication/test-utils/query-data";
import { mockWarner } from "src/squads/communication/test-utils/warner";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useTagsSelectedByNotificationId from "src/squads/communication/pages/Notification/hooks/useTagsSelectedByNotificationId";

jest.mock("src/squads/communication/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

jest.mock("src/squads/communication/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockQueryTagsSelectedByNotificationId = createMockTagsSelectedByNotificationIdQueryReturn();

function mockInferQuery(isError: boolean = false) {
    (inferQuery as jest.Mock).mockImplementation(
        () =>
            (
                _params: Communication_GetTagsSelectedByNotificationIdQueryVariables,
                options: UseQueryBaseOptions<
                    Communication_GetTagsSelectedByNotificationIdQuery["tags"] | undefined
                >
            ) => {
                if (isError) {
                    options.onError?.(Error("ERROR TAGS"));
                    return {
                        data: [],
                        isFetching: false,
                    };
                }

                return {
                    data: mockQueryTagsSelectedByNotificationId,
                    isFetching: false,
                };
            }
    );
}

describe("useTagsSelectedByNotificationId", () => {
    const showSnackbar = jest.fn();

    const std = mockWarner();

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should return tags selected by notification id", () => {
        mockInferQuery();

        const {
            result: { current },
        } = renderHook(() =>
            useTagsSelectedByNotificationId({ notificationId: "notification_id_1" })
        );

        expect(current.data).toEqual(mockQueryTagsSelectedByNotificationId);
    });

    it("should call onError when fetching tags selected", () => {
        mockInferQuery(true);

        renderHook(() => useTagsSelectedByNotificationId({ notificationId: "notification_id_1" }));

        expect(showSnackbar).toBeCalledWith("ra.manabie-error.unknown", "error");
        expect(std.warn).toBeCalledWith(
            "useTagsSelectedByNotificationId tags selected by notification id",
            Error("ERROR TAGS")
        );
    });
});
