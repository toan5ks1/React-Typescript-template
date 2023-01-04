import { ReactNode } from "react";

import { Add } from "@mui/icons-material";
import ButtonPrimaryContained, {
    ButtonPrimaryContainedProps,
} from "src/components/Buttons/ButtonPrimaryContained";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface ButtonCreateMoreProps extends ButtonPrimaryContainedProps {
    children?: ReactNode;
}

const ButtonCreateMore = (props: ButtonCreateMoreProps) => {
    const { children } = props;

    const t = useTranslate();

    const buttonText = t("ra.common.action.addMore");

    return (
        <ButtonPrimaryContained
            aria-label={buttonText}
            startIcon={<Add />}
            variant="outlined"
            {...props}
        >
            {children ? children : buttonText}
        </ButtonPrimaryContained>
    );
};

export default ButtonCreateMore;
