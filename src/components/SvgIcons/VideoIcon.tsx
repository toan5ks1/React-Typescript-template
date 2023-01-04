import { HTMLAttributes } from "react";

const VideoIcon = (props: HTMLAttributes<SVGElement>) => {
    return (
        <svg
            width={28}
            height={28}
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14Z"
                fill="#2196F3"
            />
            <g clipPath="url(#clip0_25727_62859)">
                <path
                    d="M12.3667 11.2559L16.6706 13.9999L12.3667 16.7439V11.2559ZM10.7334 8.2832V19.7165L19.7167 13.9999L10.7334 8.2832Z"
                    fill="white"
                />
            </g>
            <defs>
                <clipPath id="clip0_25727_62859">
                    <rect
                        width={19.6}
                        height={19.6}
                        fill="white"
                        transform="translate(4.2002 4.19922)"
                    />
                </clipPath>
            </defs>
        </svg>
    );
};

export default VideoIcon;
