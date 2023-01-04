import { memo } from "react";

import { Entities } from "src/common/constants/enum";
import { RectTypes } from "src/squads/syllabus/models/canvas";

import FunctionsIcon from "@mui/icons-material/Functions";
import ImageIcon from "@mui/icons-material/Image";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import { Paper, PaperProps, Theme } from "@mui/material";
import ButtonBase from "src/components/Buttons/ButtonBase";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

const sx = {
    root: {
        display: "flex",
        flexDirection: "column",
    },
    btn: (theme: Theme) => ({
        padding: theme.spacing(0.75, 2),
    }),
};

export interface RectTypeSelectionProps extends Omit<PaperProps, "onSelect"> {
    onSelect: (rectType: RectTypes) => void;
}

const RectTypeSelection = ({ onSelect, ...rest }: RectTypeSelectionProps) => {
    const t = useResourceTranslate(Entities.QUIZZES);

    return (
        <Paper sx={sx.root} square elevation={3} {...rest}>
            <ButtonBase
                sx={sx.btn}
                color="primary"
                variant="text"
                startIcon={<TextFieldsIcon />}
                onClick={() => {
                    onSelect(RectTypes.TEXT);
                }}
                data-testid="RectTypeSelection__text"
            >
                {t("text")}
            </ButtonBase>
            <ButtonBase
                sx={sx.btn}
                variant="text"
                color="primary"
                startIcon={<ImageIcon />}
                onClick={() => {
                    onSelect(RectTypes.IMAGE);
                }}
                data-testid="RectTypeSelection__image"
            >
                {t("image")}
            </ButtonBase>
            <ButtonBase
                sx={sx.btn}
                variant="text"
                color="primary"
                startIcon={<FunctionsIcon />}
                onClick={() => {
                    onSelect(RectTypes.TEX);
                }}
                data-testid="RectTypeSelection__tex"
            >
                {t("tex")}
            </ButtonBase>
        </Paper>
    );
};

export default memo(RectTypeSelection);
