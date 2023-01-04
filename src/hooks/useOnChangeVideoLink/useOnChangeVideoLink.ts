import { useCallback } from "react";

import { KeyMediaTypes } from "src/common/constants/const";
import { Entities, NotifyTypes, ProviderTypes } from "src/common/constants/enum";
import { handleUnknownError } from "src/common/utils/error";
import { BrightcoveVideoInfo } from "src/models/brightcove";
import { MediaHasura } from "src/models/media";
import { NsBobUploadReaderService } from "src/services/bob/upload-reader-service-bob/types";

import { MediaType } from "manabie-bob/enum_pb";

import { pick1stElement } from "../../common/utils/other";

import type { Media } from "src/__generated__/root-types";
import useDataProvider from "src/hooks/useDataProvider";
import useTranslate from "src/hooks/useTranslate";

type InputFile = Media | File;
const useIsDuplicateVideoLink = (
    notify: (message: string, notifyTypes: NotifyTypes) => void,
    t: (text: string) => string
) => {
    return useCallback(
        (files: InputFile[], media: Media): boolean => {
            files = files.filter((file) => {
                return "media_id" in file;
            });
            if (!files || !files.length) return false;

            let flag = false;
            files.forEach((file) => {
                if (file["media_id"] === media.media_id) {
                    notify(t(`ra.message.brightcoveVideoLinkHasExisted`), NotifyTypes.ERROR);
                    flag = true;
                    return;
                }
            });
            return flag;
        },
        [notify, t]
    );
};

const useOnChangeVideoLink = (
    files: InputFile[],
    onChange: (files: Media) => void,
    notify: (message: string, notifyTypes: NotifyTypes) => void
) => {
    const t = useTranslate();
    const isDuplicateVideoLink = useIsDuplicateVideoLink(notify, t);
    const provider = useDataProvider();

    return useCallback(
        async (brightcoveVideosList: BrightcoveVideoInfo[]) => {
            try {
                const brightcoveVideo = pick1stElement(brightcoveVideosList);
                if (!brightcoveVideo) return;

                const { data: brightcoveVideoInfo } = await provider(
                    ProviderTypes.GET_BRIGHTCOVE_VIDEO_INFO,
                    Entities.BRIGHTCOVE,
                    {
                        ...brightcoveVideo,
                    }
                );

                const data: NsBobUploadReaderService.UpsertMedia = {
                    resource: brightcoveVideo.videoId,
                    type: MediaType.MEDIA_TYPE_VIDEO,
                    name: brightcoveVideoInfo.name,
                };

                const { data: resp } = (await provider(ProviderTypes.CREATE, Entities.MEDIA, {
                    data,
                })) as { data: MediaHasura };

                const medias = [
                    {
                        ...data,
                        type: KeyMediaTypes.MEDIA_TYPE_VIDEO,
                        id: String(resp.id),
                        media_id: String(resp.id),
                    },
                ] as (Media & { id: string })[];

                if (!isDuplicateVideoLink(files, pick1stElement(medias)!)) {
                    const newFile = pick1stElement(medias);
                    if (newFile) onChange(newFile);
                }
            } catch (err) {
                const error = handleUnknownError(err);
                window.warner?.log(error.message);
                notify(
                    `${t("ra.manabie-error.cannotUpload")}: ${t(error.message)}`,
                    NotifyTypes.ERROR
                );
            }
        },
        [provider, isDuplicateVideoLink, files, onChange, notify, t]
    );
};
export default useOnChangeVideoLink;
