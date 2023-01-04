import { EditorState } from "draft-js";

import { Box } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import QuizEditor from "src/squads/syllabus/pages/QuizV2/components/QuizEditor";

import QuizPreviewAnswer from "./QuizPreviewAnswer";

export type QuizPreviewFIBAnswerProps = {
    label: string;
    content: EditorState;
};

const QuizPreviewFIBAnswer = ({ content, label }: QuizPreviewFIBAnswerProps) => (
    <QuizPreviewAnswer correct={false} mt={2}>
        <Box display="flex" alignItems="center">
            {label ? (
                <TypographyBase
                    component="span"
                    variant="body1"
                    flex="1 0 auto"
                    px={2}
                    mr={1}
                    width={80}
                    color="text.disabled"
                >
                    {label}
                </TypographyBase>
            ) : null}
            <QuizEditor displayOnly editorState={content} />
        </Box>
    </QuizPreviewAnswer>
);

export default QuizPreviewFIBAnswer;
