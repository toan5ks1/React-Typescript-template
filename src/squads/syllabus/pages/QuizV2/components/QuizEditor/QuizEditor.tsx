import { memo } from "react";

import { MathJaxLoadStatus } from "src/common/constants/enum";

import Loading from "src/components/Loading";
import Editor from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/Editor";
import { EditorProps } from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/Editor/types";
import useInstallMathJax from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/useInstallMathJax";

const EditorMemo = memo(Editor);

const QuizEditor = (props: EditorProps) => {
    const { loadStatus } = useInstallMathJax();

    if (loadStatus === MathJaxLoadStatus.LOADED) {
        return <EditorMemo {...props} />;
    }

    return <Loading size={24} />;
};

export default QuizEditor;
