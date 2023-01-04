import { ReactNode } from "react";

import { styled } from "@mui/material/styles";
import AccordionBase, { AccordionBaseProps } from "src/components/Accordions/AccordionBase";
import AccordionSummaryBase from "src/components/Accordions/AccordionSummaryBase/AccordionSummaryBase";

const PREFIX = "QuestionAccordion";

const classes = {
    root: `${PREFIX}-root`,
    content: `${PREFIX}-content`,
    expanded: `${PREFIX}-expanded`,
};

const StyledAccordionSummaryBase = styled(AccordionSummaryBase)(() => {
    return {
        [`&.${classes.root}`]: {
            margin: 0,
            padding: 0,
            minHeight: "unset",
            height: "auto",
            width: "fit-content",
        },
        [`& .${classes.content}`]: {
            margin: 0,
            [`&.${classes.expanded}`]: {
                margin: 0,
            },
        },
    };
});

export interface QuestionAccordionProps extends AccordionBaseProps {
    accordionEndIcon?: ReactNode;
    summaryContent: ReactNode;
}

const QuestionAccordion = (props: QuestionAccordionProps) => {
    const { children, accordionEndIcon, summaryContent, expanded, ...propsAccordionBase } = props;

    return (
        <AccordionBase expanded={expanded} elevation={0} {...propsAccordionBase}>
            <StyledAccordionSummaryBase
                iconExpandPosition="right"
                classes={{
                    root: classes.root,
                    content: classes.content,
                    expanded: classes.expanded,
                }}
                active={expanded}
                summaryContent={summaryContent}
                endIcon={accordionEndIcon}
            />
            {children}
        </AccordionBase>
    );
};

export default QuestionAccordion;
