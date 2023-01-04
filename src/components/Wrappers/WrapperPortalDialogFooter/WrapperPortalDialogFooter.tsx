import { ReactElement } from "react";

import { PORTAL_DIALOG_FOOTER } from "src/common/constants/other";

import WrapperPortalBase from "../WrapperPortalBase";

const WrapperPortalDialogFooter = (props: { children: ReactElement | ReactElement[] }) => {
    return <WrapperPortalBase selector={PORTAL_DIALOG_FOOTER}>{props.children}</WrapperPortalBase>;
};

export default WrapperPortalDialogFooter;
