import { Entities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";

import QuizUpsert from "./components/QuizUpsert/QuizUpsert";
import Loading from "src/components/Loading";
import NotFound from "src/components/NotFound";

import { QuizContext } from "./contexts/QuizContext";
import useQuizEssentials from "./hooks/useQuizEssentials";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

const QuizCreate = () => {
    const tQuizzes = useResourceTranslate(Entities.QUIZZES);
    const { isFetching, lo } = useQuizEssentials();

    if (isFetching) return <Loading />;

    if (!lo)
        return (
            <NotFound
                data-testid="QuizCreate__notfound"
                redirect={`/${MicroFrontendTypes.SYLLABUS}/${Entities.BOOKS}`}
            />
        );

    return (
        <QuizContext.Provider value={{ mode: "create", lo }}>
            <QuizUpsert title={tQuizzes("createQuestion")} />
        </QuizContext.Provider>
    );
};

export default QuizCreate;
