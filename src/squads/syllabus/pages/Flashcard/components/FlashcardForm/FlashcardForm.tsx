import { useFormContext } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { convertToChoices } from "src/common/utils/choice";
import { translateForChoices } from "src/squads/syllabus/common/utils/choice";
import { QuizItemAttributeConfig } from "src/squads/syllabus/models/quiz";

import { Box, Grid } from "@mui/material";
import SelectHF from "src/components/Select/SelectHF";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import UploadImagePreview from "src/squads/syllabus/components/InputFiles/UploadImagePreview";

import { Flashcard } from "../../common/types";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export const choiceLanguage = convertToChoices(
    {
        en: QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_ENG,
        ja: QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_JP,
    },
    "flashcardLanguage",
    Entities.QUIZZES
);

export interface FlashcardFormProps {
    keyPath?: string;
    defaultValues: Flashcard;
}

const FlashcardForm = (props: FlashcardFormProps) => {
    const { keyPath, defaultValues } = props;

    const t = useTranslate();
    const { setValue } = useFormContext();
    const tQuiz = useResourceTranslate(Entities.QUIZZES);

    const choices = translateForChoices(choiceLanguage, t);
    const keyPathSafe: string = typeof keyPath !== "undefined" ? keyPath : "";

    return (
        <Grid container alignItems="start">
            <Grid container item xs={11} margin={-1}>
                <Grid item xs={6} p={1}>
                    <TextFieldHF
                        name={`${keyPathSafe}term`}
                        label={tQuiz("term")}
                        required
                        rules={{
                            required: {
                                value: true,
                                message: t("resources.input.error.fieldCannotBeBlank", {
                                    field: tQuiz("term"),
                                }),
                            },
                        }}
                        defaultValue={defaultValues.term}
                    />
                </Grid>
                <Grid item xs={6} p={1}>
                    <TextFieldHF
                        name={`${keyPathSafe}definition`}
                        label={tQuiz("definition")}
                        required
                        rules={{
                            required: {
                                value: true,
                                message: t("resources.input.error.fieldCannotBeBlank", {
                                    field: tQuiz("definition"),
                                }),
                            },
                        }}
                        defaultValue={defaultValues.definition}
                    />
                </Grid>
                <Grid container item xs={6} p={1}>
                    <Grid item xs={5}>
                        <SelectHF
                            label={tQuiz("flashcard.termLanguage")}
                            name={`${keyPathSafe}termLanguage`}
                            options={choices}
                            defaultValue={defaultValues.termLanguage}
                        />
                    </Grid>
                </Grid>
                <Grid container item xs={6} p={1}>
                    <Grid item xs={5}>
                        <SelectHF
                            label={tQuiz("flashcard.definitionLanguage")}
                            name={`${keyPathSafe}definitionLanguage`}
                            options={choices}
                            defaultValue={defaultValues.definitionLanguage}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={1} flexGrow="1 !important" maxWidth="100% !important">
                <Box display="flex" flexDirection="row-reverse" height="100%">
                    <UploadImagePreview
                        defaultValue={defaultValues.image}
                        onChange={(src: string) => {
                            setValue(`${keyPathSafe}image`, src);
                        }}
                        onRemove={() => {
                            setValue(`${keyPathSafe}image`, undefined);
                        }}
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default FlashcardForm;
