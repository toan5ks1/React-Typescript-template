import TypographyBase, { TypographyBaseProps } from "../TypographyBase";

export interface TypographyEntityDetailLabelProps extends TypographyBaseProps {}

const TypographyEntityDetailLabel = (props: TypographyEntityDetailLabelProps) => {
    return <TypographyBase variant="caption" {...props} color="textSecondary" />;
};

export default TypographyEntityDetailLabel;
