import { ElementType } from "react";

import { Features } from "src/squads/communication/common/constants/feature-keys";
import { IPageResourceProperties } from "src/squads/communication/internals/permission";
import { TypeEntity } from "src/squads/communication/typings/react-admin";

export type IAppResource = IPageResourceProperties & {
    feature?: Features;
    translateKey?: string;
    icon?: ElementType;
    activePaths?: TypeEntity[];
    basename: string;
};
