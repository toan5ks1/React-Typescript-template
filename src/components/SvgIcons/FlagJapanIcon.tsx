import { HTMLAttributes } from "react";

const FlagJapanIcon = (props: HTMLAttributes<SVGElement>) => {
    return (
        <svg
            width={30}
            height={24}
            viewBox="0 0 30 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect
                x={0.25}
                y={0.25}
                width={29.5}
                height={23.5}
                rx={1.75}
                fill="#fff"
                stroke="#BDBDBD"
                strokeWidth={0.5}
            />
            <mask
                id="a"
                mask-type="alpha"
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={30}
                height={24}
            >
                <rect
                    x={0.25}
                    y={0.25}
                    width={29.5}
                    height={23.5}
                    rx={1.75}
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth={0.5}
                />
            </mask>
            <g mask="url(#a)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
                    fill="url(#b)"
                />
            </g>
            <defs>
                <linearGradient id="b" x1={9} y1={6} x2={9} y2={18} gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D81441" />
                    <stop offset={1} stopColor="#BB0831" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default FlagJapanIcon;
