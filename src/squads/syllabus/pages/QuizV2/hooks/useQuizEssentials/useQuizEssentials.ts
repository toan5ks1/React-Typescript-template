import { useCallback, useMemo } from "react";

import { useLocation, useParams } from "react-router";
import { Entities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { parseQuery } from "src/squads/syllabus/common/utils/url";
import logger from "src/squads/syllabus/internals/logger";
import { LOWithQuizSet } from "src/squads/syllabus/models/quizset-lo";
import { QuizzesOneQuery } from "src/squads/syllabus/services/eureka/eureka-types";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import isEmpty from "lodash/isEmpty";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import QuizV2, { convertQuizHasuraToQuizV2 } from "src/squads/syllabus/models/quizV2";

export interface UseQuizEssentialsValues {
    isFetching: boolean;
    loId?: string;
    lo?: LOWithQuizSet;
    quiz: QuizV2 | null;
}

const useQuizEssentials = (): UseQuizEssentialsValues => {
    const t = useTranslate();
    const { id: quizId } = useParams<{ id: string }>();
    const { parentId } = parseQuery();
    const showSnackbar = useShowSnackbar();
    const navigation = useNavigation();
    const location = useLocation();

    const onBackLODetail = useCallback(() => {
        navigation.push(
            `/${MicroFrontendTypes.SYLLABUS}/${Entities.LOS}/${parentId}/show${
                location.search || ""
            }`
        );
    }, [navigation, parentId, location.search]);

    const { isLoading: isLoadingQuiz, data: quizData } = inferQuery({
        entity: "quizzes",
        action: "syllabusQuizGetOne",
    })<QuizzesOneQuery["quizzes"][0]>(
        {
            quiz_id: quizId,
        },
        {
            enabled: Boolean(quizId),
            onSuccess: (data) => {
                if (isEmpty(data)) {
                    logger.warn("Cannot found QUIZ_GET_ONE data by quiz_id", quizId);

                    showSnackbar(t("ra.notification.item_doesnt_exist"), "error");
                    return;
                }
            },
            onError: (err) => {
                logger.warn("Quiz Edit page", err);

                showSnackbar(t("ra.notification.item_doesnt_exist"), "error");
                onBackLODetail();
            },
        }
    );

    const quiz = useMemo(
        () =>
            quizData && parentId ? convertQuizHasuraToQuizV2(quizData, parentId as string) : null,
        [parentId, quizData]
    );

    const { isLoading: isLoadingLo, data: lo } = inferQuery({
        entity: "learningObjective",
        action: "LO_GET_ONE",
    })(
        {
            lo_id: parentId as string,
        },
        {
            enabled: true,
            onError: (e) => {
                showSnackbar(t(e.message));
                const isRecordNotExist = e.message === "ra.notification.item_doesnt_exist";

                if (isRecordNotExist)
                    navigation.push(`/${MicroFrontendTypes.SYLLABUS}/${Entities.BOOKS}`);
            },
        }
    );

    const isFetching = useMemo(() => isLoadingQuiz || isLoadingLo, [isLoadingLo, isLoadingQuiz]);

    return {
        isFetching,
        quiz,
        loId: parentId as string,
        lo: lo as unknown as LOWithQuizSet,
    };
};

export default useQuizEssentials;
