import { useDispatch, useSelector } from "react-redux";
import { Entities } from "src/common/constants/enum";
import { currentQuizSelector, QuizActions } from "src/squads/syllabus/store/quiz";
import { StandardProps } from "src/squads/syllabus/typings/react-component";

import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { Box, Paper, Theme } from "@mui/material";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";
import SpacingGroup from "src/components/Utilities/SpacingGroup";
import BaseBox from "src/squads/syllabus/components/BaseBox";

import { ExternalIdProps } from "../../types";
import QuizBuilder from "../QuizBuilder";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useTextEntity from "src/squads/syllabus/hooks/useTextEntity";

const sx = {
    actionWrapper: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
    },
    previewBtn: (theme: Theme) => ({
        backgroundColor: theme.palette.blue?.[500],
        "&:hover": {
            backgroundColor: theme.palette.blue?.[500],
        },
        "&:focus": {
            backgroundColor: theme.palette.blue?.[500],
        },
    }),
};

export interface QuizMainProps extends StandardProps {
    dispatch: ReturnType<typeof useDispatch>;
    externalIdProps: ExternalIdProps;
}

const QuizMain = (props: QuizMainProps) => {
    const { dispatch, className, externalIdProps } = props;
    const t = useResourceTranslate(Entities.QUIZZES);

    const { actionPanel } = useTextEntity;
    const currentQuiz = useSelector(currentQuizSelector);

    return (
        <BaseBox>
            <Paper className={className} elevation={0}>
                <Box sx={actionPanel} mb={3}>
                    <SpacingGroup direction="horizontal" sx={sx.actionWrapper}>
                        <ButtonPrimaryContained
                            data-testid="QuizTable__previewButton"
                            startIcon={<ImageSearchIcon />}
                            sx={sx.previewBtn}
                            onClick={() => {
                                dispatch(QuizActions.setQuizOnReview(currentQuiz));
                            }}
                        >
                            {t("preview")}
                        </ButtonPrimaryContained>
                    </SpacingGroup>
                </Box>

                <QuizBuilder currentQuiz={currentQuiz} externalIdProps={externalIdProps} />
            </Paper>
        </BaseBox>
    );
};

export default QuizMain;
