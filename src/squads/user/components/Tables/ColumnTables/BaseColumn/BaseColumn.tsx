import TypographyBase, { TypographyBaseProps } from "src/components/Typographys/TypographyBase";

export interface BaseColumnProps extends Omit<TypographyBaseProps, "variant"> {
    content?: string | null;
}

function BaseColumn({ content, ...rest }: BaseColumnProps) {
    return (
        <TypographyBase variant="body2" {...rest}>
            {content}
        </TypographyBase>
    );
}
export default BaseColumn;
