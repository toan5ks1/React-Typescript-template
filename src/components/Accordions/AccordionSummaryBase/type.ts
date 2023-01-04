import { ReactNode } from "react";

import { IconButtonBaseProps } from "src/components/IconButton/IconButtonBase";

export interface AccordionSummaryIconExpandProps {
    summaryContent: ReactNode;
    avatar?: ReactNode;
    active?: boolean;
    iconButtonProps?: IconButtonBaseProps;
}
