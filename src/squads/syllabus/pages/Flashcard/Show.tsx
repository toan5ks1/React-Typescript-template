import { useCallback, useMemo, useState } from "react";

import { Entities } from "src/common/constants/enum";
import { Syllabus_LearningObjectivesOneQuery } from "src/squads/syllabus/services/eureka/eureka-types";

import FlashcardTable from "./components/FlashcardTable";
import FlashcardUpsertDialog from "./components/FlashcardUpsertDialog";
import { Box } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import ButtonUpsert from "src/squads/syllabus/components/ButtonUpsert";

import { Flashcard } from "./common/types";
import useConvertFlashcard from "./hooks/useConvertFlashcard";
import useGetFlashcard from "./hooks/useGetFlashcard";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

export interface ShowProps {
    record: Syllabus_LearningObjectivesOneQuery["learning_objectives"][0];
}

const Show = (props: ShowProps) => {
    const { record } = props;
    const { lo_id: loId, school_id: schoolId } = record;

    const [visible, setVisible] = useState(false);
    const tLO = useResourceTranslate(Entities.LOS);

    const { data = [], isLoading, isFetching, refetch } = useGetFlashcard({ loId });

    const { convertQuizToArrayForm, createEmptyFlashcard } = useConvertFlashcard();

    const _createEmptyFlashcard = useCallback(
        () => createEmptyFlashcard({ schoolId, loId }),
        [createEmptyFlashcard, loId, schoolId]
    );

    const onClose = useCallback(
        (shouldRefetch?: boolean) => {
            if (shouldRefetch) void refetch();
            setVisible(false);
        },
        [refetch]
    );

    const flashcards: Flashcard[] = useMemo(
        () => convertQuizToArrayForm(data, loId),
        [data, convertQuizToArrayForm, loId]
    );

    const defaultValues = useMemo(() => {
        if (flashcards.length) return flashcards;

        return [...Array(5).keys()].map(() => _createEmptyFlashcard());
    }, [_createEmptyFlashcard, flashcards]);

    return (
        <div data-testid="FlashcardV2__show">
            <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                <TypographyBase color="textPrimary">{tLO("cardListing")}</TypographyBase>
                <ButtonUpsert disabled={isLoading} onClick={() => setVisible(true)} />
            </Box>
            <FlashcardTable
                loId={loId}
                data={flashcards}
                refetch={refetch}
                body={{
                    loading: isLoading || isFetching,
                    rowKey: "externalId",
                }}
            />
            {visible && (
                <FlashcardUpsertDialog
                    open={visible}
                    onClose={onClose}
                    onSuccess={() => {
                        void refetch();
                        setVisible(false);
                    }}
                    defaultValues={{ flashcards: defaultValues }}
                    loId={loId}
                    createEmptyFlashcard={_createEmptyFlashcard}
                />
            )}
        </div>
    );
};

export default Show;
