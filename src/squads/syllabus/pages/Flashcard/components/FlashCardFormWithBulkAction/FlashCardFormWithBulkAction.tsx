import { useState } from "react";

import { Entities } from "src/common/constants/enum";
import logger from "src/squads/syllabus/internals/logger";
import inferMutation from "src/squads/syllabus/services/infer-mutation";

import { Box } from "@mui/material";
import DialogCancelConfirm from "src/components/Dialogs/DialogCancelConfirm";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";
import PaperBulkActions from "src/squads/syllabus/pages/Flashcard/components/PaperBulkActions";

import { Flashcard } from "../../common/types";
import FlashcardForm from "../FlashcardForm";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface FlashCardFormWithBulkActionProps {
    loId: string;
    defaultValues: Flashcard;
    onDeleteSuccess: (index: number) => void;
    index: number;
}

const FlashCardFormWithBulkActions = (props: FlashCardFormWithBulkActionProps) => {
    const { loId, defaultValues, onDeleteSuccess, index } = props;

    const tQuiz = useResourceTranslate(Entities.QUIZZES);
    const t = useTranslate();

    const showSnackbar = useShowSnackbar();

    const { mutate, isLoading } = inferMutation({
        entity: "quiz",
        action: "syllabusQuizDelete",
    })();

    const [visible, setVisible] = useState(false);

    const _onDeleteSuccess = (index: number) => {
        showSnackbar(tQuiz("flashcard.deleteSuccess"));
        onDeleteSuccess(index);
    };

    const onDelete = (flashcard: Flashcard, index: number) => {
        if (flashcard.draft) return _onDeleteSuccess(index);

        mutate(
            {
                loId,
                quizId: flashcard.externalId,
            },

            {
                onSuccess: () => {
                    _onDeleteSuccess(index);
                },
                onError: (err) => {
                    logger.warn("[FlashCardFormWithBulkActions]", err);

                    showSnackbar(t("ra.common.deleteFail"), "error");
                },
            }
        );
    };

    return (
        <Box data-testid="FlashCardFormWithBulkActions__root">
            <PaperBulkActions index={index + 1} onDelete={() => setVisible(true)}>
                <FlashcardForm keyPath={`flashcards.${index}.`} defaultValues={defaultValues} />
            </PaperBulkActions>
            <DialogCancelConfirm
                open={visible}
                onClose={() => setVisible(false)}
                onSave={() => onDelete(defaultValues, index)}
                title={tQuiz("flashcard.deleteCard")}
                footerConfirmButtonProps={{
                    disabled: isLoading,
                }}
                textCancelDialog={
                    <>
                        <TypographyPrimary component="span">
                            {tQuiz("flashcard.cardIndex", {
                                index: index.toString.length < 2 ? `0${index + 1}` : index + 1,
                            })}
                        </TypographyPrimary>
                        <TypographyTextSecondary component="span">
                            {t("ra.common.deleteConfirmText", { smart_count: 2 })}
                        </TypographyTextSecondary>
                    </>
                }
            />
        </Box>
    );
};

export default FlashCardFormWithBulkActions;
