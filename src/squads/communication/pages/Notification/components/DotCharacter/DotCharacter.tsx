import CircleIcon from "@mui/icons-material/Circle";
import { SvgIconProps } from "@mui/material";

interface DotCharacterProps extends SvgIconProps {}

const DotCharacter = (props: DotCharacterProps) => {
    // TODO: refactor it after move to mana UI
    // confirmed with designer
    return (
        <CircleIcon
            {...props}
            sx={(theme) => ({
                color: theme.palette.grey[500],
                height: "4px",
                width: "4px",
                mx: "4px",
            })}
        />
    );
};

export default DotCharacter;
