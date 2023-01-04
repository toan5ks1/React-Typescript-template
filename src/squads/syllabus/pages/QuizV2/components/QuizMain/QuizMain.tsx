import { FC, useCallback, useState } from "react";

import { useFormContext } from "react-hook-form";
import { Entities } from "src/common/constants/enum";

import ImageSearchOutlined from "@mui/icons-material/ImageSearchOutlined";
import { Box } from "@mui/material";
import ButtonPrimaryOutlined from "src/components/Buttons/ButtonPrimaryOutlined";
import DividerDashed from "src/components/Divider/DividerDashed";
import PaperRoundedBorders from "src/components/Papers/PaperRoundedBorders";
import TypographyBase from "src/components/Typographys/TypographyBase";
import QuizAnswer from "src/squads/syllabus/pages/QuizV2/components/QuizAnswer";
import QuizDescription from "src/squads/syllabus/pages/QuizV2/components/QuizDescription";
import QuizEditorHF from "src/squads/syllabus/pages/QuizV2/components/QuizEditorHF";
import QuizPreview from "src/squads/syllabus/pages/QuizV2/components/QuizPreview";
import QuizSection from "src/squads/syllabus/pages/QuizV2/components/QuizSection";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import QuizV2 from "src/squads/syllabus/models/quizV2";

export interface QuizMainProps {}

const QuizMain: FC<QuizMainProps> = () => {
    const t = useResourceTranslate(Entities.QUIZZES);
    const { getValues } = useFormContext<QuizV2>();
    const [quiz, setQuiz] = useState<QuizV2>();

    const onOpenPreview = useCallback(() => {
        setQuiz(getValues() as QuizV2);
    }, [setQuiz, getValues]);

    const onClosePreview = useCallback(() => {
        setQuiz(undefined);
    }, [setQuiz]);

    return (
        <>
            <PaperRoundedBorders data-testid="QuizMain__root">
                <Box px={4} py={3}>
                    <Box display="flex" justifyContent="end" mb={3}>
                        <ButtonPrimaryOutlined
                            data-testid="QuizMain__buttonPreview"
                            startIcon={<ImageSearchOutlined data-testid="QuizMain__iconPreview" />}
                            onClick={onOpenPreview}
                        >
                            {t("preview")}
                        </ButtonPrimaryOutlined>
                    </Box>
                    <Box
                        data-testid="QuizMain__container"
                        display="flex"
                        flexDirection="column"
                        gap={3}
                    >
                        <Box data-testid="QuizMain__description">
                            <QuizDescription />
                        </Box>
                        <DividerDashed />
                        <Box data-testid="QuizMain__answers">
                            <QuizAnswer />
                        </Box>
                        <DividerDashed />
                        <Box data-testid="QuizMain__explanation">
                            <QuizSection title={t("explanation")}>
                                <QuizEditorHF
                                    name="explanation.content"
                                    placeholder={t("explanation")}
                                    label={
                                        <TypographyBase variant="subtitle2" marginBottom={1}>
                                            {t("explanationDescription")}
                                        </TypographyBase>
                                    }
                                />
                            </QuizSection>
                        </Box>
                    </Box>
                </Box>
            </PaperRoundedBorders>
            {quiz ? (
                <QuizPreview
                    open
                    onClose={onClosePreview}
                    title={t("questionPreview")}
                    quiz={quiz}
                />
            ) : null}
        </>
    );
};

export default QuizMain;
