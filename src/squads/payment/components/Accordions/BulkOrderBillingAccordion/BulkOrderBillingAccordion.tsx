import { Fragment, PropsWithChildren, ReactElement, ReactNode, useState } from "react";

import { useFormContext, useWatch } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import {
    getCurrentCurrency,
    getFormattedItemPrice,
    getTotalValueForBilledAtOrderItems,
} from "src/squads/payment/helpers/price";
import { getStudentName } from "src/squads/payment/helpers/student";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

import { AccordionDetails, Box, Divider, Stack, Theme } from "@mui/material";
import { accordionClasses } from "@mui/material/Accordion";
import { accordionDetailsClasses } from "@mui/material/AccordionDetails";
import { accordionSummaryClasses } from "@mui/material/AccordionSummary";
import { iconButtonClasses } from "@mui/material/IconButton";
import AccordionBase from "src/components/Accordions/AccordionBase";
import AccordionSummaryBase from "src/components/Accordions/AccordionSummaryBase/AccordionSummaryBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";

import { useProductPluginsContext } from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import useGetBilledAtOrderProducts from "src/squads/payment/hooks/useGetBilledAtOrderProducts";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

interface BulkOrderBillingAccordionProps {
    billedAtOrderSection: ReactNode;
    upcomingBillingSection: ReactNode;
    studentIndex: number;
}

const sx = {
    accordionBase: (theme: Theme) => ({
        [`&.${accordionClasses.root}`]: {
            marginBottom: theme.spacing(0),
            border: `1px solid ${theme.palette.common.white}`,
        },
    }),
    accordionSummary: (theme: Theme) => ({
        [`&.${accordionSummaryClasses.contentGutters}`]: {
            margin: theme.spacing(0),
        },
        [`&.${accordionSummaryClasses.expanded}`]: {
            margin: theme.spacing(0),
        },
        [`&.${accordionSummaryClasses.root}`]: {
            height: "48px",
            minHeight: "48px",
            padding: "10px 16px",
        },
    }),
    iconButton: (theme: Theme) => ({
        width: 20,
        height: 20,
        [`&.${iconButtonClasses.root}`]: {
            marginRight: theme.spacing(0.25),
            "&:hover, &:active": {
                backgroundColor: theme.palette.common.white,
            },
        },
    }),
    AccordionDetails: {
        [`&.${accordionDetailsClasses.root}`]: {
            padding: "6px 16px 10px",
        },
    },
    typography: {
        wordWrap: "break-word",
    },
};

const PriceRow = ({ children }: PropsWithChildren<{}>) => {
    return (
        <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center">
            {children}
        </Stack>
    );
};

const PriceColumn = ({ children }: PropsWithChildren<{}>) => {
    return (
        <Box width="46%" boxSizing="border-box">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                {children}
            </Stack>
        </Box>
    );
};

const CustomDivider = (): ReactElement => {
    return (
        <Box sx={{ width: "8%" }} display="flex" justifyContent="center">
            <Divider orientation="vertical" />
        </Box>
    );
};

const BaseContent = (expanded: boolean, studentIndex: number): ReactElement => {
    const tOrder = useResourceTranslate(Entities.ORDERS);
    const { currentCurrency } = getCurrentCurrency();

    const [productFieldArrayItems] = useWatch<
        OrderFormValues,
        [`students.${number}.productFieldArrayItems`]
    >({
        name: [`students.${studentIndex}.productFieldArrayItems`],
    });

    const { getProductPluginsMap } = useProductPluginsContext();

    const billedAtOrderProducts = useGetBilledAtOrderProducts({
        productFieldArrayItems,
        getProductPluginsMap,
    });
    const totalValue = getTotalValueForBilledAtOrderItems(billedAtOrderProducts);

    return (
        <Box display="flex">
            <PriceColumn>
                <PriceRow>
                    <TypographyBase variant="subtitle1">
                        {tOrder("title.billedAtOrder")}
                    </TypographyBase>
                    {!expanded && Boolean(totalValue) && (
                        <TypographyPrimary variant="subtitle2">
                            {getFormattedItemPrice(currentCurrency, false, totalValue)}
                        </TypographyPrimary>
                    )}
                </PriceRow>
            </PriceColumn>
            <CustomDivider />
            <PriceColumn>
                <PriceRow>
                    <TypographyBase variant="subtitle1">
                        {tOrder("title.upcomingBilling")}
                    </TypographyBase>
                </PriceRow>
            </PriceColumn>
        </Box>
    );
};

const BulkOrderBillingAccordion = ({
    billedAtOrderSection,
    upcomingBillingSection,
    studentIndex,
}: BulkOrderBillingAccordionProps) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const { getValues } = useFormContext<OrderFormValues>();

    return (
        <Fragment>
            <Box mb={3}>
                <TypographyHeader sx={sx.typography}>
                    {getStudentName(getValues(`students.${studentIndex}.studentInfo`)?.user)}
                </TypographyHeader>
            </Box>
            <AccordionBase
                expanded={expanded}
                onChange={() => setExpanded((expanded) => !expanded)}
                disableGutters={true}
                sx={sx.accordionBase}
            >
                <AccordionSummaryBase
                    active={expanded}
                    expandIcon={null}
                    summaryContent={BaseContent(expanded, studentIndex)}
                    iconButtonProps={{
                        disableTouchRipple: true,
                        sx: sx.iconButton,
                    }}
                    sx={sx.accordionSummary}
                ></AccordionSummaryBase>
                <AccordionDetails sx={sx.AccordionDetails}>
                    <Box display="flex" width="100%" pl={4}>
                        <PriceColumn>
                            <Stack direction="column" width="100%">
                                {billedAtOrderSection}
                            </Stack>
                        </PriceColumn>
                        <CustomDivider />
                        <PriceColumn>
                            <Stack direction="column" width="100%">
                                {upcomingBillingSection}
                            </Stack>
                        </PriceColumn>
                    </Box>
                </AccordionDetails>
            </AccordionBase>
        </Fragment>
    );
};

export default BulkOrderBillingAccordion;
