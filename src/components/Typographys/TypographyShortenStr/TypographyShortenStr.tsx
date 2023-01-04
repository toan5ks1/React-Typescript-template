import { toShortenStr } from "src/common/utils/other";

import TypographyBase, { TypographyBaseProps } from "../TypographyBase";

export interface TypographyShortenStrProps extends Omit<TypographyBaseProps, "children"> {
    children: string;
    maxLength: number;
}

const TypographyShortenStr = ({ children, maxLength, ...props }: TypographyShortenStrProps) => {
    if (!children || !children.length) return null;

    if (children.length <= maxLength) {
        return (
            <TypographyBase variant="body1" {...props}>
                {children}
            </TypographyBase>
        );
    }

    return (
        <TypographyBase
            data-testid="TypographyShortenStr"
            title={children}
            variant="body1"
            {...props}
        >
            {toShortenStr(children, maxLength)}
        </TypographyBase>
    );
};

TypographyShortenStr.defaultProps = {
    children: "",
};

export default TypographyShortenStr;
