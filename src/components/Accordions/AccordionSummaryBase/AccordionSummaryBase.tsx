import { ReactNode } from "react";

import AccordionSummary, {
    AccordionSummaryProps,
    accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import AccordionSummaryIconExpandLeft from "src/components/Accordions/AccordionSummaryBase/AccordionSummaryIconExpandLeft";
import AccordionSummaryIconExpandRight from "src/components/Accordions/AccordionSummaryBase/AccordionSummaryIconExpandRight";
import { AccordionSummaryIconExpandProps } from "src/components/Accordions/AccordionSummaryBase/type";

const PREFIX = "AccordionSummaryBase";

const classOverrides = {
    root: `${PREFIX}-root`,
    content: `${PREFIX}-content`,
};

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => {
    return {
        padding: theme.spacing(0, 0.5, 0, 0),
        height: "52px",
        [`&.${accordionSummaryClasses.expanded}`]: {
            minHeight: "unset",
        },

        [`& .${classOverrides.content}`]: {
            alignItems: "center",
            justifyContent: "space-between",
        },
    };
});

export interface AccordionSummaryBaseProps
    extends AccordionSummaryProps,
        AccordionSummaryIconExpandProps {
    expandIcon?: ReactNode;
    endIcon?: ReactNode;
    iconExpandPosition?: "left" | "right";
}

const AccordionSummaryBase = (props: AccordionSummaryBaseProps) => {
    const {
        expandIcon,
        style,
        endIcon,
        className,
        classes,
        iconExpandPosition = "left",
        summaryContent,
        avatar,
        active,
        iconButtonProps,
        ...rest
    } = props;

    //TODO: remove AccordionSummaryIconExpandLeft & AccordionSummaryIconExpandRight when design team will have new design-system MUI-v5 for AccordionSummary
    const renderAccordionSummaryIconExpandWithPosition = () => {
        const propsAccordionSummaryIconExpand: AccordionSummaryIconExpandProps = {
            summaryContent,
            avatar,
            active,
            iconButtonProps,
        };

        switch (iconExpandPosition) {
            case "left":
                return <AccordionSummaryIconExpandLeft {...propsAccordionSummaryIconExpand} />;
            case "right":
                return <AccordionSummaryIconExpandRight {...propsAccordionSummaryIconExpand} />;
            default:
                return <></>;
        }
    };

    return (
        <StyledAccordionSummary
            data-testid="AccordionSummaryBase__root"
            expandIcon={expandIcon}
            className={className}
            classes={{
                root: classOverrides.root,
                content: classOverrides.content,
                ...classes,
            }}
            {...rest}
        >
            {renderAccordionSummaryIconExpandWithPosition()}
            <span
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {endIcon}
            </span>
        </StyledAccordionSummary>
    );
};

export default AccordionSummaryBase;
