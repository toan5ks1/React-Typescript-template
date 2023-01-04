import { HTMLAttributes } from "react";

const FileIcon = (props: HTMLAttributes<SVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={28}
            height={28}
            xmlSpace="preserve"
            {...props}
        >
            <image
                width="100%"
                height="100%"
                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElN RQfmBBMPOinXog2mAAAA30lEQVRIx2NgoBJghLNEGOwZdIjQ0YhfWofhNcN/oiABMJ9IY3AaxAKl IxgYGBgYGigPo/9oIUYyYCJfK3avoQMHBnssojcYVhIyEDkgTRgu4wzqfFIMOo3DkN/EGIVsEC7X BBNjFDEGMRBjFHEGEWEUsQYRNIp4gwgYRYpBeI0izSCEUeEwAXKzyFqGCIY/DAwMGjABFhI04y2L qJZpRw2io0Gw6G+glkGNFJlCTa+NMIP+kKD/Cz6DNpBg0FF8kjYM34lsmUxHaMLebNBh8GbgIOCW HwwrGR6QE5oEAADy5/IIXX8MJwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMi0wNC0xOVQxMjo1ODo0 MSswMzowMD4idSYAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjItMDQtMTlUMTI6NTg6NDErMDM6MDBP f82aAAAAAElFTkSuQmCC"
            />
        </svg>
    );
};

export default FileIcon;
