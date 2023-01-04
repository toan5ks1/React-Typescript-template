import { ReactNode } from "react";

import { EditorState } from "draft-js";
import { Controller, useFormContext, ControllerProps } from "react-hook-form";

import { FormControl, FormHelperText } from "@mui/material";
import QuizEditor from "src/squads/syllabus/pages/QuizV2/components/QuizEditor/QuizEditor";
import { allToolbar } from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/EditorToolbar/Controls";

import QuizV2 from "src/squads/syllabus/models/quizV2";

export interface QuizEditorHFProps {
    defaultValue?: EditorState; //if you want to make a edit page, you must pass this value
    name: string;
    placeholder?: string;
    actions?: ReactNode | ReactNode[];
    label?: ReactNode;
    testId?: string;
    rules?: ControllerProps<QuizV2>["rules"];
}

const sx = {
    formControl: {
        "& .DraftEditor-editorContainer": {
            height: "100px !important",
            overflowY: "auto",
        },
    },
};

const QuizEditorHF = ({
    defaultValue,
    name,
    placeholder,
    actions,
    label,
    testId,
    rules,
}: QuizEditorHFProps) => {
    const { control } = useFormContext();

    return (
        <FormControl variant="outlined" sx={sx.formControl} fullWidth>
            {label}
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={rules}
                render={({ field: { onChange, value }, fieldState: { invalid, error } }) => (
                    <>
                        <QuizEditor
                            data-testid={testId}
                            onChange={onChange}
                            editorState={value}
                            placeholder={placeholder}
                            actions={actions}
                            toolbar={allToolbar}
                            error={invalid}
                            canPasteFile
                        />
                        {Boolean(error?.message) && (
                            <FormHelperText
                                variant="standard"
                                data-testid="QuizEditorHF__formHelperText"
                                error
                            >
                                {error!.message}
                            </FormHelperText>
                        )}
                    </>
                )}
            />
        </FormControl>
    );
};

export default QuizEditorHF;
