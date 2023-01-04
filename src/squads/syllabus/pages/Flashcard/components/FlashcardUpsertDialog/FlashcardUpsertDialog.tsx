import { PropsWithChildren, useCallback, useState } from "react";

import { useFieldArray, useForm } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import logger from "src/squads/syllabus/internals/logger";
import { Quiz } from "src/squads/syllabus/models/quiz";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { NsSyllabus_Yasuo_CoursesService } from "src/squads/syllabus/services/yasuo/courses-service-yasuo/types";

import { Box, LinearProgress } from "@mui/material";
import DialogFullScreenHF from "src/components/Dialogs/DialogFullScreenHF";
import { DialogFullScreenHFProps } from "src/components/Dialogs/types";
import PaperRoundedBorders from "src/components/Papers/PaperRoundedBorders";
import ButtonCreateMore from "src/squads/syllabus/components/ButtonCreateMore";
import WrapperVerticalFooter from "src/squads/syllabus/components/Wrappers/WrapperVerticalFooter";

import { QuizType } from "manabuf/common/v1/contents_pb";

import { Flashcard } from "../../common/types";
import { convertFlashcardToQuiz } from "../../hooks/useConvertFlashcard";
import FlashCardFormWithBulkActions from "../FlashCardFormWithBulkAction";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface FlashcardUpsertDialogProps extends Pick<DialogFullScreenHFProps<{}>, "open"> {
    loId: string;
    createEmptyFlashcard: () => Flashcard;
    defaultValues: {
        flashcards: Flashcard[];
    };
    onSuccess: () => void;
    onClose: (shouldRefetch?: boolean) => void;
}

interface FlashcardForm {
    flashcards: Flashcard[];
}

const FlashcardUpsertDialog = (props: PropsWithChildren<FlashcardUpsertDialogProps>) => {
    const { defaultValues, loId, open, onClose, createEmptyFlashcard, onSuccess } = props;

    const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);

    const t = useTranslate();
    const tQuiz = useResourceTranslate(Entities.QUIZZES);
    const showSnackbar = useShowSnackbar();
    const methods = useForm<FlashcardForm>({
        defaultValues,
    });
    const { control, handleSubmit } = methods;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "flashcards",
    });

    const { mutate, isLoading } = inferMutation({
        entity: "quiz",
        action: "syllabusQuizUpsertV2",
    })();

    const onSubmit = ({ flashcards }: FlashcardForm) => {
        const quizList: Quiz[] = flashcards.map(convertFlashcardToQuiz);

        const payload: NsSyllabus_Yasuo_CoursesService.UpsertQuizV2 = {
            kind: QuizType.QUIZ_TYPE_POW,
            quizList,
        };

        mutate(payload, {
            onSuccess: () => {
                showSnackbar(tQuiz("flashcard.addSuccess"));
                onSuccess();
            },
            onError: (e) => {
                logger.warn("[FlashcardUpsertDialog]", e);

                showSnackbar(t("ra.common.addedFail"), "error");
            },
        });
    };

    const onCreateMore = () => {
        const flashcard = createEmptyFlashcard();
        append(flashcard);
    };

    const onRemove = (index: number, isDraft?: boolean) => {
        remove(index);

        if (!shouldRefetch && !isDraft) {
            setShouldRefetch(true);
        }
    };

    const _onClose = useCallback(() => {
        onClose(shouldRefetch);
    }, [onClose, shouldRefetch]);

    const disabled = isLoading || !fields.length;

    return (
        <DialogFullScreenHF
            methods={methods}
            open={open}
            onClose={_onClose}
            title={`${t("ra.common.action.add")}/${t("ra.common.action.edit")}`}
            onSave={handleSubmit(onSubmit)}
            footerConfirmButtonProps={{
                disabled,
            }}
        >
            <PaperRoundedBorders elevation={2}>
                <WrapperVerticalFooter footer={<ButtonCreateMore onClick={onCreateMore} />}>
                    {fields.map((field, index) => {
                        return (
                            <Box key={field.id} mt={3}>
                                <FlashCardFormWithBulkActions
                                    loId={loId}
                                    index={index}
                                    defaultValues={field}
                                    onDeleteSuccess={() => onRemove(index, field.draft)}
                                />
                            </Box>
                        );
                    })}
                </WrapperVerticalFooter>
            </PaperRoundedBorders>
            {isLoading && (
                <Box data-testid="FlashcardUpsertDialog__saving" mt={3}>
                    <LinearProgress />
                </Box>
            )}
        </DialogFullScreenHF>
    );
};

export default FlashcardUpsertDialog;
