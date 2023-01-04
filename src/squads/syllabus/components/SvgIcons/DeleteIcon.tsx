import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const DeleteIcon = ({
    fill = "#0B79D0",
    fillCircle = "#2196F3",
    ...props
}: SvgIconProps & { fill?: string; fillCircle?: string }) => {
    return (
        <SvgIcon {...props}>
            <circle cx="12" cy="12" r="12" fill={fillCircle} fillOpacity="0.08" />
            <path
                d="M16.6673 8.27337L15.7273 7.33337L12.0007 11.06L8.27398 7.33337L7.33398 8.27337L11.0607 12L7.33398 15.7267L8.27398 16.6667L12.0007 12.94L15.7273 16.6667L16.6673 15.7267L12.9407 12L16.6673 8.27337Z"
                fill={fill}
            />
        </SvgIcon>
    );
};

export default DeleteIcon;
