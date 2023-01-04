import { Entities } from "../common/constants/enum";
import AppRouter from "./AppRouter";

import useNetWorkNotification from "src/hooks/useNetWorkNotification";
import useQueryParams from "src/hooks/useQueryParams";

const App = () => {
    useQueryParams({
        resource: window.location.pathname.split("/")[1] as Entities,
        search: window.location.search,
    });

    useNetWorkNotification();

    return <AppRouter />;
};

export default App;
