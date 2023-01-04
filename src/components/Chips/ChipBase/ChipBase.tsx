import { Chip as MaterialChip, ChipProps as MaterialChipProps, ChipTypeMap } from "@mui/material";
import { DefaultComponentProps, OverridableComponent } from "@mui/material/OverridableComponent";

export interface ChipBaseProps
    extends DefaultComponentProps<ChipTypeMap<MaterialChipProps, "div">> {}

const ChipBase: OverridableComponent<ChipTypeMap<ChipBaseProps, "div">> = (
    props: ChipBaseProps
) => {
    return <MaterialChip {...props} />;
};

export default ChipBase;
