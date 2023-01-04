import { ChangeEvent, useEffect, useRef } from "react";

import { Close, AddAPhotoOutlined } from "@mui/icons-material";
import { Box, Theme } from "@mui/material";
import IconButtonBase from "src/components/IconButton/IconButtonBase";

const sx = {
    root: (theme: Theme) => ({
        // Fixed by UI
        height: 112,
        width: 112,
        backgroundColor: theme.palette.grey[200],
    }),
    labelFor: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translateY(-50%) translateX(-50%)",
    },
    delete: (theme: Theme) => ({
        position: "absolute",
        top: 0,
        right: 0,
        padding: theme.spacing(1),
        backgroundColor: theme.palette.grey[200],
        zIndex: 10,
    }),
    icon: (theme: Theme) => ({
        color: theme.palette.text.secondary,
    }),
};

export interface AvatarInputProps {
    readOnly: boolean;
    src?: string;
    name: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onRemove?: () => void;
    shouldDelete?: boolean;
}

const AvatarInput = (props: AvatarInputProps) => {
    const { src, name, readOnly, onChange, shouldDelete, onRemove } = props;

    const shouldVisibleDeleteAction = !readOnly && shouldDelete && src;

    const inputRef = useRef<HTMLInputElement>(null);

    // To ensures that the onChange event will be triggered for the same file as well
    useEffect(() => {
        if (!Boolean(src) && inputRef.current) {
            inputRef.current.value = "";
        }
    }, [src]);

    return (
        <Box
            position="relative"
            borderRadius="50%"
            sx={sx.root}
            style={{
                backgroundImage: src ? `url(${src})` : "none",
                backgroundSize: "cover",
            }}
            data-testid="AvatarInput__root"
        >
            {shouldVisibleDeleteAction && (
                <IconButtonBase
                    size="large"
                    onClick={onRemove}
                    data-testid="AvatarInput__delete"
                    sx={sx.delete}
                >
                    <Close fontSize="small" />
                </IconButtonBase>
            )}
            <label
                htmlFor={!readOnly ? name : ""}
                data-testid="AvatarInput__labelHtmlFor"
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                }}
            >
                {!src ? (
                    <Box component="span" sx={sx.labelFor}>
                        <AddAPhotoOutlined sx={sx.icon} fontSize="large" />
                    </Box>
                ) : null}
            </label>
            <Box display="none">
                <input
                    id={name}
                    onChange={onChange}
                    accept="image/*"
                    type="file"
                    data-testid="AvatarInput__input"
                    ref={inputRef}
                />
            </Box>
        </Box>
    );
};

AvatarInput.defaultProps = {
    readOnly: false,
};

export default AvatarInput;
