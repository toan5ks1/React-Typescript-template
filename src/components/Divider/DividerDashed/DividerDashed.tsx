import DividerBase, { DividerBaseProps } from "../DividerBase";

const DividerDashed = (props: DividerBaseProps) => {
    return (
        <DividerBase
            sx={(theme) => ({
                borderTop: `1px dashed ${theme.palette.divider}`,
                borderBottom: 0,
                height: 0,
                backgroundColor: "transparent",
            })}
            {...props}
        />
    );
};

export default DividerDashed;
