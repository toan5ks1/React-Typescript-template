import TypographyBase, { TypographyBaseProps } from "../TypographyBase";

export interface TypographyHeaderProps extends TypographyBaseProps {}

const TypographyHeader = (props: TypographyHeaderProps) => {
    return <TypographyBase variant="h6" {...props} />;
};

export default TypographyHeader;
