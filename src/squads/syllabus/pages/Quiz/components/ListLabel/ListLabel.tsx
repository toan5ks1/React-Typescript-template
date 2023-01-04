import { ChangeEvent, ElementType, HtmlHTMLAttributes, memo } from "react";

import { Entities } from "src/common/constants/enum";
import { LabelTypes } from "src/common/utils/label-generator";
import { Quiz } from "src/squads/syllabus/models/quiz";

import { Box, SxProps, TextField, Theme } from "@mui/material";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

export interface ListLabelProps extends HtmlHTMLAttributes<HTMLDivElement> {
    type: Quiz["answer"]["labelType"];
    label: string;
    readOnly?: boolean;
    component?: ElementType;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    sx?: SxProps<Theme>;
}

const ListLabel = (props: ListLabelProps) => {
    const tQuizzes = useResourceTranslate(Entities.QUIZZES);
    const { label, readOnly = false, onChange, type, sx } = props;

    return (
        <Box sx={sx}>
            {/*TODO: Refactor to TextFieldBase component*/}
            <TextField
                value={label}
                disabled={type === LabelTypes.CUSTOM ? readOnly : true}
                onChange={onChange}
                label={tQuizzes("prefix")}
                data-testid="ListLabel__prefix"
            />
        </Box>
    );
};

export default memo(ListLabel);
