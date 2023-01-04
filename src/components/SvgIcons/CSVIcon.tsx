import { HTMLAttributes } from "react";

const CSVIcon = (props: HTMLAttributes<SVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={28}
            height={28}
            xmlSpace="preserve"
            {...props}
        >
            <image
                width={28}
                height={28}
                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAmVBMVEUAAACbJK+dJ7GcJrCc J7CcJ7CdKK+cJ7CaJa+XKK+cJrGcJq+bKK+cJ6+cJa+cJ7CaKK+cJ7C7asjUoNzNk9eoQrq1XcOv T7/BeM7ZruH////58vrHhdLNk9iiNLX58frBeM3gvObaruHy5PXs1/Dmyeu1XcTgu+bToNzHhdPz 5PWvUL6pQrrUoN27a8nt1/DOk9e7asmvUL8lnYIPAAAAEXRSTlMAQI/P779g32AgX1BAkJDPYHcZ 010AAAABYktHRBp1Z+QyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5gQTDzkmbDBD9AAA AR9JREFUKM+FU21bgzAQ60aRscFcVorz0G6CVMB3//+P88rcJgiYL/dw4UKuDUKcMJt7EpD+fCb6 uApwRrDoUKGHDoLwwi0lepCrE7fCAJY/mnKIlEflAIPwWp8YwWJ8kC3z7q5uVaK5pEptcZPsAJ0k QCRibt5SRnSHe8oyUob2wIEegLXweY5y6GyPgrR5LExJFk/E49eC96h4CtaipDxlnZoSZGR4G8FP OR1aBzonajQMlZa1GI6sHPmc4sXoV2rAChW9tSTL2vabjaZ3tHo1OU9O1t1H6Wx+QFFWuBcMHVX9 dhXscmW5fKq8Ns5S8uW6axFhFNH08U0fvPDGB/+5bLEZIi8h+huwza9o9ix7YSe5E6F2iGLf/Q5e HJ1b3x0ELuKuBoZJAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTA0LTE5VDEyOjU3OjM4KzAzOjAw UHRiYQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wNC0xOVQxMjo1NzozOCswMzowMCEp2t0AAAAA SUVORK5CYII="
            />
        </svg>
    );
};

export default CSVIcon;
