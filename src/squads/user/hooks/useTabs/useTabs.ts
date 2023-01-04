import { ChangeEvent, FormEvent, ReactElement, useCallback, useState } from "react";

import { useHistory } from "react-router";
import { parseQuery, setQuery } from "src/common/utils/query";

export interface MapTabReturns {
    index?: number | string;
    tabName: ReactElement;
    tabPanel: ReactElement;
}

export interface UseTabsOptions {
    updateInQuery?: boolean;
}
export interface UseTabsReturn<T> {
    currentTab: T;
    changeCurrentTab: (newTabNumber: T) => void;
    handleChangeCurrentTabForTabBase: (
        _event: ChangeEvent<{}> | FormEvent<HTMLButtonElement>,
        newTabIndex?: T
    ) => void;
}

function useTabs<T>(defaultVal?: T, options?: UseTabsOptions): UseTabsReturn<T> {
    const updateInQuery = options?.updateInQuery;

    const history = useHistory();
    const [currentTab, setCurrentTab] = useState<T>(() => {
        if (defaultVal !== undefined) {
            return defaultVal;
        }

        const { tab } = parseQuery(window.location.search, true);
        if (tab !== undefined) {
            return tab as any;
        }

        return 0;
    });

    const changeCurrentTab = useCallback(
        (newTabIndex: T) => {
            if (updateInQuery) {
                history.push({
                    search: setQuery(history.location.search, "tab", String(newTabIndex)),
                });
            }
            setCurrentTab(newTabIndex);
        },
        [history, updateInQuery]
    );

    const handleChangeCurrentTabForTabBase = useCallback(
        (_event: ChangeEvent<{}> | FormEvent<HTMLButtonElement>, newTabIndex?: T) => {
            if (typeof newTabIndex === "undefined") return;
            changeCurrentTab(newTabIndex);
        },
        [changeCurrentTab]
    );

    return {
        currentTab,
        changeCurrentTab,
        handleChangeCurrentTabForTabBase,
    };
}

export default useTabs;
