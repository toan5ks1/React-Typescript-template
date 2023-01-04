import CircularProgressBase, {
    CircularProgressBaseProps,
} from "../../CicularProgress/CicularProgressBase";
import BackdropBase, { BackdropBaseProps } from "../BackdropBase";

export interface BackdropLoadingProps extends BackdropBaseProps {
    iconLoading?: CircularProgressBaseProps;
}

const BackdropLoading = ({ iconLoading, ...rest }: BackdropLoadingProps) => {
    return (
        <BackdropBase {...rest}>
            <CircularProgressBase color="inherit" {...iconLoading} />
        </BackdropBase>
    );
};

export default BackdropLoading;
