import "src/styles/mui-classname-setup";

import { StrictMode } from "react";

import { enableMapSet } from "immer";
import ReactDOM from "react-dom";
import enableSidebarMethod from "src/squads/architecture/internals/sidebar";
import enableManaEventEmitter from "src/squads/root/src/internals/mana-event-emitter";

import App from "./app";
import AppProvider from "./app/AppProvider";
import "./index.css";
import { enableReport } from "./internals/stackdriver";
import { enableLogger } from "./internals/warner";

enableMapSet();
enableReport();
enableLogger();

enableSidebarMethod();
enableManaEventEmitter();

ReactDOM.render(
    <StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </StrictMode>,
    document.getElementById("root")
);
