import { useCallback } from "react";

import { Features } from "src/common/constants/enum";
import inferMutation from "src/squads/syllabus/services/infer-mutation";

import { removeLoadingImageFromQuizPayload } from "../../common/utils";

import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";

const useUpsertQuiz = () => {
    const { isEnabled } = useFeatureToggle(
        Features.SYLLABUS_RedirectUpsertQuizToQuizModifierService
    );

    const { mutate, isLoading } = inferMutation({
        entity: "quiz",
        action: isEnabled ? "syllabusQuizUpsertSingle" : "syllabusQuizUpsert",
    })();

    const upsertQuiz = useCallback(
        (...params: Parameters<typeof mutate>) => {
            const [payload, ...rest] = params;
            const quiz = removeLoadingImageFromQuizPayload(payload.quiz);
            mutate({ quiz }, ...rest);
        },
        [mutate]
    );

    return {
        upsertQuiz,
        isLoading,
    };
};

export default useUpsertQuiz;
