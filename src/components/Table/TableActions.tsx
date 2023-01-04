import { JSXElementConstructor, ReactElement } from "react";

import { Add as AddIcon } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import { ButtonBaseProps } from "src/components/Buttons/ButtonBase";
import ButtonDelete from "src/components/Buttons/ButtonDelete";
import { ButtonPrimaryContainedProps } from "src/components/Buttons/ButtonPrimaryContained";
import ButtonPrimaryOutlined from "src/components/Buttons/ButtonPrimaryOutlined";
import TypographyHeader from "src/components/Typographys/TypographyHeader";

import useTranslate from "src/hooks/useTranslate";

export interface TableActionsProps {
    title: string;
    ButtonDeleteProps?: ButtonBaseProps;
    ButtonAddProps?: ButtonPrimaryContainedProps;
    children?: ReactElement<any, string | JSXElementConstructor<any>>;
    shouldShowDeleteButton?: boolean;
}

const TableActions = (props: TableActionsProps) => {
    const {
        title,
        ButtonDeleteProps,
        ButtonAddProps,
        shouldShowDeleteButton = true,
        children,
        ...rest
    } = props;

    const t = useTranslate();

    const defaultButtonAddProps = {
        startIcon: <AddIcon />,
        children: t("ra.common.action.add"),
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2.25} {...rest}>
            <Box>
                <TypographyHeader>{title}</TypographyHeader>
            </Box>
            <Box>
                {children ? (
                    children
                ) : (
                    <Grid container spacing={2}>
                        {shouldShowDeleteButton && (
                            <Grid item>
                                <ButtonDelete
                                    data-testid="TableAction__buttonDelete"
                                    {...ButtonDeleteProps}
                                />
                            </Grid>
                        )}
                        <Grid item>
                            <ButtonPrimaryOutlined
                                data-testid="TableAction__buttonAdd"
                                {...defaultButtonAddProps}
                                {...ButtonAddProps}
                            />
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Box>
    );
};

export default TableActions;
