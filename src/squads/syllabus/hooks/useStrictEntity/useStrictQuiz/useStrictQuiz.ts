import { useMemo } from "react";

import { useDispatch } from "react-redux";
import { Entities, SearchEngine } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { parseQuery, stringifyQuery } from "src/squads/syllabus/common/utils/url";
import { LOWithQuizSet } from "src/squads/syllabus/models/quizset-lo";
import { inferQuery } from "src/squads/syllabus/services/infer-query";
import { QuizActions } from "src/squads/syllabus/store/quiz";

import useNavigation from "../../useNavigation";
import useNotifyForm, { NotifyFormReturn } from "../../useNotifyForm";
import useShowSnackbar from "../../useShowSnackbar";
import useTranslate from "../../useTranslate";
import { StrictEntityProps } from "../strict-entity-types";

export interface UseStrictQuizValues {
    onNotify: NotifyFormReturn;
    searchURL: string;
    id: string;
    isFetching: boolean;
}

const useStrictQuiz = (props: StrictEntityProps): UseStrictQuizValues => {
    const t = useTranslate();
    const dispatch = useDispatch();
    const showSnackbar = useShowSnackbar();
    const navigation = useNavigation();

    const { parentId } = parseQuery(window.location.search);

    const { chapterId, tab, topicId, bookId } = parseQuery();

    const entityName = t(`resources.${Entities.QUIZZES}.question`);

    const { isFetching } = inferQuery({
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
            onSuccess: (data) => {
                // TODO: Check and fix type
                dispatch(QuizActions.setCurrentLO(data as unknown as LOWithQuizSet));
            },
        }
    );

    const searchURL = useMemo(() => {
        return stringifyQuery({
            [SearchEngine.TAB]: Number(tab),
            [SearchEngine.PARENT_ID]: String(topicId),
            [SearchEngine.CHAPTER_ID]: String(chapterId),
            [SearchEngine.BOOK_ID]: String(bookId),
        });
    }, [bookId, chapterId, tab, topicId]);

    return {
        onNotify: useNotifyForm({
            action: props.action,
            entityName,
        }),
        searchURL,
        id: parentId as string,
        isFetching,
    };
};

export default useStrictQuiz;
