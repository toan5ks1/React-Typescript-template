import { ReactNode } from "react";

import { accordionClasses } from "@mui/material/Accordion";
import type { Theme } from "@mui/material/styles";
import AccordionBase, { AccordionBaseProps } from "src/components/Accordions/AccordionBase";
import AccordionSummaryBase from "src/components/Accordions/AccordionSummaryBase/AccordionSummaryBase";
import TypographyShortenStr from "src/components/Typographys/TypographyShortenStr";

const sx = {
    root: (theme: Theme) => ({
        marginBottom: "0px",
        border: `1px solid ${theme.palette.border?.main}`,
        [`&.${accordionClasses.expanded}:last-of-type`]: {
            marginBottom: "0px",
        },
        [`&.${accordionClasses.root}:before`]: {
            opacity: "1",
            display: "block",
        },
    }),
    summaryExpanded: (theme: Theme) => ({
        backgroundColor: theme.palette.grey[100],
    }),
    expanded: (theme: Theme) => ({
        borderLeftWidth: theme.spacing(0.5),
        borderLeftColor: theme.palette.info.main,
    }),
};

export interface ChapterAccordionProps extends AccordionBaseProps {
    name: string;
    endNode: ReactNode;
}

const ChapterAccordion = (props: ChapterAccordionProps) => {
    const { className, children, name, expanded, onChange, endNode } = props;

    return (
        <AccordionBase
            className={className}
            sx={[sx.root, expanded ? sx.expanded : {}]}
            expanded={expanded}
            onChange={onChange}
            elevation={0}
        >
            <AccordionSummaryBase
                active={expanded}
                expandIcon={null}
                sx={sx.summaryExpanded}
                summaryContent={
                    <TypographyShortenStr
                        variant="subtitle2"
                        color="textPrimary"
                        data-testid="ChapterAccordion__name"
                        maxLength={50}
                    >
                        {name}
                    </TypographyShortenStr>
                }
                endIcon={endNode}
            />
            {children}
        </AccordionBase>
    );
};

export default ChapterAccordion;
