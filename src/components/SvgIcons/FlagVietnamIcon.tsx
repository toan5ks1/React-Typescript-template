import { HTMLAttributes } from "react";

const FlagVietnamIcon = (props: HTMLAttributes<SVGElement>) => {
    return (
        <svg
            width={30}
            height={24}
            viewBox="0 0 30 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect width={30} height={24} rx={2} fill="#fff" />
            <mask
                id="a"
                mask-type="alpha"
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={30}
                height={24}
            >
                <rect width={30} height={24} rx={2} fill="#fff" />
            </mask>
            <g mask="url(#a)">
                <path fill="#EA403F" d="M0 0h30v24H0z" />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="m15 14.34-3.527 2.514 1.301-4.13-3.48-2.578 4.33-.04L15 6l1.375 4.107 4.331.039-3.48 2.577 1.3 4.131L15 14.34Z"
                    fill="#FFFE4E"
                />
            </g>
        </svg>
    );
};

export default FlagVietnamIcon;
