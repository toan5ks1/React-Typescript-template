import { HTMLAttributes, MouseEvent } from "react";

import { Grid } from "@mui/material";
import ButtonBase from "src/components/Buttons/ButtonBase";
import Loading from "src/components/Loading";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface BaseDialogActionProps<T> extends HTMLAttributes<HTMLDivElement> {
    loading?: boolean;
    onCancel: (event: MouseEvent<T>, value?: any) => void;
    onOK: (event: MouseEvent<T>, value?: any) => void;
    okText?: string;
    cancelText?: string;
    disabled: boolean;
}

const BaseDialogAction = (props: BaseDialogActionProps<HTMLButtonElement>) => {
    const t = useTranslate();
    const {
        onCancel,
        onOK,
        className,
        loading,
        okText = t("ra.action.save"),
        cancelText = t("ra.action.cancel"),
        disabled,
    } = props;

    return (
        <Grid container className={className} justifyContent="flex-end">
            <Grid item>
                <ButtonBase
                    data-testid="BaseDialogAction__cancel"
                    onClick={onCancel}
                    sx={(theme) => ({ "&:first-of-type": { marginRight: theme.spacing(2) } })}
                    size="large"
                    aria-label={cancelText}
                    disabled={loading}
                >
                    {cancelText}
                </ButtonBase>
                <ButtonBase
                    data-testid="BaseDialogAction__ok"
                    onClick={onOK}
                    disabled={disabled}
                    size="large"
                    color="primary"
                    variant="contained"
                    aria-label={okText}
                    startIcon={<Loading loading={loading} size={16} />}
                >
                    {okText}
                </ButtonBase>
            </Grid>
        </Grid>
    );
};

BaseDialogAction.defaultProps = {
    disabledOK: false,
    loading: false,
};

export default BaseDialogAction;
