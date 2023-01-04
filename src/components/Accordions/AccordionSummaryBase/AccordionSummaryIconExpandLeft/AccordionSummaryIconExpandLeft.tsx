import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import { AccordionSummaryIconExpandProps } from "src/components/Accordions/AccordionSummaryBase/type";
import IconButtonBase from "src/components/IconButton/IconButtonBase";

const AccordionSummaryIconExpandLeft = ({
    iconButtonProps,
    active,
    avatar,
    summaryContent,
}: AccordionSummaryIconExpandProps) => {
    return (
        <Box pl={0.5} width="100%" display="flex" alignItems="center">
            <Box pr={0.25}>
                <IconButtonBase
                    size="large"
                    sx={{ width: 40, height: 40 }}
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
            {avatar && <Box pr={1}>{avatar}</Box>}
            <Box width="100%" data-testid="AccordionSummaryBase__content">
                {summaryContent}
            </Box>
        </Box>
    );
};

export default AccordionSummaryIconExpandLeft;
