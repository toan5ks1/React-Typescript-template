interface TaskAssignmentIconProps {
    color?: string;
    size?: number;
}

const TaskAssignmentIcon = (_props: TaskAssignmentIconProps) => {
    return (
        <svg
            width="32"
            height="33"
            viewBox="0 0 32 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-testid="TaskAssignmentIcon__svg"
        >
            <path d="M0 16.3281C0 7.49157 7.16344 0.328125 16 0.328125C24.8366 0.328125 32 7.49157 32 16.3281C32 25.1647 24.8366 32.3281 16 32.3281C7.16344 32.3281 0 25.1647 0 16.3281Z" />
            <g clipPath="url(#clip0_25670_112351)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.80078 10.3268C8.79945 9.22215 9.69388 8.32562 10.7985 8.32436L21.1985 8.3125C22.303 8.31124 23.1994 9.20557 23.2008 10.3101L23.2153 22.3101C23.2166 23.4147 22.3222 24.3112 21.2175 24.3125L10.8176 24.3244C9.71303 24.3256 8.8166 23.4313 8.81527 22.3268L8.80078 10.3268ZM10.4003 9.94019L21.6003 9.92764L21.6158 22.7276L10.4158 22.7402L10.4003 9.94019ZM12.0003 11.5267H20.0003V16.3267H12.0003V11.5267ZM17.4003 13.9267L14.7003 15.5267V12.3267L17.4003 13.9267ZM12.0003 17.1267H20.0003V18.7267H12.0003V17.1267ZM18.4003 19.5267H13.6003V21.1267H18.4003V19.5267Z"
                    fill="white"
                />
            </g>
            <defs>
                <clipPath id="clip0_25670_112351">
                    <rect
                        width="19.2"
                        height="19.2"
                        fill="white"
                        transform="translate(6.40039 6.72656)"
                    />
                </clipPath>
            </defs>
        </svg>
    );
};

export default TaskAssignmentIcon;
