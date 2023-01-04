import { useCallback, useEffect } from "react";

import { useSelector } from "react-redux";
import { useUnmount } from "react-use";
import { Entities, MutationMenus } from "src/common/constants/enum";
import { AppError } from "src/internals/errors";
import { MicroFrontendTypes } from "src/routing/type";
import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import {
    currentLOSelector,
    currentQuizSelector,
    quizValidSelector,
} from "src/squads/syllabus/store/quiz";

import QuizContent from "./components/QuizContent";
import QuizLayout from "./components/QuizLayout";
import Loading from "src/components/Loading";

import { QuizType } from "manabie-yasuo/quiz_pb";

import useNavigation from "../../hooks/useNavigation";
import useResourceTranslate from "../../hooks/useResourceTranslate";
import useShowSnackbar from "../../hooks/useShowSnackbar";
import useStrictQuiz from "../../hooks/useStrictEntity/useStrictQuiz";
import useTranslate from "../../hooks/useTranslate";
import logger from "../../internals/logger";
import useQuizUpdate from "../../pages/Quiz/hooks/useQuizUpdate";
import { RootState } from "../../store/store-types";
import useCheckQuizExternalId from "./hooks/useCheckQuizExternalId";
import useUpsertQuiz from "./hooks/useUpsertQuiz/useUpsertQuiz";

const Create = () => {
    const t = useTranslate();
    const tQuizzes = useResourceTranslate(Entities.QUIZZES);
    const showSnackbar = useShowSnackbar();
    const navigation = useNavigation();

    const lo = useSelector(currentLOSelector);
    const currentQuiz = useSelector(currentQuizSelector);
    const isQuizValid = useSelector(quizValidSelector);
    const quizOnReview = useSelector((state: RootState) => state.quiz.quizOnReview);
    const pdfUrl = useSelector((state: RootState) => state.quiz.pdfUrl);

    const { onCloseReview, onAddNewQuiz, onClearState } = useQuizUpdate();

    const { checkExternalIdIsValid, externalIdError } = useCheckQuizExternalId();

    const {
        isFetching,
        searchURL,
        id: loId,
    } = useStrictQuiz({
        action: MutationMenus.CREATE,
    });

    const { upsertQuiz: createQuiz, isLoading: loading } = useUpsertQuiz();

    useEffect(() => {
        if (currentQuiz || !lo) return;
        onAddNewQuiz({
            loId: lo.lo_id,
            schoolId: lo.school_id,
            isLo: lo.type === KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING,
            kind:
                lo.type === KeyLOTypes.LEARNING_OBJECTIVE_TYPE_EXAM_LO
                    ? QuizType.QUIZ_TYPE_MCQ
                    : undefined,
        });
    }, [lo, currentQuiz, onAddNewQuiz]);

    useUnmount(() => {
        onClearState();
    });

    const onBack = useCallback(() => {
        navigation.push(`/${MicroFrontendTypes.SYLLABUS}/${Entities.LOS}/${loId}/show${searchURL}`);
    }, [loId, navigation, searchURL]);

    const onSubmit = useCallback(async () => {
        if (!currentQuiz.externalId) return;

        const isValid = await checkExternalIdIsValid(currentQuiz.externalId);

        if (!isValid) return;

        createQuiz(
            { quiz: currentQuiz },
            {
                onSuccess: () => {
                    onBack();
                    showSnackbar(
                        t(
                            `ra.common.createdSuccess`,
                            {
                                smart_count: t(`resources.${Entities.QUIZZES}.question`),
                            },
                            { lowercase: true }
                        )
                    );
                },
                onError: (err: Error) => {
                    logger.warn("[QUIZ create]", err.message);

                    if (AppError.isAppError(err)) {
                        return showSnackbar(t(err.message), "error");
                    }

                    showSnackbar(t(`ra.common.createdFail`), "error");
                },
            }
        );
    }, [currentQuiz, checkExternalIdIsValid, createQuiz, onBack, showSnackbar, t]);

    if (isFetching) return <Loading />;

    return (
        <QuizLayout
            disabled={!isQuizValid || !!externalIdError}
            loading={loading}
            expandActionSpace={Boolean(pdfUrl)}
            quizOnReview={quizOnReview}
            onSubmit={onSubmit}
            onCancel={onBack}
            onCloseReview={onCloseReview}
            title={t("ra.page.create", { name: tQuizzes("question") })}
        >
            <QuizContent
                disabled={loading}
                pdfUrl={pdfUrl}
                externalIdProps={{ externalIdError, checkExternalId: checkExternalIdIsValid }}
            />
        </QuizLayout>
    );
};

export default Create;
