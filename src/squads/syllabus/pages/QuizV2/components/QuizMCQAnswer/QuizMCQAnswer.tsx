import { FC, useCallback } from "react";

import QuizAnswerList, { ItemRenderer } from "../QuizAnswerList";
import QuizMCQAnswerItem from "./QuizMCQAnswerItem";

const QuizMCQAnswer: FC = () => {
    const renderItem = useCallback<ItemRenderer>((props) => <QuizMCQAnswerItem {...props} />, []);

    return <QuizAnswerList testId="QuizMCQAnswer__answerList" renderItem={renderItem} />;
};

export default QuizMCQAnswer;
