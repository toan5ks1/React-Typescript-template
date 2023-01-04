import { Children, PropsWithChildren, useMemo } from "react";

import { SimpleForm, useLoading, SimpleFormProps } from "react-admin";
import { useHistory } from "react-router";
import sanitizer from "src/internals/sanitizer";
import { ResourceActions } from "src/squads/user/models/resource";
import { $enum } from "ts-enum-util";

import { LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import ThemeProvider from "src/providers/ThemeProvider";
import Dummy from "src/squads/user/components/Utilities/Dummy";
import TranslationProvider from "src/squads/user/providers/TranslationProvider";

const StyledSimpleForm = styled(SimpleForm)(({ theme, isTransparent }) => ({
    "& > :first-of-type": {
        padding: 32,
        backgroundColor: `white`,
        borderRadius: 8,
        border: isTransparent ? `unset` : `1px solid ${theme.palette.border?.main}`,
    },
    "&.hasBorder": {
        border: `1px solid ${theme.palette.border?.main}`,
    },
}));
StyledSimpleForm.displayName = "StyledSimpleForm";

interface FormProps extends SimpleFormProps {
    className?: string;
    redirect?: boolean | ((...args: any[]) => any) | string;
    hasBorder?: boolean;
    isTransparent?: boolean;
}

const sx = {
    linearProgress: {
        opacity: 0,
        width: "100%",
    },
    isLoading: {
        opacity: 1,
    },
};

const Form = (props: PropsWithChildren<FormProps>) => {
    const loading = useLoading();
    const {
        children,
        toolbar,
        hasBorder,
        initialValues,
        isTransparent,
        redirect: raRedirect,
        ...rest
    } = props;
    const history = useHistory();

    if (!Children.only(children)) {
        throw new Error(
            "Form component only support 1 children element. Please use fragment or a wrapper element"
        );
    }

    const redirect = useMemo(() => {
        //TODO: hack redirect cannot catch search params
        if (
            typeof raRedirect === "string" &&
            !$enum(ResourceActions)
                .getValues()
                .includes(raRedirect as ResourceActions)
        ) {
            return () => history.push(sanitizer.forURL(raRedirect!));
        }

        return raRedirect;
    }, [raRedirect, history]);
    return (
        //react admin override our theme with it own theme. Double-Fuk
        <ThemeProvider>
            <TranslationProvider>
                <StyledSimpleForm
                    toolbar={toolbar}
                    initialValues={initialValues}
                    redirect={redirect}
                    {...rest}
                >
                    <Dummy>{children}</Dummy>
                    <Dummy>
                        <LinearProgress
                            aria-hidden={!loading}
                            sx={[sx.linearProgress, loading && sx.isLoading]}
                        />
                    </Dummy>
                </StyledSimpleForm>
            </TranslationProvider>
        </ThemeProvider>
    );
};

Form.defaultProps = {
    isTransparent: false,
    hasBorder: true,
};

export default Form;
