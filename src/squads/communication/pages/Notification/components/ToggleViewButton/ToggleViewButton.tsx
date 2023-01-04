import { ERPModules } from "src/common/constants/enum";

import ButtonPrimaryText, {
    ButtonPrimaryTextProps,
} from "src/components/Buttons/ButtonPrimaryText";

import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import { UseCheckExpandingQuestionnaireDetailReturn } from "src/squads/communication/pages/Notification/hooks/useCheckExpandingQuestionnaireDetail";

export interface ToggleViewButtonProps
    extends ButtonPrimaryTextProps,
        Pick<UseCheckExpandingQuestionnaireDetailReturn, "toggleViewMoreLess" | "isExpandingAll"> {}

const ToggleViewButton = (props: ToggleViewButtonProps) => {
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);
    const { toggleViewMoreLess, isExpandingAll, ...rest } = props;

    return (
        <ButtonPrimaryText
            data-testid="ToggleViewButton__buttonViewMoreLess"
            onClick={toggleViewMoreLess}
            {...rest}
        >
            {isExpandingAll ? tNotification("button.viewLess") : tNotification("button.viewMore")}
        </ButtonPrimaryText>
    );
};

export default ToggleViewButton;
