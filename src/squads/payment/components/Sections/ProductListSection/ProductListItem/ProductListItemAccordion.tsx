import { ReactNode } from "react";

import { accordionClasses } from "@mui/material/Accordion";
import { accordionSummaryClasses } from "@mui/material/AccordionSummary";
import { iconButtonClasses } from "@mui/material/IconButton";
import { Theme, SxProps } from "@mui/material/styles";
import AccordionBase, { AccordionBaseProps } from "src/components/Accordions/AccordionBase";
import AccordionSummaryBase from "src/components/Accordions/AccordionSummaryBase/AccordionSummaryBase";

const sx = {
    accordionBase: (theme: Theme) => ({
        [`&.${accordionClasses.root}`]: {
            marginBottom: theme.spacing(0),
            border: `1px solid ${theme.palette.common.white}`,
        },
        [`&.${accordionClasses.expanded}:before`]: {
            content: '" "',
            height: "100%",
            width: 4,
            left: "-1px",
            zIndex: 1,
            position: "absolute",
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            borderLeft: `${theme.spacing(0.5)}px solid ${theme.palette.common.white}`,
        },
    }),
    accordionSummary: (theme: Theme) => ({
        [`&.${accordionSummaryClasses.contentGutters}`]: {
            margin: theme.spacing(0),
        },
        [`&.${accordionSummaryClasses.expanded}`]: {
            margin: theme.spacing(0),
        },
        [`&.${accordionSummaryClasses.focusVisible}`]: {
            backgroundColor: `${theme.palette.common.white} !important`,
        },
        [`&.${accordionSummaryClasses.root}`]: {
            padding: theme.spacing(0),
            margin: theme.spacing(0),
        },
    }),
    accordionSummaryLarge: {
        [`&.${accordionSummaryClasses.root}`]: {
            height: "40px",
            minHeight: "40px",
        },
        [`&.${accordionSummaryClasses.content}`]: {
            height: "40px",
        },
    },
    accordionSummarySmall: {
        [`&.${accordionSummaryClasses.root}`]: {
            height: "20px",
            minHeight: "20px",
        },
        [`&.${accordionSummaryClasses.content}`]: {
            height: "20px",
        },
    },
    iconButtonRoot: (theme: Theme) => ({
        [`&.${iconButtonClasses.root}`]: {
            marginRight: theme.spacing(0.25),
            "&:hover, &:active": {
                backgroundColor: theme.palette.common.white,
            },
        },
    }),
    iconButtonSmall: (theme: Theme) => ({
        width: 20,
        height: 20,
        [`&.${iconButtonClasses.root}`]: {
            padding: theme.spacing(0.5),
        },
    }),
    iconButtonLarge: (theme: Theme) => ({
        width: 40,
        height: 40,
        [`&.${iconButtonClasses.root}`]: {
            padding: theme.spacing(2),
        },
    }),
};

export interface ProductListItemAccordionProps extends AccordionBaseProps {
    size: "small" | "large";
    base: ReactNode;
}

const accordionClassesMapBySize: Record<
    ProductListItemAccordionProps["size"],
    {
        iconButtonSx: SxProps<Theme>;
        accordionSummarySx: SxProps<Theme>;
    }
> = {
    small: {
        iconButtonSx: [sx.iconButtonSmall, sx.iconButtonRoot],
        accordionSummarySx: [sx.accordionSummarySmall, sx.accordionSummary],
    },
    large: {
        iconButtonSx: [sx.iconButtonLarge, sx.iconButtonRoot],
        accordionSummarySx: [sx.accordionSummaryLarge, sx.accordionSummary],
    },
};

const ProductListItemAccordion = (props: ProductListItemAccordionProps) => {
    const { className, children, base, expanded, onChange, size, disabled } = props;

    const { iconButtonSx, accordionSummarySx } = accordionClassesMapBySize[size];

    return (
        <AccordionBase
            className={className}
            sx={sx.accordionBase}
            expanded={expanded && !disabled}
            onChange={onChange}
            elevation={0}
        >
            <AccordionSummaryBase
                active={expanded && !disabled}
                expandIcon={null}
                sx={accordionSummarySx}
                summaryContent={base}
                iconButtonProps={{
                    disableTouchRipple: true,
                    sx: iconButtonSx,
                    disabled: disabled,
                }}
            />
            {children}
        </AccordionBase>
    );
};

export default ProductListItemAccordion;
