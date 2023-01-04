interface AssignmentIconProps {
    color?: string;
    size?: number;
}

const AssignmentIcon = (_props: AssignmentIconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 20 20"
            data-testid="AssignmentIcon__svg"
        >
            <path
                fill="#fff"
                fillRule="evenodd"
                d="M3.183 2.4c-.764 0-1.382.62-1.382 1.382V16.22c0 .763.618 1.381 1.382 1.381h9.672c.763 0 1.382-.618 1.382-1.381V3.782c0-.763-.619-1.382-1.382-1.382H3.183zm1.381 3.455a.69.69 0 000 1.382h6.91a.69.69 0 100-1.382h-6.91zM3.874 10c0-.381.309-.69.69-.69h6.91a.69.69 0 110 1.381h-6.91a.69.69 0 01-.69-.69zm.69 2.764a.69.69 0 100 1.382h2.764a.69.69 0 100-1.382H4.564z"
                clipRule="evenodd"
            ></path>
            <path
                fill="#fff"
                d="M15.7 3.438c-.276 0-.5-.22-.499-.492v-.047a.5.5 0 01.502-.495l1.999-.004c.277 0 .5.221.5.494l-.001.047a.5.5 0 01-.501.493l-2 .004zM15.222 4.92a.5.5 0 01.5-.495h1.98c.276 0 .5.221.499.494v5.641c0 .13-.054.256-.147.348l-.959.947a.505.505 0 01-.707.002l-1.02-1.008a.488.488 0 01-.146-.349V4.92z"
            ></path>
        </svg>
    );
};

export default AssignmentIcon;
