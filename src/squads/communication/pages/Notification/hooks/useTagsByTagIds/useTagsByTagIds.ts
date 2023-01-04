import {
    Communication_GetListTagsByTagIdsQuery,
    Communication_GetListTagsByTagIdsQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { inferQuery } from "src/squads/communication/service/infer-query";

import { arrayHasItem } from "@manabie-com/mana-utils";
import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useTranslate from "src/squads/communication/hooks/useTranslate";

export interface UseTagsByTagIdsProps {
    tagIds: Communication_GetListTagsByTagIdsQueryVariables["tag_ids"];
}

export type UseTagsByTagIdsReturn = UseQueryBaseReturn<
    Communication_GetListTagsByTagIdsQuery["tags"] | undefined
>;

const useTagsByTagIds = ({ tagIds }: UseTagsByTagIdsProps): UseTagsByTagIdsReturn => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({
        entity: "tags",
        action: "communicationGetTagsByTagIds",
    })(
        {
            tag_ids: tagIds,
        },
        {
            enabled: arrayHasItem(tagIds),
            onError: (error) => {
                showSnackbar(t(error.message), "error");
                window.warner?.warn("useTagsByTagIds tags by tag ids", error);
            },
        }
    );
};

export default useTagsByTagIds;
