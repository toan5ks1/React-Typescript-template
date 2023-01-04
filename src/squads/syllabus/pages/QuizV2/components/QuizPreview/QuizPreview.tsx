import { useMemo } from "react";

import { Entities } from "src/common/constants/enum";
import { getMainAnswersFIB, isQuizFIB, QuizType } from "src/squads/syllabus/models/quiz";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import { Close, Delete, Edit } from "@mui/icons-material";
import { Box, Drawer, Grid, IconButton, Theme } from "@mui/material";
import ButtonBase from "src/components/Buttons/ButtonBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import QuizEditor from "src/squads/syllabus/pages/QuizV2/components/QuizEditor";

import QuizPreviewFIBAnswer from "./QuizPreviewFIBAnswer";
import QuizPreviewMQAnswer from "./QuizPreviewMQAnswer";
import QuizPreviewText from "./QuizPreviewText";

import Can from "src/contexts/Can";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import QuizV2, { Answer } from "src/squads/syllabus/models/quizV2";

export type QuizPreviewProps = {
    open: boolean;
    title: string;
    quiz: QuizV2;
    onClose: () => void;
    onDelete?: () => void;
    onEdit?: () => void;
};

const sx = {
    root: (theme: Theme) => ({
        padding: 3,
        overflowX: "hidden",
        zIndex: theme.zIndex.modal,

        "& .Editor-root.Editor-displayOnly": {
            height: "auto",
        },
    }),
};

const QuizPreview = ({ open, title, quiz, onClose, onDelete, onEdit }: QuizPreviewProps) => {
    const tQuiz = useResourceTranslate(Entities.QUIZZES);
    const tLO = useResourceTranslate(Entities.LOS);
    const t = useTranslate();
    const { kind, difficultyLevel, taggedLOs, externalId, question, explanation, answer } = quiz;

    const { data: loList, isLoading } = inferQuery({
        entity: "learningObjective",
        action: "LO_GET_MANY_BY_IDS",
    })({ lo_id: taggedLOs as string[] }, { enabled: !!taggedLOs?.length });

    const mainAnswers: Answer[] = useMemo(() => {
        const { list } = answer || {};

        if (!isQuizFIB(kind)) {
            return list;
        }

        return getMainAnswersFIB(list);
    }, [answer, kind]);

    const answers = useMemo(
        () =>
            mainAnswers.map((mainAnswer) => {
                const { correct, content, label, id } = mainAnswer;

                switch (kind) {
                    case QuizType.QUIZ_TYPE_MCQ:
                    case QuizType.QUIZ_TYPE_MAQ:
                        return <QuizPreviewMQAnswer key={id} correct={correct} content={content} />;
                    case QuizType.QUIZ_TYPE_FIB:
                        return <QuizPreviewFIBAnswer key={id} label={label} content={content} />;
                    default:
                        return;
                }
            }),
        [mainAnswers, kind]
    );

    if (isLoading) {
        return null;
    }

    const taggedLOName: string = (!loList ? [] : loList.map((lo) => lo.name)).join(", ");

    return (
        <Drawer
            sx={sx.root}
            variant="temporary"
            role="sidebar"
            anchor="right"
            open={open}
            onClose={onClose}
            data-testid="QuizPreview__root"
        >
            <Box display="flex" flexDirection="column" py={2} px={3} width={450}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                    <TypographyBase variant="h6">{title}</TypographyBase>
                    <IconButton aria-label="close preview" onClick={onClose}>
                        <Close />
                    </IconButton>
                </Box>
                {(!!onDelete || !!onEdit) && (
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        mb={3}
                        p={2}
                        borderTop={1}
                        borderBottom={1}
                        borderColor="divider"
                    >
                        {onDelete ? (
                            <ButtonBase startIcon={<Delete />} onClick={onDelete}>
                                {t(`resources.${Entities.QUIZZES}.deleteQuestion`)}
                            </ButtonBase>
                        ) : null}
                        {onEdit ? (
                            <ButtonBase startIcon={<Edit />} onClick={onEdit}>
                                {t(`resources.${Entities.QUIZZES}.editQuestion`)}
                            </ButtonBase>
                        ) : null}
                    </Box>
                )}
                <Grid container>
                    <Can I="show.external_id" a="quizzes">
                        <Grid item xs={6}>
                            <QuizPreviewText
                                title="ID"
                                value={externalId}
                                data-testid="QuizPreview__externalId"
                            />
                        </Grid>
                    </Can>
                    <Grid item xs={6}>
                        <QuizPreviewText
                            title={tQuiz("questionType")}
                            value={t(`resources.choices.quizTypes.${kind}`)}
                            data-testid="QuizPreview__kind"
                        />
                    </Grid>
                    <Can I="show.difficulty" a="quizzes">
                        <Grid item xs={6}>
                            <QuizPreviewText
                                title={tQuiz("difficultyLevel")}
                                value={difficultyLevel!}
                                data-testid="QuizPreview__difficultyLevel"
                            />
                        </Grid>
                    </Can>
                    <Can I="show.tag_lo" a="quizzes">
                        <Grid item xs={12} mt={2}>
                            <QuizPreviewText
                                title={tLO("name")}
                                value={taggedLOName}
                                data-testid="QuizPreview__taggedLO"
                            />
                        </Grid>
                    </Can>
                </Grid>
                <Box>
                    <TypographyBase variant="h6" my={3} data-testid="QuizPreview__description">
                        {tQuiz("questionDescription")}
                    </TypographyBase>
                    <QuizEditor displayOnly editorState={question.content} />
                    {kind !== QuizType.QUIZ_TYPE_MIQ && answers}
                </Box>
                <Box>
                    <TypographyBase variant="h6" my={3} data-testid="QuizPreview__explanation">
                        {tQuiz("explanation")}
                    </TypographyBase>
                    <QuizEditor displayOnly editorState={explanation.content} />
                </Box>
            </Box>
        </Drawer>
    );
};

export default QuizPreview;
