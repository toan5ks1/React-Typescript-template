import { useCallback, useState } from "react";

import { Entities } from "src/common/constants/enum";
import { containsWhiteSpaces } from "src/common/utils/other";
import { AppError } from "src/internals/errors";
import logger from "src/squads/syllabus/internals/logger";

import useStandaloneQuery from "src/squads/syllabus/hooks/data/useStandaloneQuery";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface UseCheckQuizExternalIdValues {
    externalIdError: string;
    checkExternalIdIsValid: (externalId: string) => Promise<boolean>;
}

const useCheckQuizExternalId = () => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const { quiz } = useStandaloneQuery();
    const [err, setErr] = useState<string>("");

    const checkExternalIdIsValid = useCallback(
        async (externalId: string) => {
            if (externalId === "" || containsWhiteSpaces(externalId)) {
                setErr(t(`resources.${Entities.QUIZZES}.mappedIdMustNotContainWhiteSpaces`));

                return false;
            }

            try {
                const resp = await quiz.syllabusQuizGetByExternalId({
                    external_id: externalId,
                });

                if (resp?.length) {
                    setErr(t(`resources.${Entities.QUIZZES}.duplicateExternalId`));

                    return false;
                }
            } catch (err: any) {
                logger.error("[useCheckQuizExternalId]", err);

                const errorMessage = AppError.isAppError(err)
                    ? t(err.message)
                    : t(`ra.manabie-error.unknown`);

                showSnackbar(errorMessage, "error");

                return false;
            }

            setErr("");

            return true;
        },
        [t, quiz, showSnackbar]
    );

    return {
        checkExternalIdIsValid,
        externalIdError: err,
    };
};

export default useCheckQuizExternalId;
