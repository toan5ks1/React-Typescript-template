import { useEffect, useState } from "react";

import { getSidebarMethod } from "../../internals/sidebar";

const useManaSidebarItems = () => {
    const [menu, setMenu] = useState<ISidebarItem[]>([]);

    const sidebar = getSidebarMethod();
    if (!sidebar) {
        window.warner?.error("[useManaSidebarItems]: cannot get sidebar");
    }

    useEffect(() => {
        sidebar.onValueChanged((items) => {
            setMenu(items);
        });
    }, [sidebar]);

    return menu;
};

export default useManaSidebarItems;
