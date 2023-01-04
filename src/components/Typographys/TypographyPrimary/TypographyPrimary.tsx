import TypographyBase, { TypographyBaseProps } from "../TypographyBase";

export interface TypographyPrimaryProps extends TypographyBaseProps {}

const TypographyPrimary = (props: TypographyPrimaryProps) => {
    return <TypographyBase color="textPrimary" {...props} />;
};

export default TypographyPrimary;
