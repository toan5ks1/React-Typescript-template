import { useCallback } from "react";

import { handleUnknownError } from "src/common/utils/error";
import inferMutation from "src/squads/communication/service/infer-mutation";

import { UpsertTagRequest, UpsertTagResponse } from "manabuf/notificationmgmt/v1/tags_pb";

import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useTranslate from "src/squads/communication/hooks/useTranslate";

export interface UpsertTagParams {
    data: UpsertTagRequest.AsObject;
    onClose?: () => void;
}

export interface UseTagMutationReturn {
    onUpsert: ({
        data,
        onClose,
    }: UpsertTagParams) => Promise<UpsertTagResponse.AsObject | undefined>;
}

const useTagMutation = (): UseTagMutationReturn => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const { mutateAsync: upsertTag } = inferMutation({
        entity: "tagManagement",
        action: "communicationUpsertTag",
    })();

    const onUpsert = useCallback(
        async ({ data, onClose }: UpsertTagParams) => {
            let result: UpsertTagResponse.AsObject = { tagId: "" };

            try {
                onClose && onClose();

                result = await upsertTag(
                    { data },
                    {
                        onSuccess: () => {
                            showSnackbar(t("ra.common.createdTagSuccess"));
                        },
                    }
                );

                return result;
            } catch (err) {
                const error = handleUnknownError(err);

                window.warner?.warn(
                    "useTagMutation communicationUpsertTag action failed",
                    error.message
                );

                showSnackbar(t(error.message), "error");
            }
        },
        [upsertTag, showSnackbar, t]
    );

    return { onUpsert };
};

export default useTagMutation;
