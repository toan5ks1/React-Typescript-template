import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { Box, BoxProps } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";

export interface WrapperNoDataProps {
    noDataMessage: string;
    isOnTable?: boolean;
    hasBorder?: boolean;
}

const absolutePropsForTable: BoxProps = {
    position: "absolute",
    width: "100%",
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const WrapperNoData = (props: WrapperNoDataProps) => {
    const { noDataMessage, hasBorder, isOnTable = false } = props;

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={(theme) => ({
                width: "100%",
                margin: "auto",
                color: theme.palette.text.secondary,
                backgroundColor: theme.palette.grey[50],
                height: "80px",
                border: hasBorder ? `1px solid ${theme.palette.grey[300]}` : "none",
            })}
        >
            <Box {...(isOnTable ? absolutePropsForTable : undefined)}>
                <Box display="flex" alignItems="center">
                    <AssignmentOutlinedIcon
                        sx={{
                            //Designer team want to correct pixel & color here
                            height: "24px",
                            marginRight: "5px",
                            color: "#00000061",
                        }}
                        data-testid="NoData__icon"
                    />
                    <TypographyBase variant="body2" data-testid="NoData__message">
                        {noDataMessage}
                    </TypographyBase>
                </Box>
            </Box>
        </Box>
    );
};

export default WrapperNoData;
