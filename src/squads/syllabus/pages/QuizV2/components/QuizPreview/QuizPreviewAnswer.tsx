import { ReactNode } from "react";

import { Entities } from "src/common/constants/enum";

import { Box, BoxProps } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

export type QuizPreviewAnswerProps = BoxProps & {
    correct: boolean;
    children: ReactNode;
};

const sx = {
    correctAnswer: {
        borderColor: "#3ACE85",
    },
};

const QuizPreviewAnswer = ({ correct, children, ...rest }: QuizPreviewAnswerProps) => {
    const tQuiz = useResourceTranslate(Entities.QUIZZES);

    return (
        <Box
            position="relative"
            display="flex"
            alignItems="center"
            p={1}
            border={2}
            borderColor="border.main"
            borderRadius={2}
            {...rest}
            sx={[correct && sx.correctAnswer]}
        >
            {children}
            {correct && (
                <TypographyBase
                    variant="caption"
                    position="absolute"
                    py={0.5}
                    px={2 / 3}
                    right={16}
                    top={-12}
                    color="#3ACE85"
                    bgcolor="common.white"
                    textTransform="uppercase"
                    fontSize="0.625rem"
                >
                    {tQuiz("correct")}
                </TypographyBase>
            )}
        </Box>
    );
};

export default QuizPreviewAnswer;
