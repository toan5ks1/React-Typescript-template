import { useMemo } from "react";

import { Features } from "src/common/constants/enum";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import { BookTypeKeys } from "../common/constants";

import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";

const useBookTypeRestrictInfo = (id: string) => {
    const { data, ...rest } = inferQuery({
        entity: "book",
        action: "syllabusBookGetOne",
    })(
        {
            book_id: id,
        },
        {
            enabled: true,
        }
    );

    const { isEnabled: isUseFlagAdHoc } = useFeatureToggle(Features.SYLLABUS_BOOK_BOOKTYPE_ADHOC);

    const isDisabled = useMemo((): boolean => {
        if (data && data.book_type) {
            return data.book_type === BookTypeKeys.BOOK_TYPE_ADHOC && isUseFlagAdHoc;
        }
        return true;
    }, [data, isUseFlagAdHoc]);

    return {
        isDisabled,
        ...rest,
    };
};

export default useBookTypeRestrictInfo;
