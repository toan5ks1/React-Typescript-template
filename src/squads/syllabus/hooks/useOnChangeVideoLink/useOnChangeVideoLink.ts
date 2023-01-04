import { useCallback } from "react";

import { NotifyTypes } from "src/common/constants/enum";
import { handleUnknownError } from "src/common/utils/error";
import { pick1stElement } from "src/common/utils/other";
import { KeyMediaTypes } from "src/squads/syllabus/common/constants/const";
import logger from "src/squads/syllabus/internals/logger";
import { BrightcoveVideoInfo } from "src/squads/syllabus/models/brightcove";
import { NsBobUploadReaderService } from "src/squads/syllabus/services/bob/upload-reader-service-bob/types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { inferStandaloneQuery } from "src/squads/syllabus/services/infer-query";

import { MediaType } from "manabie-bob/enum_pb";

import type { Media } from "src/squads/syllabus/__generated__/bob/root-types";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

const useOnChangeVideoLink = (
    onChange: (files: Media) => void,
    notify: (message: string, notifyTypes: NotifyTypes) => void
) => {
    const t = useTranslate();

    const { mutateAsync } = inferMutation({
        entity: "media",
        action: "syllabusUpsertMedias",
    })();

    return useCallback(
        async (brightcoveVideosList: BrightcoveVideoInfo[]) => {
            try {
                const brightcoveVideo = pick1stElement(brightcoveVideosList);
                if (!brightcoveVideo) return;

                const brightcoveVideoInfo = await inferStandaloneQuery({
                    entity: "brightcove",
                    action: "syllabusBrightcoveGetVideoInfo",
                })({
                    accountId: brightcoveVideo.accountId,
                    videoId: brightcoveVideo.videoId,
                });

                if (!brightcoveVideoInfo) return;

                const data: NsBobUploadReaderService.UpsertMedia = {
                    resource: brightcoveVideo.videoId,
                    type: MediaType.MEDIA_TYPE_VIDEO,
                    name: brightcoveVideoInfo.name,
                };

                const { mediaIdsList } = await mutateAsync([data]);

                const medias = {
                    resource: brightcoveVideo.videoId,
                    name: brightcoveVideoInfo.name,
                    type: KeyMediaTypes.MEDIA_TYPE_VIDEO,
                    media_id: mediaIdsList[0],
                } as Media;

                onChange(medias);
            } catch (err) {
                const error = handleUnknownError(err);
                logger.warn("[useOnChangeVideoLink]", error);

                notify(
                    `${t("ra.manabie-error.cannotUpload")}: ${t(error.message)}`,
                    NotifyTypes.ERROR
                );
            }
        },
        [mutateAsync, onChange, notify, t]
    );
};
export default useOnChangeVideoLink;
