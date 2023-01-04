import ButtonPrimaryContained, {
    ButtonPrimaryContainedProps,
} from "src/components/Buttons/ButtonPrimaryContained";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface ButtonCreateProps extends ButtonPrimaryContainedProps {}

const ButtonUpsert = (props: ButtonCreateProps) => {
    const t = useTranslate();

    const buttonText = `${t("ra.common.action.add")}/${t("ra.common.action.edit")}`;

    return (
        <ButtonPrimaryContained aria-label={buttonText} data-testid="ButtonUpsert__root" {...props}>
            {buttonText}
        </ButtonPrimaryContained>
    );
};

export default ButtonUpsert;
