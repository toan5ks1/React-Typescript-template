import { useCallback, useEffect, useRef } from "react";

import { Entities, SearchEngine } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import { parseQuery, stringifyQuery } from "src/squads/syllabus/common/utils/url";
import { AppError } from "src/squads/syllabus/internals/errors/errors";
import { Syllabus_LearningObjectivesOneQuery } from "src/squads/syllabus/services/eureka/eureka-types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";

import QuizDeleteConfirmDialog from "../../components/RelatedQuiz/QuizDeleteConfirmDialog";
import QuizReview from "../Quiz/components/QuizReview/QuizReview";
import AttachmentSection from "./components/AttachmentSection";
import QuizSection, { QuizSectionRefs } from "./components/QuizSection";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Paper, Theme } from "@mui/material";
import ButtonBase from "src/components/Buttons/ButtonBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import SpacingGroup from "src/components/Utilities/SpacingGroup";
import InformationIcon from "src/squads/syllabus/components/SvgIcons/InformationIcon";

import { LearningObjectiveType } from "manabuf/common/v1/enums_pb";

import useDialog from "../../hooks/useDialog";
import useShowSnackbar from "../../hooks/useShowSnackbar";
import useTranslate from "../../hooks/useTranslate";
import logger from "../../internals/logger";
import { OnChangeAttachmentProps } from "../../models/learning-objective";
import useQuizReview from "../Quiz/hooks/useQuizReview";

import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useTextCapitalize from "src/squads/syllabus/hooks/useTextCapitalize";

const sx = {
    reviewAction: {
        display: "flex",
        justifyContent: "flex-end",
    },
    editorNameInCaution: {
        maxHeight: "150px",
        overflow: "hidden",
    },
    paper: (theme: Theme) => ({
        padding: theme.spacing(4),
    }),
    content: (theme: Theme) => ({
        margin: theme.spacing(3, 0),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        "& > svg": {
            marginBottom: theme.spacing(4),
        },
    }),
};

export interface LOShowProps {
    record?: Syllabus_LearningObjectivesOneQuery["learning_objectives"][0];
    refetchLO: () => void;
}

// TODO: This component need to refactor(move logic of quiz table into QuizSection or QuizTable)
// TODO: refetch is get data LO detail, refresh to refresh data of quiz table
export const LOShow = ({ refetchLO, ...props }: LOShowProps) => {
    const record = props.record!;
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();
    const navigation = useNavigation();

    const { parentId, bookId, chapterId } = parseQuery();
    const { open: dialogOpen, onClose: onDialogClose, onOpen: onDialogOpen } = useDialog(false);
    const { quizOnReview, onCloseReview, onSetQuizReview } = useQuizReview();

    const childRef = useRef<QuizSectionRefs>();
    const { mutate: deleteQuiz, isLoading: loadingDeleteQuiz } = inferMutation({
        entity: "quiz",
        action: "syllabusQuizDelete",
    })({
        onSuccess: () => {
            showSnackbar(
                t(
                    "ra.common.deleteSuccess",
                    {
                        smart_count: questionName,
                    },
                    { lowercase: true }
                )
            );
            refetchLO();
            childRef.current && childRef.current.fetchQuiz();
            onCloseReview();
            onDialogClose();
        },
        onError: (e: Error) => {
            if (AppError.isAppError(e)) {
                return showSnackbar(t(`ra.manabie-error.${e.message}`), "error");
            }

            showSnackbar(`${t("ra.common.deleteFail")}: ${t("ra.manabie-error.unknown")}`, "error");
        },
    });

    const { mutate: updateLO, isLoading: isUploadingFile } = inferMutation({
        entity: "learningObjective",
        action: "syllabusLOUpsert",
    })();

    const onDeleteQuiz = () => {
        deleteQuiz({
            quizId: quizOnReview?.externalId || "", //it is named quizId but it is externalId in the end
            loId: quizOnReview?.loId || "",
        });
    };

    useEffect(() => {
        //fix bug not remove quizOnReview when user already left this page
        return () => {
            onSetQuizReview(null);
        };
    }, [onSetQuizReview]);

    const isLO = record?.type === KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING;

    const quizSearchURL = stringifyQuery({
        [SearchEngine.PARENT_ID]: String(record.lo_id),
        [SearchEngine.CHAPTER_ID]: String(chapterId),
        [SearchEngine.BOOK_ID]: String(bookId),
        [SearchEngine.TOPIC_ID]: String(parentId),
        [SearchEngine.TAB]: isLO ? 1 : 0,
    });

    const loName = t(`resources.${Entities.LOS}.lo`);
    const questionName = t(`resources.${Entities.QUIZZES}.question`);

    const onChangeAttachment = useCallback(
        async (props: OnChangeAttachmentProps) => {
            const {
                display_order,
                name,
                prerequisites,
                school_id: schoolId,
                topic_id: topicId,
                type,
                lo_id: loId,
                video,
                study_guide,
            } = record;

            let studyGuideUrl: undefined | string = study_guide || undefined;
            let videoId: undefined | string = video || undefined;

            if (props.type === "study_guide") studyGuideUrl = props.studyGuideUrl;

            if (props.type === "video") videoId = props.video.videoId;

            updateLO(
                {
                    loId,
                    name,
                    schoolId,
                    topicId: topicId as string,
                    video: videoId,
                    studyGuide: studyGuideUrl,
                    displayOrder: Number(display_order),
                    prerequisitesList: prerequisites || undefined,
                    type: type as keyof typeof LearningObjectiveType,
                },
                {
                    onSuccess: () => {
                        refetchLO();

                        showSnackbar(
                            t(
                                `ra.common.updatedSuccess`,
                                {
                                    smart_count: loName,
                                },
                                { lowercase: true }
                            )
                        );
                    },
                    onError: (e: Error) => {
                        showSnackbar(t(`ra.manabie-error.cannotUpload`), "error");
                        logger.warn("[LOShow] update material", e);
                    },
                }
            );
        },
        [updateLO, record, refetchLO, showSnackbar, t, loName]
    );

    const onEditQuiz = useCallback(() => {
        if (!quizOnReview || !record) return;

        navigation.push(
            `/${MicroFrontendTypes.SYLLABUS}/${Entities.QUIZZES}/${quizOnReview.quizId}/edit${quizSearchURL}`
        );
        onCloseReview();
    }, [quizOnReview, record, navigation, quizSearchURL, onCloseReview]);

    return (
        <>
            {record.type === KeyLOTypes.LEARNING_OBJECTIVE_TYPE_OFFLINE_LEARNING ? (
                <Paper sx={sx.paper}>
                    <TypographyBase variant="h5" sx={useTextCapitalize}>
                        {t(
                            `resources.${Entities.LOS}.choices.LearningObjectiveType.${KeyLOTypes.LEARNING_OBJECTIVE_TYPE_OFFLINE_LEARNING}`
                        )}
                    </TypographyBase>
                    <Box sx={sx.content}>
                        <InformationIcon />
                        <TypographyBase variant="subtitle2">
                            {t(`ra.message.noDataInformation`)}
                        </TypographyBase>
                    </Box>
                </Paper>
            ) : (
                <>
                    {isLO && (
                        <AttachmentSection
                            videoId={record.video!}
                            studyGuide={record.study_guide!}
                            onChangeAttachment={onChangeAttachment}
                            isLoadingFile={isUploadingFile}
                        />
                    )}
                    <QuizSection
                        ref={childRef}
                        loId={record.lo_id}
                        searchURL={quizSearchURL}
                        wrapperType={isLO ? "box" : "no-wrapper"}
                    />
                    {quizOnReview ? (
                        <>
                            <QuizReview
                                open={Boolean(quizOnReview)}
                                title={t(`resources.${Entities.QUIZZES}.questionDetail`)}
                                anchor="right"
                                quiz={quizOnReview}
                                aria-label="Quiz preview"
                                header={
                                    <SpacingGroup sx={sx.reviewAction} direction="horizontal">
                                        <ButtonBase
                                            startIcon={<DeleteIcon />}
                                            data-testid="QuizReview__deleteButton"
                                            onClick={onDialogOpen}
                                        >
                                            {t(`resources.${Entities.QUIZZES}.deleteQuestion`)}
                                        </ButtonBase>
                                        <ButtonBase
                                            startIcon={<EditIcon />}
                                            onClick={onEditQuiz}
                                            data-testid="QuizReview__editButton"
                                        >
                                            {t(`resources.${Entities.QUIZZES}.editQuestion`)}
                                        </ButtonBase>
                                    </SpacingGroup>
                                }
                                onClose={onCloseReview}
                            />
                            <QuizDeleteConfirmDialog
                                data-testid="LODetail__confirmDeleteQuizDialog"
                                open={dialogOpen}
                                onClose={onDialogClose}
                                onSave={onDeleteQuiz}
                                disable={loadingDeleteQuiz}
                            />
                        </>
                    ) : null}
                </>
            )}
        </>
    );
};

export default LOShow;
