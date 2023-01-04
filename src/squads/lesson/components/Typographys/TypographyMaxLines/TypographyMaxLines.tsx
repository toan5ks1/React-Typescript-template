import { useState, MouseEvent } from "react";

import debounce from "lodash/debounce";

import TypographyBase, { TypographyBaseProps } from "src/components/Typographys/TypographyBase";

export interface TypographyMaxLinesProps extends TypographyBaseProps {
    children: string;
    maxLines: number;
}

const TypographyMaxLines = (props: TypographyMaxLinesProps) => {
    const { children, maxLines, ...rest } = props;

    const [isClamped, setIsClamped] = useState(false);

    const onMouseEnter = (event: MouseEvent<HTMLElement>) => {
        const eventTarget = event?.target as HTMLElement;
        const scrollHeight = eventTarget?.scrollHeight;
        const clientHeight = eventTarget?.clientHeight;

        if (scrollHeight === clientHeight) {
            setIsClamped(false);
        } else {
            setIsClamped(true);
        }
    };

    const debouncedMouseEnterHandler = debounce(onMouseEnter, 100);

    return (
        <TypographyBase
            data-testid="TypographyMaxLines__TypographyBase"
            {...rest}
            title={isClamped ? children : ""}
            onMouseEnter={(event) => debouncedMouseEnterHandler(event)}
            sx={{
                display: "-webkit-box",
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
            }}
        >
            {children}
        </TypographyBase>
    );
};

export default TypographyMaxLines;
