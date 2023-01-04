import { ChangeEvent, useState } from "react";

import { useFormContext } from "react-hook-form";
import { toBase64 } from "src/squads/syllabus/common/utils/file";

import { Box } from "@mui/material";

import AvatarInput from "../AvatarInput";

export interface AvatarInputHFProps {
    readOnly: boolean;
    name: string;
    initialSource: string;
    onChange?: (files: FileList, base64: string) => void;
    onRemove?: () => void;
    mode?: "base64" | "files";
    // TODO: we will set shouldDelete is true as default value later
    shouldDelete?: boolean;
}

const AvatarInputHF = (props: AvatarInputHFProps) => {
    const { name, readOnly, onChange, mode, initialSource, shouldDelete, onRemove } = props;

    const { register, getValues, setValue } = useFormContext();
    const [src, setSrc] = useState<string | undefined>(() => getValues(initialSource));

    const _onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const base64 = (await toBase64(e.target.files[0])) as string;
            setSrc(base64);

            if (onChange) onChange(e.target.files, base64);
            if (mode) setValue(name, mode === "files" ? e.target.files : base64);
        }
    };

    const onDelete = () => {
        setSrc(undefined);
        setValue(name, undefined);

        setValue(initialSource, undefined);

        if (onRemove) onRemove();
    };

    return (
        <Box>
            <AvatarInput
                name={name}
                shouldDelete={shouldDelete}
                readOnly={readOnly}
                onChange={_onChange}
                onRemove={onDelete}
                src={src}
            />
            <Box display="none">
                <input {...register(initialSource)} />
            </Box>
        </Box>
    );
};

AvatarInputHF.defaultProps = {
    readOnly: false,
};

export default AvatarInputHF;
