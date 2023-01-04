import { memo, ReactNode, useMemo } from "react";

import { Entities } from "src/common/constants/enum";
import {
    getMainAnswersFIB,
    isQuizFIB,
    Quiz,
    QuizType,
    shouldVisibleExplanation,
} from "src/squads/syllabus/models/quiz";

import { Box, Divider, Drawer, DrawerProps, Grid, IconButton, SxProps, Theme } from "@mui/material";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import SpacingGroup from "src/components/Utilities/SpacingGroup";
import CloseIcon from "src/squads/syllabus/components/SvgIcons/CloseIcon";
import TextPreview from "src/squads/syllabus/components/TextPreview";
import QuizEditor from "src/squads/syllabus/pages/Quiz/components/QuizEditor";
import ReferenceReviewField from "src/squads/syllabus/pages/Quiz/components/ReferenceReviewField";
import { FormPropsProvider } from "src/squads/syllabus/providers/FormPropsProvider";

import { FillInBlankReview, MultipleChoiceReview } from "../AnswerReview";

import Can from "src/contexts/Can";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useTextCapitalize from "src/squads/syllabus/hooks/useTextCapitalize";
import useTextEntity from "src/squads/syllabus/hooks/useTextEntity";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import useQuizInstructionText from "src/squads/syllabus/pages/Quiz/hooks/useQuizInstructionText";

const sx = {
    wrapper: (theme: Theme) => ({
        padding: theme.spacing(3),
        width: 450,
    }),
    header: {},
    actionWrapper: {
        marginTop: "auto",
    },
    closeBtn: {
        minWidth: 120,
    },
    actions: {
        display: "flex",
        justifyContent: "space-between",
    },
};

export interface QuizPreviewProps extends DrawerProps {
    open: boolean;
    title: string;
    quiz: Quiz;
    anchor?: "right" | "left";
    header?: ReactNode | ReactNode[];
    onClose: () => void;
}

const QuizReview = (props: QuizPreviewProps) => {
    const { open, title, quiz, anchor = "right", onClose, header, ...rest } = props;
    const tQuiz = useResourceTranslate(Entities.QUIZZES);
    const t = useTranslate();

    const { textEntity, actionWrapper, actionPanel } = useTextEntity;

    const { answerInstruction } = useQuizInstructionText({ kind: quiz.kind });

    const isFlashCardQuiz = useMemo(
        () => quiz.kind === QuizType.QUIZ_TYPE_POW || quiz.kind === QuizType.QUIZ_TYPE_TAD,
        [quiz.kind]
    );

    const answers = useMemo(() => {
        const answerTemp = Array.from(quiz.answer.list.values());

        if (isQuizFIB(quiz.kind)) return getMainAnswersFIB(answerTemp);

        return answerTemp;
    }, [quiz.answer.list, quiz.kind]);

    const answersRendered = useMemo(() => {
        let result: JSX.Element[] = [];
        let currentIndex = 0;
        answers.forEach((answer) => {
            switch (quiz.kind) {
                case QuizType.QUIZ_TYPE_POW:
                case QuizType.QUIZ_TYPE_TAD:
                case QuizType.QUIZ_TYPE_MCQ:
                case QuizType.QUIZ_TYPE_MAQ: {
                    result.push(<MultipleChoiceReview key={currentIndex} answer={answer} />);
                    break;
                }
                case QuizType.QUIZ_TYPE_MIQ: {
                    result.push(
                        <QuizEditor key={currentIndex} displayOnly editorState={answer.content} />
                    );
                    break;
                }
                case QuizType.QUIZ_TYPE_FIB: {
                    result.push(
                        <FillInBlankReview
                            key={currentIndex}
                            answer={answer}
                            labelType={quiz.answer.labelType}
                        />
                    );
                    break;
                }
            }
            currentIndex++;
        });

        return result;
    }, [answers, quiz.answer.labelType, quiz.kind]);

    // always readOnly when review
    return (
        <FormPropsProvider readOnly>
            <Drawer
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: 450,
                    zIndex: 1300,
                }}
                role="sidebar"
                anchor={anchor}
                open={open}
                onClose={onClose}
                keepMounted={false}
                {...rest}
            >
                <SpacingGroup
                    spacing={24}
                    direction="vertical"
                    sx={sx.wrapper}
                    data-testid="QuizReview__root"
                >
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                        <Box sx={actionWrapper as SxProps<Theme>} flex={1}>
                            <TypographyHeader
                                color="textPrimary"
                                sx={[useTextCapitalize, textEntity]}
                            >
                                {title}
                            </TypographyHeader>
                        </Box>
                        <Box sx={actionPanel}>
                            <IconButton size="large" onClick={onClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    {header ? (
                        <SpacingGroup spacing={16} sx={sx.header}>
                            <Divider />
                            <div>{header}</div>
                            <Divider />
                        </SpacingGroup>
                    ) : null}
                    <Grid container spacing={2} pb={1}>
                        <Can I="show.external_id" a="quizzes">
                            <Grid item sm={6}>
                                <TextPreview
                                    title="ID"
                                    value={quiz.externalId}
                                    data-testid="QuizReview__id"
                                />
                            </Grid>
                            <Grid item sm={6} />
                        </Can>
                        <Grid item sm={6}>
                            <TextPreview
                                title={tQuiz("questionType")}
                                value={t(`resources.choices.quizTypes.${quiz.kind}`)}
                            />
                        </Grid>
                        <Can I="show.difficulty" a="quizzes">
                            <Grid item sm={6}>
                                <TextPreview
                                    title={tQuiz("difficultyLevel")}
                                    value={quiz.difficultyLevel}
                                    data-testid="QuizReview__difficultyLevel"
                                />
                            </Grid>
                        </Can>
                        <Can I="show.tag_lo" a="quizzes">
                            <Grid item sm={12}>
                                <ReferenceReviewField
                                    label={t(`resources.${Entities.LOS}.name`)}
                                    value={quiz.taggedLOs as string[]}
                                />
                            </Grid>
                        </Can>
                    </Grid>
                    <div data-testid="QuizReview__description">
                        <TypographyHeader sx={useTextCapitalize}>
                            <Box mt={1} mb={3}>
                                {isFlashCardQuiz ? tQuiz("term") : tQuiz("questionDescription")}
                            </Box>
                        </TypographyHeader>
                        <QuizEditor editorState={quiz.question.content} displayOnly />
                    </div>
                    {quiz.kind !== QuizType.QUIZ_TYPE_MIQ ? (
                        <div data-testid="QuizReview__answer">
                            {answerInstruction.secondary && (
                                <TypographyHeader sx={useTextCapitalize}>
                                    <Box mt={1} mb={3}>
                                        {tQuiz(answerInstruction.secondary)}
                                    </Box>
                                </TypographyHeader>
                            )}
                            <SpacingGroup spacing={12}>{answersRendered}</SpacingGroup>
                        </div>
                    ) : null}
                    {shouldVisibleExplanation(quiz.kind) && (
                        <div data-testid="QuizReview__explanation">
                            <TypographyHeader sx={useTextCapitalize}>
                                <Box mt={1} mb={3}>
                                    {tQuiz("explanation")}
                                </Box>
                            </TypographyHeader>
                            <QuizEditor editorState={quiz.explanation.content} displayOnly />
                        </div>
                    )}
                </SpacingGroup>
            </Drawer>
        </FormPropsProvider>
    );
};

export default memo(QuizReview);
