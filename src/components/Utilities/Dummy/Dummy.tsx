import { cloneElement, isValidElement, PropsWithChildren } from "react";

import isEmpty from "lodash/isEmpty";

//Dummy component born for preventing react admin clone element and pass some unknown props,
// which can cause react warning

export interface DummyProps {
    record?: any;
}

const Dummy = ({ children, record }: PropsWithChildren<DummyProps>) => {
    if (!isValidElement(children)) return null;

    if (!isEmpty(record)) return cloneElement(children, { record });

    return children;
};

export default Dummy;
