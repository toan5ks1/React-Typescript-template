import { ArrowBack } from "@mui/icons-material";

import ButtonBase, { ButtonBaseProps } from "../ButtonBase";

import useTranslate from "src/hooks/useTranslate";

interface ButtonBackProps extends ButtonBaseProps {}

const ButtonBack = (props: ButtonBackProps) => {
    const t = useTranslate();
    return (
        <ButtonBase startIcon={<ArrowBack />} color="primary" {...props}>
            {t("ra.common.back")}
        </ButtonBase>
    );
};

export default ButtonBack;
