import { ChevronLeft, ChevronRight } from "@mui/icons-material";

import ButtonBase, { ButtonBaseProps } from "../ButtonBase";

export interface ButtonCloseSidebarProps extends ButtonBaseProps {
    isLeft?: boolean;
}

const ButtonCloseSidebar = ({ isLeft = false, ...props }: ButtonCloseSidebarProps) => {
    return (
        <ButtonBase
            sx={(theme) => ({
                padding: theme.spacing(3 / 4, 1),
                border: `1px solid ${theme.palette.grey[300]}`,
            })}
            {...props}
        >
            {isLeft ? <ChevronLeft /> : <ChevronRight />}
        </ButtonBase>
    );
};

export default ButtonCloseSidebar;
