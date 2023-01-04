import { KeyMediaTypes } from "src/common/constants/const";
import { Entities, ERPModules, ProviderTypes } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { handleUnknownError } from "src/common/utils/error";
import { arrayHasItem } from "src/common/utils/other";
import { MediasManyQuery } from "src/squads/lesson/service/bob/bob-types";
import inferMutation from "src/squads/lesson/service/infer-mutation";
import { UseMutationOptions } from "src/squads/lesson/service/service-creator";

import useDataProvider from "src/hooks/useDataProvider";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export type MediasList = Omit<ArrayElement<MediasManyQuery["media"]>, "conversion_tasks">;
interface ConvertMediaRequest {
    data: { mediaList: MediasList[] };
}
const useConvertMedia = ({
    onError,
}: {
    onError: UseMutationOptions<ConvertMediaRequest, { data: { id: null } }, unknown>["onError"];
}) => {
    const showSnackbar = useShowSnackbar();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);
    const t = useTranslate();

    const dataProvider = useDataProvider(); //TODO: change this to use useMutation instead

    const { mutate: mutateConvertMedia } = inferMutation({
        entity: "classes",
        action: "classesConvertMedia",
    })({ onError });

    const convertMedia = async (mediaIds: string[]) => {
        if (!mediaIds || !mediaIds.length) return;

        try {
            const result: { data: MediasList[] } = await dataProvider(
                ProviderTypes.LIST,
                Entities.MEDIA,
                {
                    filter: {
                        media_id: mediaIds,
                        type: KeyMediaTypes.MEDIA_TYPE_PDF,
                        converted_images: true,
                    },
                    pagination: {
                        perPage: mediaIds.length,
                        page: 1,
                    },
                    sort: { field: "created_at", order: "ASC" },
                }
            );
            const media = result?.data;
            if (arrayHasItem(media)) {
                const mediaData: ConvertMediaRequest = {
                    data: {
                        mediaList: media,
                    },
                };
                mutateConvertMedia(mediaData);
            }
        } catch (err) {
            const error = handleUnknownError(err);

            const errorMessage = tLessonManagement("errors.errorDuringFileConversion", {
                mediaIds: mediaIds.toString(),
            });
            showSnackbar(errorMessage, "error");
            window.warner?.warn(errorMessage, t(error.message), error);
        }
    };

    return { convertMedia };
};

export default useConvertMedia;
