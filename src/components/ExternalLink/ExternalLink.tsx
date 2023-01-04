import { forwardRef, AnchorHTMLAttributes } from "react";

import { Box } from "@mui/material";

export interface ExternalLinkProps extends AnchorHTMLAttributes<any> {}

const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
    (props: ExternalLinkProps, ref) => {
        const { className, href, ...rest } = props;

        return (
            <Box
                component="a"
                href={href}
                ref={ref}
                className={className}
                sx={(theme) => ({
                    color: theme.palette.primary.main,
                    "&:hover": {
                        textDecoration: "underlined",
                    },
                })}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="ExternalLink"
                {...rest}
            />
        );
    }
);

export default ExternalLink;
