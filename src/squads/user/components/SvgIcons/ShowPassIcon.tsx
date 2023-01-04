import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const ShowPassIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon
            sx={{
                width: 20,
                height: 20,
            }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-testid="ShowPassIcon__svg"
            viewBox="0 0 20 20"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.79 10.573a.886.886 0 0 0 0-1.146C18.495 7.882 14.602 3.75 10 3.75c-4.602 0-8.495 4.132-9.79 5.677a.886.886 0 0 0 0 1.146C1.505 12.118 5.398 16.25 10 16.25c4.602 0 8.495-4.132 9.79-5.677ZM10 14.464c2.347 0 4.249-1.941 4.249-4.337 0-2.395-1.902-4.336-4.249-4.336-2.347 0-4.249 1.941-4.249 4.336 0 2.396 1.902 4.337 4.249 4.337Z"
                fill="#586189"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.994 13a2.999 2.999 0 0 0 2.998-3 2.999 2.999 0 1 0-5.995 0c0 1.657 1.342 3 2.997 3Z"
                fill="#586189"
            />
        </SvgIcon>
    );
};

export default ShowPassIcon;
