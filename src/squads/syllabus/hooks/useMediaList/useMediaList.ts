import { QueryObserverResult, RefetchOptions } from "react-query";
import { arrayHasItem } from "src/common/utils/other";
import logger from "src/squads/syllabus/internals/logger";
import { MediasManyQuery } from "src/squads/syllabus/services/bob/bob-types";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import { Media } from "src/squads/syllabus/__generated__/bob/root-types";

export interface UseMediaListReturn {
    mediaList: MediasManyQuery["media"] | Media[];
    isFetchingMediaList: boolean;
    refetchMedia?: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<MediasManyQuery["media"] | undefined, Error>>;
}

export interface UseMediaListProps {
    mediaIds?: string[];
    isPreventingDataFetching?: boolean;
}

const defaultEmptyList: Media[] = [];

const useMediaList = ({
    mediaIds,
    isPreventingDataFetching,
}: UseMediaListProps): UseMediaListReturn => {
    const {
        data: mediaList = defaultEmptyList,
        isFetching: isFetchingMediaList,
        refetch: refetchMedia,
    } = inferQuery({
        entity: "media",
        action: "MEDIA_GET_MANY",
    })(
        {
            media_id: mediaIds,
        },
        {
            enabled: arrayHasItem(mediaIds) && !Boolean(isPreventingDataFetching),
            onError: (error) => {
                logger.error(`ERP useMediaList`, error);
            },
        }
    );

    return {
        mediaList: arrayHasItem(mediaIds) ? mediaList : defaultEmptyList,
        isFetchingMediaList,
        refetchMedia,
    };
};

export default useMediaList;
