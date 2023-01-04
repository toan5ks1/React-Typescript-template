import { FC, useCallback } from "react";

import QuizAnswerList, { ItemRenderer } from "../QuizAnswerList";
import QuizMAQAnswerItem from "./QuizMAQAnswerItem";

const QuizMAQAnswer: FC = () => {
    const renderItem = useCallback<ItemRenderer>((props) => <QuizMAQAnswerItem {...props} />, []);

    return <QuizAnswerList testId="QuizMAQAnswer__answerList" renderItem={renderItem} />;
};

export default QuizMAQAnswer;
