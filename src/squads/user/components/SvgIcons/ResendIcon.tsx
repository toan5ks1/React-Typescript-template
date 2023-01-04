import { HTMLAttributes } from "react";

const ResendIcon = (props: HTMLAttributes<SVGElement>) => {
    return (
        <svg width={12} height={13} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M10.325 2.342A6.004 6.004 0 0 0 3.86.895a6 6 0 1 0 8.063 6.56c.084-.522-.353-.955-.883-.955h-.038c-.51 0-.912.418-1.026.915A4.08 4.08 0 1 1 8.966 3.7L7.903 4.764a.333.333 0 0 0 .236.57h3.528c.184 0 .333-.15.333-.334V1.471a.333.333 0 0 0-.569-.235l-1.105 1.106Z"
                fill="#586189"
            />
        </svg>
    );
};

export default ResendIcon;
