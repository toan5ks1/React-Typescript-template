import TypographyBase, { TypographyBaseProps } from "../TypographyBase";

import useTextClamped from "src/hooks/useTextClamped";

export interface TypographyMaxLinesProps extends TypographyBaseProps {
    children: string;
    maxLines: number;
}

const TypographyMaxLines = (props: TypographyMaxLinesProps) => {
    const { children, maxLines, ...rest } = props;

    const { ref, isClamped } = useTextClamped({ textContent: children });

    return (
        <TypographyBase
            {...rest}
            id="TypographyMaxLines__TypographyBase"
            title={isClamped ? children : ""}
            sx={{
                display: "-webkit-box",
                WebkitLineClamp: props.maxLines,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
            }}
            ref={ref}
        >
            {children}
        </TypographyBase>
    );
};

export default TypographyMaxLines;
