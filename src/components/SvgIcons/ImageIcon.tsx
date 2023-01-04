import { HTMLAttributes } from "react";

const ImageIcon = (props: HTMLAttributes<SVGElement>) => {
    return (
        <svg
            width="28px"
            height="28px"
            viewBox="0 0 28 28"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <image
                width={28}
                height={28}
                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAilBMVEUAAABMq1BNr1BLr1BM r1BMr1BKrVBNr1BIr1BMr1BOsVFJrFBMr1BMrlBLr1BYtV1Kr1Bnu2tmumljumdkumdJr1BMr1BZ tFxNr1BMr1BXtFua0p3S69NiuWbp9en///+a0py84b30+vSEyIal16el16h5w3zH5siw3LKPzZF5 w3vd8N6PzZKx3LIAP7yPAAAAGXRSTlMAQI/P779g3yDPX1BAkN/fYM/f7+9QUO9gCnExUQAAAAFi S0dEHwUNEL0AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfmBBwJIwkrIuiSAAABA0lEQVQo z3WT63qDIAxAsaJoq86uu2GBTLdit27v/3oDA1XBnT/m40hIJBLiSXYp5Zxmu4SE5IzfYflKFSVf wYrZ7SkPoAfvDnyDvctJtyTFzIxvkk518n/IFxu7UDJCKheeRbQ1ITUGUsF7KGuSYdADDDIqCfv4 AEOYmBJ8KivhM7AoL4BoXx2WPqWVzoHCRQkjpi2xGsfVH2JPyGwrXzCj/SHatlLZFmdM4u8pMI2Z kWiusGTs3Lu3B/NtW7GS4PP0rb2Wo4IN1CNe9mmI3fDkxqiV0V4ln/0QvZz6tRtf3xaj2ehxVkKn xWpy20b+/IqbEv25a9po5qs6s79DWVf3pT+KNUDdtIsBtAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAy Mi0wNC0yOFQwNjozNTowOSswMzowMDSINb0AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjItMDQtMjhU MDY6MzU6MDkrMDM6MDBF1Y0BAAAAAElFTkSuQmCC"
            />
        </svg>
    );
};

export default ImageIcon;
