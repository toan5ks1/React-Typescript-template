import { CSSProperties, ElementType } from "react";

export interface StandardProps {
    className?: string;
    style?: CSSProperties;
    component?: ElementType;
    "data-testid"?: string;
}
