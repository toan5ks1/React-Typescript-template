import { useMemo } from "react";

import { Entities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";

import QuizUpsert from "./components/QuizUpsert/QuizUpsert";
import Loading from "src/components/Loading";
import NotFound from "src/components/NotFound";

import { QuizContext } from "./contexts/QuizContext";
import useQuizEssentials from "./hooks/useQuizEssentials";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

const QuizEdit = () => {
    const tQuizzes = useResourceTranslate(Entities.QUIZZES);
    const { isFetching, lo, quiz } = useQuizEssentials();

    const isQuizInLO = useMemo(() => {
        if (!quiz?.externalId) return false;
        if (!lo?.quiz_sets) return false;
        return !!lo.quiz_sets.find((e) => e.quiz_external_ids.includes(quiz.externalId));
    }, [lo, quiz]);

    if (isFetching) return <Loading />;

    if (!isQuizInLO) {
        return <NotFound redirect={`/${MicroFrontendTypes.SYLLABUS}/${Entities.BOOKS}`} />;
    }

    return (
        <QuizContext.Provider value={{ mode: "edit", lo: lo! }}>
            <QuizUpsert title={tQuizzes("editQuestion")} initialData={quiz!} />
        </QuizContext.Provider>
    );
};

export default QuizEdit;
