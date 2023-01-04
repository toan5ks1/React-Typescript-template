interface LOIconProps {
    color?: string;
    size?: number;
}
const LOIcon = (_props: LOIconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            data-testid="LOIcon__svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 20 20"
        >
            <path
                fill="#fff"
                d="M11.849 7.088a.348.348 0 000-.575l-2.695-1.85a.353.353 0 00-.553.287v3.7c0 .282.32.448.553.287l2.695-1.85z"
            ></path>
            <path
                fill="#fff"
                fillRule="evenodd"
                d="M2.8 2.8a1.6 1.6 0 011.6-1.6h11.2a1.6 1.6 0 011.6 1.6v14.4a1.6 1.6 0 01-1.6 1.6H4.4a1.6 1.6 0 01-1.6-1.6V2.8zm2.4 9.6a.8.8 0 01.8-.8h8a.8.8 0 010 1.6H6a.8.8 0 01-.8-.8zM8 14.8a.8.8 0 000 1.6h4a.8.8 0 000-1.6H8zm-2.8-10a1.2 1.2 0 011.2-1.2h7.2a1.2 1.2 0 011.2 1.2v4a1.2 1.2 0 01-1.2 1.2H6.4a1.2 1.2 0 01-1.2-1.2v-4z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
};

export default LOIcon;
