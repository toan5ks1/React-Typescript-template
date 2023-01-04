import { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useUnmount } from "react-use";
import { Entities, MutationMenus, NotifyActions, NotifyTypes } from "src/common/constants/enum";
import { AppError } from "src/internals/errors";
import { MicroFrontendTypes } from "src/routing/type";
import { QuizzesOneQuery } from "src/squads/syllabus/services/eureka/eureka-types";
import {
    currentLOSelector,
    currentQuizSelector,
    QuizActions,
    quizValidSelector,
} from "src/squads/syllabus/store/quiz";

import { QuizContent } from "./components/QuizContent";
import QuizLayout from "./components/QuizLayout";
import Loading from "src/components/Loading";
import NotFound from "src/components/NotFound";

import useNavigation from "../../hooks/useNavigation";
import useResourceTranslate from "../../hooks/useResourceTranslate";
import useShowSnackbar from "../../hooks/useShowSnackbar";
import useStrictQuiz from "../../hooks/useStrictEntity/useStrictQuiz";
import useTranslate from "../../hooks/useTranslate";
import logger from "../../internals/logger";
import { convertQuizHasuraToQuiz } from "../../models/quiz";
import useQuizUpdate from "../../pages/Quiz/hooks/useQuizUpdate";
import { inferQuery } from "../../services/infer-query";
import { RootState } from "../../store/store-types";
import useUpsertQuiz from "./hooks/useUpsertQuiz/useUpsertQuiz";

import isEmpty from "lodash/isEmpty";

const Edit = () => {
    const { id: quizId } = useParams<{ id: string }>();
    const t = useTranslate();
    const tQuizzes = useResourceTranslate(Entities.QUIZZES);
    const dispatch = useDispatch();
    const showSnackbar = useShowSnackbar();

    const isQuizValid = useSelector(quizValidSelector);
    const currentQuiz = useSelector(currentQuizSelector);
    const quizOnReview = useSelector((state: RootState) => state.quiz.quizOnReview);
    const pdfUrl = useSelector((state: RootState) => state.quiz.pdfUrl);
    const { onCloseReview, onClearState } = useQuizUpdate();
    const lo = useSelector(currentLOSelector);
    const { upsertQuiz: updateQuiz, isLoading: updateRecordLoading } = useUpsertQuiz();

    const {
        isFetching: fetchParentLoading,
        id: loId,
        searchURL,
        onNotify: quizNotify,
    } = useStrictQuiz({
        action: MutationMenus.EDIT,
    });
    const navigation = useNavigation();

    const onBackLODetail = useCallback(() => {
        navigation.push(`/${MicroFrontendTypes.SYLLABUS}/${Entities.LOS}/${loId}/show${searchURL}`);
    }, [loId, navigation, searchURL]);

    const { isLoading: fetchRecordLoading } = inferQuery({
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
                dispatch(QuizActions.setCurrentQuiz(convertQuizHasuraToQuiz(data, loId as string)));
            },
            onError: (err) => {
                logger.warn("Quiz Edit page", err);

                showSnackbar(t("ra.notification.item_doesnt_exist"), "error");
                onBackLODetail();
            },
        }
    );

    useUnmount(() => {
        onClearState();
    });

    const onUpdateQuiz = useCallback(() => {
        updateQuiz(
            { quiz: currentQuiz },
            {
                onSuccess: () => {
                    onBackLODetail();
                    // TODO: actual the 2nd param is not used
                    quizNotify(NotifyActions.SUCCESS, {}, "");
                },
                onError: (err: Error) => {
                    logger.warn("[QUIZ edit]", err);

                    if (AppError.isAppError(err)) {
                        return showSnackbar(t(err.message), NotifyTypes.ERROR);
                    }

                    quizNotify(NotifyActions.FAILURE, {}, t(err.message));
                },
            }
        );
    }, [updateQuiz, currentQuiz, onBackLODetail, quizNotify, showSnackbar, t]);

    if (fetchRecordLoading || fetchParentLoading) return <Loading />;

    if (
        !currentQuiz ||
        //if quiz set does not contain externalId, then this quiz should be deleted
        !currentQuiz.externalId ||
        !lo ||
        !(lo.quiz_sets || []).find((e) => e.quiz_external_ids.includes(currentQuiz.externalId))
    ) {
        return <NotFound redirect={`/${MicroFrontendTypes.SYLLABUS}/${Entities.BOOKS}`} />;
    }

    return (
        <QuizLayout
            loading={updateRecordLoading}
            disabled={!isQuizValid}
            expandActionSpace={Boolean(pdfUrl)}
            quizOnReview={quizOnReview}
            onCancel={onBackLODetail}
            onSubmit={onUpdateQuiz}
            onCloseReview={onCloseReview}
            title={tQuizzes("editQuestion")}
        >
            <QuizContent
                disabled={updateRecordLoading}
                pdfUrl={pdfUrl}
                externalIdProps={{ editExternalIdDisabled: true }}
            />
        </QuizLayout>
    );
};

export default Edit;
