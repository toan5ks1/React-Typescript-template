import { HTMLAttributes } from "react";

const RenewPassIcon = (props: HTMLAttributes<SVGElement>) => {
    return (
        <svg width={158} height={118} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect x={1} y={10} width={157} height={108} rx={11.15} fill="#1938A9" />
            <mask id="a" fill="#fff">
                <rect x={1} width={157} height={108} rx={11.15} />
            </mask>
            <rect
                x={1}
                width={157}
                height={108}
                rx={11.15}
                fill="#F8F9FC"
                stroke="#395AD2"
                strokeWidth={27.875}
                mask="url(#a)"
            />
            <path
                opacity={0.04}
                d="M.665 20.939c0-6.158 4.992-11.15 11.15-11.15h134.373c6.158 0 11.15 4.992 11.15 11.15v2.254a11.15 11.15 0 0 1-5.241 9.455L84.91 74.64a11.15 11.15 0 0 1-11.818 0L5.905 32.648a11.15 11.15 0 0 1-5.24-9.455V20.94Z"
                fill="#000"
            />
            <path
                d="M.665 11.15C.665 4.992 5.657 0 11.815 0h134.373c6.158 0 11.15 4.992 11.15 11.15v2.254a11.15 11.15 0 0 1-5.241 9.455L84.91 64.851a11.15 11.15 0 0 1-11.818 0L5.905 22.86a11.15 11.15 0 0 1-5.24-9.455V11.15Z"
                fill="#F8F9FC"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.352 7.281a11.127 11.127 0 0 0-.689 3.866v2.255a11.15 11.15 0 0 0 5.24 9.455L73.09 64.848a11.15 11.15 0 0 0 11.82 0l67.186-41.991a11.15 11.15 0 0 0 5.24-9.455v-2.255c0-1.359-.243-2.661-.688-3.866L79 55.811 1.352 7.281Z"
                fill="#5E7EF2"
            />
        </svg>
    );
};

export default RenewPassIcon;
