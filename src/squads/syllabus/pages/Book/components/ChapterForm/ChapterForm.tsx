import { Box } from "@mui/material";
import ButtonBase from "src/components/Buttons/ButtonBase";
import ButtonCreate from "src/components/Buttons/ButtonCreate";
import TextFieldHF from "src/components/TextFields/TextFieldHF";

import useBookDetail from "src/squads/syllabus/hooks/useBookDetail";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface ChapterFormData {
    name: string;
}

export interface ChapterFormProps {
    open?: boolean;
    onClose: () => void;
    onOpen?: () => void;
    disableSubmit: boolean;
}

const ChapterForm = (props: ChapterFormProps) => {
    const t = useTranslate();
    const { open, onClose, onOpen, disableSubmit } = props;
    const { isDisableAction } = useBookDetail();

    return (
        <Box
            borderRadius={1}
            borderColor="primary"
            data-testid="ChapterForm__root"
            sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                padding: theme.spacing(0.875, 2.5),
                border: `1px solid ${theme.palette.border?.main}`,
            })}
        >
            <Box display="flex" justifyContent="space" width="100%">
                {open && (
                    <TextFieldHF
                        required
                        name="name"
                        size="small"
                        rules={{
                            required: {
                                value: true,
                                message: t("resources.input.error.required"),
                            },
                        }}
                        label={t("resources.chapters.chapterName")}
                    />
                )}

                {open ? (
                    <Box display="flex" pl={5} height={36}>
                        <ButtonBase
                            data-testid="ChapterForm__cancel"
                            color="default"
                            variant="text"
                            onClick={onClose}
                        >
                            {t("ra.action.cancel")}
                        </ButtonBase>
                        <Box display="flex" pl={3}>
                            <ButtonCreate
                                disabled={disableSubmit}
                                data-testid="ChapterForm__submit"
                                type="submit"
                            >
                                {t("ra.action.save")}
                            </ButtonCreate>
                        </Box>
                    </Box>
                ) : (
                    <ButtonCreate
                        color="primary"
                        disableElevation
                        disableFocusRipple
                        variant="text"
                        onClick={onOpen}
                        disabled={isDisableAction}
                        data-testid="ChapterForm__visibleFormControl"
                    >
                        {t("resources.chapters.addTitle")}
                    </ButtonCreate>
                )}
            </Box>
        </Box>
    );
};

export default ChapterForm;
