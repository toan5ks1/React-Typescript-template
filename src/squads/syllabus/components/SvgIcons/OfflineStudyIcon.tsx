interface OfflineStudyIconProps {
    color?: string;
    size?: number;
}

const OfflineStudyIcon = (_props: OfflineStudyIconProps) => {
    return (
        <svg
            data-testid="OfflineStudyIcon__svg"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="none"
            viewBox="0 0 22 22"
        >
            <path
                fill="#fff"
                fillRule="evenodd"
                d="M19.232 12.517a8.233 8.233 0 11-16.466 0 8.233 8.233 0 0116.466 0zm-1.733 0a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0zm-1.3 0a5.2 5.2 0 11-10.4 0 5.2 5.2 0 0110.4 0zm-2.312-2.994l-2.664 1.235a1.173 1.173 0 101.584 1.496l1.08-2.73z"
                clipRule="evenodd"
            ></path>
            <path
                fill="#fff"
                fillRule="evenodd"
                d="M8.617 1.25a.867.867 0 100 1.733h4.766a.867.867 0 100-1.733H8.617zm4.116 1.733H9.267v.867h3.466v-.867z"
                clipRule="evenodd"
            ></path>
            <path
                fill="#fff"
                d="M15.827 4.08a.867.867 0 011.221-.107l1.328 1.114a.867.867 0 01.107 1.221l-.279.332-2.655-2.228.278-.332zM6.196 4.08a.867.867 0 00-1.22-.107L3.646 5.087a.867.867 0 00-.106 1.221l.278.332 2.656-2.228-.279-.332z"
            ></path>
        </svg>
    );
};

export default OfflineStudyIcon;
