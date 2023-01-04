import TypographyBase, { TypographyBaseProps } from "../TypographyBase";

export interface TypographyLookingForProps extends TypographyBaseProps {}

const TypographyLookingFor = (props: TypographyLookingForProps) => {
    return <TypographyBase variant="body1" {...props} />;
};

export default TypographyLookingFor;
