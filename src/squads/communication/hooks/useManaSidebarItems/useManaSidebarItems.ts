import { useMemo } from "react";

import getSidebarMethod from "src/squads/communication/internals/sidebar";

const useManaSidebarItems = () => {
    const sidebarMethods = useMemo(() => {
        const sidebar = getSidebarMethod();
        if (!sidebar) {
            window.warner?.error("[useManaSidebarItems]: cannot get sidebar");
        }
        return sidebar;
    }, []);

    return sidebarMethods;
};
export default useManaSidebarItems;
