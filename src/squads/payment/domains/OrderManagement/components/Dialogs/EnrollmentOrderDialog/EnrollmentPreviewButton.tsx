import ButtonBase from "src/components/Buttons/ButtonBase";

import useTranslate from "src/squads/payment/hooks/useTranslate";

interface EnrollmentPreviewButtonProps {
    onClick: () => void;
}

const EnrollmentPreviewButton = ({ onClick }: EnrollmentPreviewButtonProps) => {
    const t = useTranslate();

    return (
        <ButtonBase
            data-testid="EnrollmentOrderDialog__viewEnrollmentButton"
            size="medium"
            variant="outlined"
            color="primary"
            fullWidth
            onClick={onClick}
        >
            {t("resources.button.viewEnrollmentForm")}
        </ButtonBase>
    );
};

export default EnrollmentPreviewButton;
