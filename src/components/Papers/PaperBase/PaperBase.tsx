import { Paper as MaterialPaper, PaperProps as MaterialPaperProps } from "@mui/material";

export interface PaperBaseProps extends MaterialPaperProps {}

const PaperBase = (props: PaperBaseProps) => {
    return <MaterialPaper {...props} />;
};

export default PaperBase;
