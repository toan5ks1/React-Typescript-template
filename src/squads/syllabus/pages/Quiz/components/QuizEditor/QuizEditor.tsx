import { MathJaxLoadStatus } from "src/common/constants/enum";

import Loading from "src/components/Loading";
import Editor from "src/squads/syllabus/pages/Quiz/components/WYSWYG/Editor";
import { EditorProps } from "src/squads/syllabus/pages/Quiz/components/WYSWYG/Editor/types";
import useInstallMathJax from "src/squads/syllabus/pages/Quiz/components/WYSWYG/useInstallMathJax";

const QuizEditor = (props: EditorProps) => {
    const { loadStatus } = useInstallMathJax();

    if (loadStatus === MathJaxLoadStatus.LOADED) {
        return <Editor {...props} canPasteFile />;
    }

    return <Loading size={24} />;
};

export default QuizEditor;
