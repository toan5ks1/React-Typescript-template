import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import { AccordionSummaryIconExpandProps } from "src/components/Accordions/AccordionSummaryBase/type";
import IconButtonBase from "src/components/IconButton/IconButtonBase";

const AccordionSummaryIconExpandRight = ({
    iconButtonProps,
    active,
    avatar,
    summaryContent,
}: AccordionSummaryIconExpandProps) => {
    return (
        <Box maxWidth="100%" display="flex">
            {avatar && <Box pr={1}>{avatar}</Box>}
            <Box width="100%" data-testid="AccordionSummaryBase__content">
                {summaryContent}
            </Box>
            <Box ml={1}>
                <IconButtonBase
                    size="large"
                    sx={{ width: 24, height: 24 }} // confirmed by designer
                    data-testid="AccordionSummaryBase__expandIcon"
                    {...iconButtonProps}
                >
                    {active ? (
                        <ExpandLess
                            data-testid="AccordionSummaryIconExpand__expandLess"
                            fontSize="small"
                        />
                    ) : (
                        <ExpandMore
                            data-testid="AccordionSummaryIconExpand__expandMore"
                            fontSize="small"
                        />
                    )}
                </IconButtonBase>
            </Box>
        </Box>
    );
};

export default AccordionSummaryIconExpandRight;
