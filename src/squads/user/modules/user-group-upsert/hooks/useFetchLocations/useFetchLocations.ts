import { useEffect, useRef, useState } from "react";

import { useUnmount } from "react-use";
import { getLeafLocationsByRecursive } from "src/squads/user/common/helpers/tree-locations";
import { inferStandaloneQuery } from "src/squads/user/service/infer-service";

import {
    TreeLocationProps,
    buildTreeLocations,
    removeInvalidNodeByRecursive,
} from "src/squads/user/hooks/useMapTreeLocations";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

const useFetchLocations = () => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const [loading, setLoading] = useState(false);
    const [leafLocations, setLeafLocations] = useState<TreeLocationProps[]>([]);
    const [treeLocations, setTreeLocations] = useState<TreeLocationProps>({
        locationId: "",
        name: "",
        locationType: "",
        parentLocationId: "",
        accessPath: "",
    });

    const unMountedRef = useRef<boolean>(false);

    useUnmount(() => {
        unMountedRef.current = true;
    });

    useEffect(() => {
        void (async () => {
            setLoading(true);
            try {
                const locations = await inferStandaloneQuery({
                    entity: "location",
                    action: "userGetManyLocations",
                })({});

                const { roots, maxLevel } = buildTreeLocations(locations);
                const validLocations = removeInvalidNodeByRecursive(roots[0], maxLevel);
                const leafLocations = getLeafLocationsByRecursive({ node: validLocations });
                if (!unMountedRef.current) {
                    setLeafLocations(leafLocations);
                    setTreeLocations(validLocations);
                }
            } catch (err) {
                window.warner?.log("useFetchTreeLocations", err);
                if (!unMountedRef.current) {
                    showSnackbar(`${t("ra.message.unableToLoadData")} Fetch locations.`, "error");
                }
            } finally {
                if (!unMountedRef.current) setLoading(false);
            }
        })();
    }, [showSnackbar, t]);

    return {
        leafLocations,
        treeLocations,
        isLoading: loading,
    };
};

export default useFetchLocations;
