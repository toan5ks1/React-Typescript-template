import { RemoveRedEyeOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import IconButtonBase, { IconButtonBaseProps } from "src/components/IconButton/IconButtonBase";

export interface ButtonShowHideProps {
    visible: boolean;
    onClick: () => void;
    iconButtonProps?: IconButtonBaseProps;
}

const ButtonShowHide = (props: ButtonShowHideProps) => {
    const { visible = true, onClick, iconButtonProps } = props;
    const theme = useTheme();

    return (
        <IconButtonBase
            size="large"
            onClick={onClick}
            data-testid="ButtonShowHide"
            {...iconButtonProps}
        >
            {visible ? (
                <RemoveRedEyeOutlined
                    color="primary"
                    fontSize="small"
                    data-testid="ButtonShowHide__iconShow"
                />
            ) : (
                <VisibilityOffOutlined
                    htmlColor={theme.palette.text.primary}
                    fontSize="small"
                    data-testid="ButtonShowHide__iconHide"
                />
            )}
        </IconButtonBase>
    );
};

export default ButtonShowHide;
