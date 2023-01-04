import { DeleteOutlineOutlined } from "@mui/icons-material";
import IconButtonBase, { IconButtonBaseProps } from "src/components/IconButton/IconButtonBase";

const IconButtonDelete = (props: IconButtonBaseProps) => {
    return (
        <IconButtonBase data-testid="IconButtonDelete__root" {...props}>
            <DeleteOutlineOutlined />
        </IconButtonBase>
    );
};

export default IconButtonDelete;
