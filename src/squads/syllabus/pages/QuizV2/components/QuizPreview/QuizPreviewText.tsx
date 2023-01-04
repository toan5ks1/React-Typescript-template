import TypographyBase from "src/components/Typographys/TypographyBase";

export type QuizPreviewTextProps = {
    title: string;
    value: string | number;
};

const QuizPreviewText = ({ title: label, value, ...rest }: QuizPreviewTextProps) => {
    if (!value) {
        return null;
    }

    return (
        <>
            <TypographyBase variant="caption" color="textSecondary" {...rest}>
                {label}
            </TypographyBase>
            <TypographyBase variant="body2" color="textPrimary">
                {value}
            </TypographyBase>
        </>
    );
};

export default QuizPreviewText;
