import { useCallback } from "react";

import { createGlobalState } from "react-use";

const useFetchVersion = createGlobalState<number>(0);

function useDataReload() {
    const [version = 0, setVersion] = useFetchVersion();

    return {
        version,
        reload: useCallback(() => setVersion(version + 1), [setVersion, version]),
    };
}

export default useDataReload;
