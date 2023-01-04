import * as React1 from "react";

import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";

import Adobo from "./Adobo";

// In production, we produce a script with vite library mode, and use that in the root micro
const reactLifecycles = singleSpaReact({
    React: React1,
    ReactDOM: ReactDOM,
    rootComponent: Adobo,
    errorBoundary: Adobo.ErrorBoundary,
});

export const bootstrap = reactLifecycles.bootstrap;
export const mount = reactLifecycles.mount;
export const unmount = reactLifecycles.unmount;
