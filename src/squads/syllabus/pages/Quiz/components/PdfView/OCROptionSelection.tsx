import { useSelector } from "react-redux";
import { RectTypes } from "src/squads/syllabus/models/canvas";
import { answersSelector, quizTypeSelector } from "src/squads/syllabus/store/quiz";

import { Popper } from "@mui/material";
import { PopperProps } from "src/squads/syllabus/components/Popper";

import FieldTypeSelection, { FieldTypeSelectionProps } from "./FieldTypeSelection";
import RectTypeSelection, { RectTypeSelectionProps } from "./RectTypeSelection";
import { SelectFieldState } from "./enum";

export interface OCROptionSelectionProps extends Omit<PopperProps, "children" | "onClose"> {
    popperRef: PopperProps["popperRef"];
    selectFieldState: SelectFieldState | null;

    onSelectFieldType: FieldTypeSelectionProps["onSelect"];
    onSelectRectType: RectTypeSelectionProps["onSelect"];
    rectType?: RectTypes;
}

const OCROptionSelection = (props: OCROptionSelectionProps) => {
    const {
        open,
        anchorEl,
        popperRef,
        selectFieldState,
        onSelectFieldType,
        onSelectRectType,
        rectType,
        ...rest
    } = props;
    const answers = useSelector(answersSelector);
    const quizType = useSelector(quizTypeSelector);
    return (
        <Popper
            popperRef={popperRef}
            open={open}
            anchorEl={anchorEl}
            placement="bottom-end"
            keepMounted={false}
            {...rest}
        >
            {selectFieldState === SelectFieldState.FIELD_TYPE ? (
                <FieldTypeSelection
                    quizType={quizType}
                    rectType={rectType}
                    answers={answers}
                    data-testid="OCROptionSelection__fieldType"
                    onSelect={onSelectFieldType}
                />
            ) : (
                <RectTypeSelection
                    data-testid="OCROptionSelection__rectType"
                    onSelect={onSelectRectType}
                />
            )}
        </Popper>
    );
};

export default OCROptionSelection;
