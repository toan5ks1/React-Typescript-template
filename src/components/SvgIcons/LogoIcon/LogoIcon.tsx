import appConfigs from "src/internals/configuration";
import { PjOwner } from "src/typings/configuration";

import JPREPIcon from "./JPREPIcon";
import ManabieIcon from "./ManabieIcon";
import RenseikaiIcon from "./RenseikaiIcon";
import SynersiaIcon from "./SynersiaIcon";
import { LogoIconProps } from "./logo-icon-types";

let partnerIcons = {
    [PjOwner.JPREP]: JPREPIcon,
    [PjOwner.MANABIE]: ManabieIcon,
    [PjOwner.SYNERSIA]: SynersiaIcon,
    [PjOwner.RENSEIKAI]: RenseikaiIcon,
};

const LogoIcon = (props: LogoIconProps) => {
    const Icon = partnerIcons[appConfigs.getCurrentPjOwner()] || ManabieIcon;

    return <Icon {...props} />;
};

export default LogoIcon;
