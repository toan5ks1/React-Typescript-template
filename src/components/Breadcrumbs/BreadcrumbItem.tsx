import { Link, LinkProps } from "react-router-dom";

import { styled } from "@mui/material/styles";
import TypographyShortenStr from "src/components/Typographys/TypographyShortenStr";

interface BreadcrumbItemProps extends LinkProps {
    name: string;
}

const StyledLink = styled(Link)({
    textDecoration: "unset",
});
StyledLink.displayName = "BreadcrumbItemStyledLink";

const BreadcrumbItem = ({ name, children, ...props }: BreadcrumbItemProps) => {
    return (
        <StyledLink data-testid="BreadcrumbItem" {...props}>
            <TypographyShortenStr
                component="span"
                maxLength={30}
                color="textSecondary"
                variant="caption"
            >
                {name}
            </TypographyShortenStr>
        </StyledLink>
    );
};

export default BreadcrumbItem;
