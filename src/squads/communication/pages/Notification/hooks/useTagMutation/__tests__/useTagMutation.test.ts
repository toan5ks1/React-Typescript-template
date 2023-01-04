import inferMutation from "src/squads/communication/service/infer-mutation";
import { tagManagementService } from "src/squads/communication/service/notificationmgmt/tag-management-service/tag-management-service";
import { upsertNotificationTagParams } from "src/squads/communication/test-utils/query-data";

import { UpsertTagRequest, UpsertTagResponse } from "manabuf/notificationmgmt/v1/tags_pb";

import { MutationParams, UseMutationOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useTagMutation from "src/squads/communication/pages/Notification/hooks/useTagMutation";

jest.mock("src/squads/communication/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/service/infer-mutation", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const onClose = jest.fn();
const mockShowSnackbar = jest.fn();

const mockInferMutation = (isSuccess: boolean) => {
    (inferMutation as jest.Mock).mockImplementation(
        (resource: {
                entity: "tagManagement";
                action: keyof typeof tagManagementService["mutation"];
            }) =>
            (
                _options?: UseMutationOptions<
                    MutationParams<UpsertTagRequest.AsObject>,
                    UpsertTagResponse.AsObject
                >
            ) => {
                switch (resource.action) {
                    case "communicationUpsertTag":
                        return {
                            mutateAsync: isSuccess
                                ? jest.fn(
                                      async (
                                          params: MutationParams<UpsertTagRequest.AsObject>,
                                          options?: UseMutationOptions<
                                              MutationParams<UpsertTagRequest.AsObject>,
                                              UpsertTagResponse.AsObject
                                          >
                                      ) => {
                                          await options?.onSuccess?.(
                                              { tagId: "tag_id_1" },
                                              params,
                                              undefined
                                          );
                                      }
                                  )
                                : () => {
                                      throw Error("ERROR communicationUpsertTag");
                                  },
                        };
                    default:
                }
                return { mutateAsync: jest.fn() };
            }
    );
};

const renderUseTagMutation = () => {
    (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);

    const {
        result: {
            current: { onUpsert },
        },
    } = renderHook(() => useTagMutation());
    return onUpsert;
};

describe("useTagMutation call onSuccess", () => {
    it("should call snackbar with success message on success of onUpsert", async () => {
        mockInferMutation(true);

        const onUpsert = renderUseTagMutation();
        await onUpsert({ data: upsertNotificationTagParams, onClose });

        expect(onClose).toBeCalled();
        expect(mockShowSnackbar).toBeCalledWith("ra.common.createdTagSuccess");
    });
});

describe("useTagMutation call onError", () => {
    it("should call snackbar with error message on error of onUpsert", async () => {
        mockInferMutation(false);

        const onUpsert = renderUseTagMutation();
        await onUpsert({ data: { tagId: "", name: "" }, onClose });

        expect(onClose).toBeCalled();
        expect(mockShowSnackbar).toBeCalledWith("ERROR communicationUpsertTag", "error");
    });
});
