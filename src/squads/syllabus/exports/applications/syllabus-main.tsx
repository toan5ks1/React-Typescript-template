import * as React2 from "react";

import * as ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";

import Syllabus from "./Syllabus";

// In production, we produce a script with vite library mode, and use that in the root micro
const reactLifecycles = singleSpaReact({
    React: React2, // jsxInject inject react automatically, so we use a different name
    ReactDOM: ReactDOM,
    rootComponent: Syllabus,
    domElementGetter: ({ rootElement }: any) => {
        return document.querySelector(rootElement);
    },
});

export const bootstrap = reactLifecycles.bootstrap;
export const mount = reactLifecycles.mount;
export const unmount = reactLifecycles.unmount;
