import TypographyBase, { TypographyBaseProps } from "src/components/Typographys/TypographyBase";

const DoubleDash = (props: TypographyBaseProps) => {
    return (
        <TypographyBase
            variant="body2"
            component="span"
            sx={(theme) => ({
                color: theme.palette.text.secondary,
            })}
            {...props}
        >
            --
        </TypographyBase>
    );
};

export default DoubleDash;
