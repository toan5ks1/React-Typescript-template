import { Switch as MaterialSwitch, SwitchProps as MaterialSwitchProps } from "@mui/material";

export interface SwitchBaseProps extends MaterialSwitchProps {}

const SwitchBase = (props: SwitchBaseProps) => {
    return <MaterialSwitch {...props} />;
};

export default SwitchBase;
