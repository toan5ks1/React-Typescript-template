import { useCallback, useMemo } from "react";

import { Entities, MoveDirection } from "src/common/constants/enum";
import { QuizItemAttributeConfig } from "src/squads/syllabus/models/quiz";

import Box from "@mui/material/Box";
import { tableCellClasses } from "@mui/material/TableCell";
import { TableBase, TableBaseProps, TableColumn } from "src/components/Table";
import TypographyBase from "src/components/Typographys/TypographyBase";
import ImagePreview from "src/squads/syllabus/components/Images/ImagePreview";
import MoveUpDown from "src/squads/syllabus/components/MoveUpDown";
import AudioButtonPlayer from "src/squads/syllabus/pages/Flashcard/components/AudioButtonPlayer";

import { Flashcard } from "../../common/types";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useSwapOrder from "src/squads/syllabus/hooks/useSwapOrder";
import useSwapQuizOrder from "src/squads/syllabus/hooks/useSwapQuizOrder";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface FlashcardTableProps extends Pick<TableBaseProps<Flashcard>, "body" | "data"> {
    loId: string;
    refetch: () => void;
}

const FlashcardTable = (props: FlashcardTableProps) => {
    const { loId, data, refetch, body } = props;

    const t = useTranslate();

    const tQuiz = useResourceTranslate(Entities.QUIZZES);

    const { swap } = useSwapOrder<Flashcard>({
        data,
        key: "externalId",
    });
    const { updateOrder, isLoading } = useSwapQuizOrder();

    const onReOrder = useCallback(
        (action: MoveDirection, identity: string) => {
            const swapArr = swap(action, identity);

            if (swapArr) {
                const [first, second] = swapArr;
                updateOrder(
                    { loId, pairsList: [{ first: first.externalId, second: second.externalId }] },
                    {
                        onSuccess: () => {
                            refetch();
                        },
                    }
                );
            }
        },
        [loId, swap, updateOrder, refetch]
    );

    const size = data.length;

    const shouldShowAudio = useCallback((language?: QuizItemAttributeConfig) => {
        return language === QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_ENG;
    }, []);

    const columns: TableColumn<Flashcard>[] = useMemo(() => {
        return [
            {
                key: "term",
                title: tQuiz("term"),
                cellProps: {
                    style: {
                        verticalAlign: "text-top",
                    },
                },
                render: (flashcard) => {
                    const showAudio = shouldShowAudio(flashcard.termLanguage);
                    const marginTop = showAudio ? 1.25 : 0;

                    return (
                        <Box display="flex">
                            {showAudio && (
                                <Box mr={1} data-testid="FlashcardTable__termAudio">
                                    <AudioButtonPlayer src={flashcard.termAudio || ""} />
                                </Box>
                            )}
                            <Box mt={marginTop}>
                                <TypographyBase variant="body2">{flashcard.term}</TypographyBase>
                            </Box>
                        </Box>
                    );
                },
            },
            {
                key: "colDefinition",
                title: tQuiz("definition"),
                render: (flashcard) => {
                    const showAudio = shouldShowAudio(flashcard.definitionLanguage);
                    const marginTop = showAudio ? 1.25 : 0;
                    return (
                        <Box display="flex" justifyContent="space-between">
                            <Box display="flex" flex={1} mr={1}>
                                {showAudio && (
                                    <Box mr={1} data-testid="FlashcardTable__definitionAudio">
                                        <AudioButtonPlayer src={flashcard.definitionAudio || ""} />
                                    </Box>
                                )}
                                <Box mt={marginTop}>
                                    <TypographyBase variant="body2">
                                        {flashcard.definition}
                                    </TypographyBase>
                                </Box>
                            </Box>
                            <Box width={56} height={56} mt={marginTop}>
                                <ImagePreview src={flashcard.image} />
                            </Box>
                        </Box>
                    );
                },
            },
            {
                key: "colActions",
                title: t("ra.common.actions"),
                render: (flashcard, index) => {
                    return (
                        <Box gap={4}>
                            <MoveUpDown
                                moveDownProps={{
                                    disabled: isLoading || index === size - 1,
                                }}
                                moveUpProps={{
                                    disabled: isLoading || index === 0,
                                }}
                                identity={flashcard.externalId}
                                onClick={onReOrder}
                            />
                        </Box>
                    );
                },
                cellProps: {
                    style: {
                        width: "12%",
                        textAlign: "center",
                    },
                },
            },
        ];
    }, [t, isLoading, tQuiz, size, onReOrder, shouldShowAudio]);

    return (
        <div data-testid="FlashcardTable__root">
            <TableBase<Flashcard>
                body={body}
                data={data}
                columns={columns}
                withIndex={{
                    width: "5%",
                }}
                tableProps={{
                    sx: {
                        [`[class*='${tableCellClasses.root}']`]: {
                            verticalAlign: "text-top",
                        },
                    },
                }}
            />
        </div>
    );
};

export default FlashcardTable;
