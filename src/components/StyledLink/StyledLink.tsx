import { Link as ReactLink, LinkProps } from "react-router-dom";

import { styled } from "@mui/material/styles";

const StyledReactLink = styled(ReactLink)(({ theme }) => ({
    cursor: "pointer",
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
        textDecoration: "underline",
    },
}));

export interface StyledLinkProps extends LinkProps {}

const StyledLink = ({ className, children, ...rest }: StyledLinkProps) => {
    return (
        <StyledReactLink className={className} {...rest}>
            {children}
        </StyledReactLink>
    );
};

export default StyledLink;
