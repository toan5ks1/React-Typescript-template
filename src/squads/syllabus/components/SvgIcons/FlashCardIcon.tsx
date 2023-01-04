interface FlashCardIconProps {
    color?: string;
    size?: number;
}

const FlashCardIcon = (_props: FlashCardIconProps) => {
    return (
        <svg
            data-testid="FlashCardIcon__svg"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="none"
            viewBox="0 0 22 22"
        >
            <path
                fill="#fff"
                fillRule="evenodd"
                d="M1.27 4.926a1.355 1.355 0 011.114-1.56l9.427-1.662a1.355 1.355 0 011.58 1.085l2.098 11.9c.129.73-.37 1.429-1.113 1.56L4.948 17.91a1.355 1.355 0 01-1.58-1.085L1.27 4.926zm8.41 6.238l-2.153.38-.226 1.059-1.469.259 1.35-5.487 1.418-.25 3.152 4.693-1.498.264-.575-.918zm-.61-.988L8.13 8.663l-.368 1.744 1.31-.23zm8.02 10.552l-9.334-1.646 8.162-1.439c.942-.166 1.578-1.024 1.42-1.917l-1.81-10.27 4.126.727c.744.131 1.242.83 1.114 1.56l-2.099 11.9a1.355 1.355 0 01-1.58 1.085z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
};

export default FlashCardIcon;
