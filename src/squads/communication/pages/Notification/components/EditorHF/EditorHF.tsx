import { EditorState } from "draft-js";
import { Controller, useFormContext } from "react-hook-form";
import { HookFormControllerOptionProps } from "src/squads/communication/typings/react-hook-form";

import { FormControl, FormHelperText } from "@mui/material";
import { styled } from "@mui/material/styles";
import Editor from "src/squads/communication/pages/Notification/components/WYSWYG/Editor";
import {
    InlineBold,
    InlineItalic,
    InlineUnderline,
} from "src/squads/communication/pages/Notification/components/WYSWYG/EditorToolbar/Controls";
import BlockOrderList from "src/squads/communication/pages/Notification/components/WYSWYG/EditorToolbar/Controls/BlockOrderList";
import BlockUnOrderList from "src/squads/communication/pages/Notification/components/WYSWYG/EditorToolbar/Controls/BlockUnOrderList";
import InlineColor from "src/squads/communication/pages/Notification/components/WYSWYG/EditorToolbar/Controls/InlineColor";
import InlineLink from "src/squads/communication/pages/Notification/components/WYSWYG/EditorToolbar/Controls/InlineLink";
import {
    Controls,
    ToolbarType,
} from "src/squads/communication/pages/Notification/components/WYSWYG/EditorToolbar/toolbar-types";

const PREFIX = "EditorHF";

const classes = {
    notifyHF: `${PREFIX}-notifyHF`,
};

const StyledFormControl = styled(FormControl)(() => ({
    [`& .${classes.notifyHF}`]: {
        height: 130,
        overflowY: "auto",
    },
}));

export interface EditorHFProps extends HookFormControllerOptionProps {
    defaultValue?: EditorState; //if you want to make a edit page, you must pass this value
    selector: string;
    name: string;
    placeholder?: string;
}

const toolbarNotify: ToolbarType = {
    [Controls.INLINE]: [InlineBold, InlineItalic, InlineUnderline, InlineColor, InlineLink],
    [Controls.BLOCK]: [BlockUnOrderList, BlockOrderList],
};

const EditorHF = ({ rules, defaultValue, name, selector, placeholder }: EditorHFProps) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <StyledFormControl variant="outlined" fullWidth data-js={selector}>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={rules}
                render={({ field: { onChange, value } }) => {
                    return (
                        <Editor
                            error={!!(errors && errors[name])}
                            toolbar={toolbarNotify}
                            onChange={onChange}
                            editorState={value}
                            editorClassName={{
                                wrapperDraft: classes.notifyHF,
                            }}
                            placeholder={placeholder}
                        />
                    );
                }}
            />

            {errors && errors[name] && (
                <FormHelperText variant="standard" error={true}>
                    {errors[name].message}
                </FormHelperText>
            )}
        </StyledFormControl>
    );
};

export default EditorHF;
