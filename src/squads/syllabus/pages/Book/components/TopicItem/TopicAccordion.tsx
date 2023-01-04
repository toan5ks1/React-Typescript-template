import { ReactNode } from "react";

import { accordionClasses } from "@mui/material/Accordion";
import AccordionBase, { AccordionBaseProps } from "src/components/Accordions/AccordionBase";
import AccordionSummaryBase from "src/components/Accordions/AccordionSummaryBase/AccordionSummaryBase";
import Avatar from "src/components/RelatedUser/Avatar";
import TypographyShortenStr from "src/components/Typographys/TypographyShortenStr";

export interface TopicAccordionProps extends AccordionBaseProps {
    name: string;
    iconUrl?: string;
    endNode: ReactNode;
}

const TopicAccordion = ({
    expanded,
    onChange,
    className,
    children,
    name,
    endNode,
    iconUrl,
}: TopicAccordionProps) => {
    return (
        <>
            <AccordionBase
                className={className}
                expanded={expanded}
                onChange={onChange}
                TransitionProps={{ mountOnEnter: true }}
                sx={{
                    width: "100%",
                    [`&.${accordionClasses.root}`]: {
                        boxShadow: "unset",
                    },
                    [`&.${accordionClasses.expanded}`]: {
                        minHeight: "unset",
                    },
                }}
            >
                <AccordionSummaryBase
                    active={expanded}
                    avatar={<Avatar size="medium" src={iconUrl} />}
                    summaryContent={
                        <TypographyShortenStr
                            variant="body2"
                            color="textPrimary"
                            data-testid="TopicAccordion__name"
                            maxLength={80}
                        >
                            {name}
                        </TypographyShortenStr>
                    }
                    endIcon={endNode}
                />
                {children}
            </AccordionBase>
        </>
    );
};

export default TopicAccordion;
