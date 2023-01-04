import { Divider as MaterialDivider, DividerProps as MaterialDividerProps } from "@mui/material";

export interface DividerBaseProps extends MaterialDividerProps {}

const DividerBase = (props: DividerBaseProps) => {
    return <MaterialDivider {...props} />;
};

export default DividerBase;
