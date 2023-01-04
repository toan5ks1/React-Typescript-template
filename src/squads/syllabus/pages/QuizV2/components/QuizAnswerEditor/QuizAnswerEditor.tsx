import { FC, MouseEventHandler, useMemo } from "react";

import DeleteButton from "../DeleteButton";
import QuizEditorHF, { QuizEditorHFProps } from "../QuizEditorHF";

export interface QuizAnswerEditorProps extends QuizEditorHFProps {
    onRemove: MouseEventHandler<HTMLButtonElement>;
    shouldDisableRemove?: boolean;
}

const QuizAnswerEditor: FC<QuizAnswerEditorProps> = ({
    onRemove,
    shouldDisableRemove,
    testId,
    ...props
}) => {
    const actions = useMemo<QuizEditorHFProps["actions"]>(
        () => [<DeleteButton key="delete" disabled={shouldDisableRemove} onClick={onRemove} />],
        [onRemove, shouldDisableRemove]
    );
    return <QuizEditorHF {...props} testId={testId} actions={actions} />;
};

export default QuizAnswerEditor;
