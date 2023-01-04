import { Answer, Quiz } from "src/squads/syllabus/models/quiz";

import { Box, TextField, Theme } from "@mui/material";
import QuizEditor from "src/squads/syllabus/pages/Quiz/components/QuizEditor";

import AnswerReview from "./AnswerReview";

const sx = {
    wrapper: (theme: Theme) => ({
        display: "flex",
        alignItems: "center",
        "& > :fist-of-type": {
            marginRight: theme.spacing(8),
        },
    }),
    listType: (theme: Theme) => ({
        borderRadius: "50%",
        maxWidth: theme.spacing(10),
        height: 34,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: theme.spacing(1),
        overflow: "hidden",
        "& fieldset": {
            border: "none",
        },
    }),
};

export interface FillInBlankReviewProps {
    answer: Answer;
    labelType: Quiz["answer"]["labelType"];
}

const FillInBlankReview = (props: FillInBlankReviewProps) => {
    const { answer } = props;

    return (
        <AnswerReview {...props} correct={false}>
            <Box sx={sx.wrapper}>
                {answer.label ? (
                    <TextField
                        sx={sx.listType}
                        value={answer.label}
                        disabled
                        InputProps={{ readOnly: true }}
                    />
                ) : null}
                <QuizEditor editorState={answer.content} displayOnly />
            </Box>
        </AnswerReview>
    );
};

export default FillInBlankReview;
