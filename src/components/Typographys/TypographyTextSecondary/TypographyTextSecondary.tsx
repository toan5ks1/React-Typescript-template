import TypographyBase, { TypographyBaseProps } from "../TypographyBase";

export interface TypographyTextSecondaryProps extends TypographyBaseProps {}

const TypographyTextSecondary = (props: TypographyTextSecondaryProps) => {
    return <TypographyBase color="textSecondary" {...props} />;
};

export default TypographyTextSecondary;
