import { QueryObserverResult, RefetchOptions } from "react-query";
import { arrayHasItem } from "src/common/utils/other";
import { Media } from "src/squads/communication/common/constants/types";
import { inferQuery } from "src/squads/communication/service/infer-query";

export interface UseMediaListReturn {
    mediaList: Media[];
    isFetchingMediaList: boolean;
    refetchMedia?: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<Media[], Error>>;
}

export interface UseMediaListProps {
    mediaIds?: string[];
    isPreventingDataFetching?: boolean;
}

const useMediaList = ({
    mediaIds,
    isPreventingDataFetching,
}: UseMediaListProps): UseMediaListReturn => {
    const {
        data: mediaList = [],
        isFetching: isFetchingMediaList,
        refetch: refetchMedia,
    } = inferQuery({ entity: "media", action: "communicationGetManyMedias" })<Media[]>(
        {
            media_id: mediaIds,
        },
        {
            enabled: arrayHasItem(mediaIds) && !Boolean(isPreventingDataFetching),
            onError: (error) => {
                window.warner?.warn(`ERP useMediaList`, error);
            },
        }
    );

    return { mediaList, isFetchingMediaList, refetchMedia };
};

export default useMediaList;
