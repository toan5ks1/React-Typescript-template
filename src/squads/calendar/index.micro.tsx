import { StrictMode } from "react";

import { createBrowserHistory } from "history";
import ReactDOM from "react-dom";

import Calendar from "./exports/applications/Calendar";

const history = createBrowserHistory();

ReactDOM.render(
    <StrictMode>
        <Calendar basename="/" routeHistory={history} />
    </StrictMode>,
    document.getElementById("root")
);
