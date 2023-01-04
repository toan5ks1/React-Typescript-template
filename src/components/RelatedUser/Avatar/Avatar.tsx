import { ReactNode, CSSProperties, ReactChild } from "react";

import { Avatar as MuiAvatar, AvatarProps } from "@mui/material";
import Dummy from "src/components/Utilities/Dummy";

import { isUndefined } from "../../../common/utils/other";
import { toUnit } from "../../../styles";
import Tooltip from "../../Tooltip";

const sizes = {
    small: 3,
    medium: 4,
    large: 5,
};

function getSize(rectType = "width") {
    return ({ [rectType]: a, size = "small", theme }: any) =>
        isUndefined(a) && size !== "huge" ? theme.spacing(sizes[size]) : toUnit(a);
}

const defaultAvatar =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALWSURBVHgBtVbPTxNBFP52CxcwoYemhgspcDGRKnoQDia2chEsdBpjoFVjAwFijIlHA1HSePDmwb9AT8ao2UIqURTRRKM3qnLwoLSQqCkhoSj1YFvWeV36g3Z3W7blSzbdvnn7vplv3pt5AiqA6zFzCHVwbwMOAbBxk3lnKM6fMLeF5RSmQ+eDb8rFEvQG+54yv0nElKyQlAUPFk1vIzB7Lnhfx6cUZyRmqwMk/toJAyDiJOB87glGi8fEYsPAtOcyJ1s0SkYgRShG7xPGVCaTBzmYTJmV1QyiKPhn3NKDEsIdGWllZtQW8RRwLCtvTtJ6YGEfyAhmE/KqZQgpGyvNRCPgMnYSR46QUl/vg8b6RlSLLIfgkpgDipyqGGjvR3fzCUy8u4mqkYJT5DnMtMatDVa4212wWzo4sQtVwwQmcoGPao37Dg1mSJX3ody7UcgCTtEeqhY4ydjTcjr3n/bx+vFrqAZ0DhOhaimM2kdKbCStl6+6CphFNatXRz6Sloj1QImmldlEGC80EJGvzCpIWq2A9P2ofVhL/jgRRgstvgoko6Ba0t45eTvz293cpeYTprJ4m/3X0+LclSh6cHPZiqUt3ooS+WV8orIIZmdNDntBobR2y2FVdSa7buQnkVa4cFZikeC3GdkIPvz8KA+GLsixREzT53t8WR56dilCXKKyUgTamlphBLRX95x3dQ+FyGYEv//9Cewyjr+8uqg3S6OgmGNzVyJZnlwdrmz98Ey8vxVPJBOoFSjWJI+5mvjlVHXok5h/+MWYXIuVUgyK1Ssxpjsrfl2xkbnxjVcr87JRUCJ5Qxc3+iXl0i2EZpvI24KFI5YOG11LlBiV4Mv6Eh5+fYTP60vhNOBRaxP1G2E+Q+4wdbDBaqMCbmuyoZVnM9XeAf7E/q5hjT/Lm1HMr77GVjIRpYyf9eyxES5Gpiugi1q5O+k6K2z1o5nTih8gIU/5Vv8/Fb0FC+2Rps8AAAAASUVORK5CYII=";

interface Props extends AvatarProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    alt?: string;
    src?: string;
    text?: string;
    tooltip?: ReactNode;
    prefix?: string;
    size?: "small" | "medium" | "large" | "huge";
}

const Avatar = (props: Props) => {
    const {
        className,
        style,
        alt,
        text = "",
        src,
        tooltip,
        size = "small",
        prefix = "",
        children,
        sx = [],
        ...rest
    } = props;

    const Wrapper = typeof tooltip !== "undefined" ? Tooltip : Dummy;
    return (
        <Wrapper title={tooltip as ReactChild}>
            <MuiAvatar
                className={className}
                sx={[
                    (theme) =>
                        size === "huge"
                            ? {
                                  border: `1px solid ${theme.palette.border?.main}`,
                                  width: "40px",
                                  height: "40px",
                              }
                            : {
                                  border: `1px solid ${theme.palette.border?.main}`,
                                  width: getSize("width")({ ...props, theme }),
                                  height: getSize("height")({ ...props, theme }),
                              },
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
                style={style}
                alt={alt}
                src={src || defaultAvatar}
                sizes={size}
                {...rest}
            >
                {!src ? `${prefix}${text?.slice(0, 1)}` : ""}
            </MuiAvatar>
        </Wrapper>
    );
};

export default Avatar;
