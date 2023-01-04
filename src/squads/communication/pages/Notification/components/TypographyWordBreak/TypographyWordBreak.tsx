import { Theme } from "@mui/material";
import TypographyBase, { TypographyBaseProps } from "src/components/Typographys/TypographyBase";

export interface TypographyWordBreakProps extends TypographyBaseProps {
    isTextInAccordion?: boolean;
}

const sx = {
    accordion: (theme: Theme) => ({
        /**
         * @param theme.spacing(3): width of IconExpand Accordion
         * @param theme.spacing(1): marginLeft of IconExpandAccordion
         */
        width: `calc(100% - ${theme.spacing(3)} - ${theme.spacing(1)})`,
    }),
    wordBreak: () => ({
        wordBreak: "break-word",
    }),
};

const TypographyWordBreak = (props: TypographyWordBreakProps) => {
    const { isTextInAccordion, sx: sxTypographyBase = [sx.wordBreak], ...rest } = props;

    return (
        <TypographyBase
            sx={[isTextInAccordion ? sx.accordion : {}, ...(Array.isArray(sx) ? sx : [sx])]}
            {...rest}
        />
    );
};

export default TypographyWordBreak;
