import { createBrowserHistory } from "history";
import { start, registerApplication } from "single-spa";

const routeHistory = createBrowserHistory();

//
// registerApplication(
//     "syllabus",
//     () => {
//         // @ts-ignore
//         // eslint-disable-next-line import/no-unresolved
//         return import("@manabie-com/mfe/syllabus");
//     },
//     (location) => location.pathname.startsWith("/syllabus"),
//     {
//         rootElement: "#root1",
//     }
// );
//
registerApplication(
    "user",
    () => {
        // @ts-ignore
        // eslint-disable-next-line import/no-unresolved
        return import("@manabie-com/mfe/user");
    },
    (location) => location.pathname.startsWith("/user") || location.pathname === "/",
    {
        rootElement: "#root1",
        basename: "/user",
        routeHistory: routeHistory,
    }
);
//
// registerApplication(
//     "adobo",
//     () => {
//         // @ts-ignore
//         // eslint-disable-next-line import/no-unresolved
//         return import("@manabie-com/mfe/adobo");
//     },
//     (location) => location.pathname.startsWith("/adobo"),
//     {
//         rootElement: "#root1",
//     }
// );

start({
    urlRerouteOnly: true,
});
