import { Toolbar, SaveButton, ToolbarProps } from "react-admin";
import { NotifyTypes } from "src/common/constants/enum";

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dummy from "src/squads/user/components/Utilities/Dummy";

import useGoBack from "src/squads/user/hooks/useGoBack";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "transparent",
    minHeight: 64,
    paddingRight: 0,
});

export interface FormActionProps extends ToolbarProps {}

const FormAction = (props: FormActionProps) => {
    const { redirect, invalid, pristine, width, handleSubmit, ...rest } = props;
    const t = useTranslate();

    const showSnackbar = useShowSnackbar();
    const goBack = useGoBack();

    return (
        <StyledToolbar {...rest} width={width as any}>
            <Dummy>
                <Button
                    sx={{ marginRight: 12 }}
                    variant="outlined"
                    color="primary"
                    onClick={() => goBack()}
                >
                    {t("ra.common.action.cancel")}
                </Button>
            </Dummy>
            <SaveButton
                variant="contained"
                label={t("ra.action.save")}
                disabled={invalid || pristine}
                redirect={redirect}
                submitOnEnter
                undoable={false}
                onFailure={(error: { message?: string }) => {
                    if (error.message) {
                        showSnackbar(error.message, NotifyTypes.ERROR);
                    }
                }}
            />
        </StyledToolbar>
    );
};

export default FormAction;
