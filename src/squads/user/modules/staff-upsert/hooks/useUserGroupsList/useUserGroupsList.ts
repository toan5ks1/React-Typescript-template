import { useEffect, useRef, useState } from "react";

import { useFormContext } from "react-hook-form";
import { useUnmount } from "react-use";
import { ArrayElement } from "src/common/constants/types";
import { handleUnknownError } from "src/common/utils/error";
import { User_UserGroupsManyReferenceV2Query } from "src/squads/user/service/bob/bob-types";
import { inferStandaloneQuery } from "src/squads/user/service/infer-service";
import { getSearchString } from "src/squads/user/service/utils";

import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export type IUserGroup = ArrayElement<User_UserGroupsManyReferenceV2Query["user_group"]>;

const useUserGroupsList = () => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const [loading, setLoading] = useState(false);
    const [inputVal, setInputVal] = useState("");
    const [data, setData] = useState<IUserGroup[]>([]);

    const unMountedRef = useRef<boolean>(false);

    useUnmount(() => {
        unMountedRef.current = true;
    });

    const { getValues } = useFormContext();

    useEffect(() => {
        void (async () => {
            setLoading(true);
            try {
                const userGroups = await inferStandaloneQuery({
                    entity: "userGroup",
                    action: "userGetManyUserGroupsReference",
                })({ user_group_name: getSearchString(inputVal) });

                if (!unMountedRef.current) setData(userGroups || []);
            } catch (err) {
                const error = handleUnknownError(err);
                window.warner?.log("useUserGroupsList", error.message);
                if (!unMountedRef.current) {
                    showSnackbar(
                        `${t(
                            "ra.message.unableToLoadData"
                        )} userGroups - userUserGroupGetManyReference`,
                        "error"
                    );
                }
            } finally {
                if (!unMountedRef.current) setLoading(false);
            }
        })();
    }, [getValues, inputVal, showSnackbar, t]);
    return {
        loading,
        options: data,
        setInputVal,
    };
};

export default useUserGroupsList;
