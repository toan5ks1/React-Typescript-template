import { forwardRef, ReactElement, useEffect, useState } from "react";

import ReactDOM from "react-dom";

//using forwardRef avoid Function components cannot be given refs
const WrapperPortalBase = forwardRef(
    (
        props: {
            children: ReactElement | ReactElement[] | string;
            selector: string;
        },
        _ref
    ) => {
        const { children, selector } = props;
        const [container, setContainer] = useState<Element | null>(null);

        useEffect(() => {
            setContainer(document.getElementById(selector));
        }, [selector]);

        if (!container) return null;

        return ReactDOM.createPortal(children, container);
    }
);

export default WrapperPortalBase;
