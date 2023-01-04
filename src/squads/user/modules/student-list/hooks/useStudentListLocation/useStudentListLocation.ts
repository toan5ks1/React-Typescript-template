import { useMemo } from "react";

import { isEmpty } from "lodash";
import { UserAccessPathInformation, LocationInformationHasura } from "src/squads/user/common/types";
import { inferQuery } from "src/squads/user/service/infer-service";

export interface UseStudentListLocationReturn {
    mapLocations?: Map<string, LocationInformationHasura[]>;
    isLoading: boolean;
    refetch: () => void;
}

export default function useStudentListLocation(studentIds: string[]): UseStudentListLocationReturn {
    const {
        data: dataLocations = [],
        isLoading,
        refetch,
    } = inferQuery({
        action: "userGetManyUserAccessPathsByUserIds",
        entity: "userAccessPath",
    })<UserAccessPathInformation[]>(
        {
            user_ids: studentIds,
        },
        {
            enabled: studentIds.length !== 0,
            selector: (data) => data?.filter((_) => !isEmpty(_.location)),
        }
    );
    const mapLocations = useMemo(() => {
        const map = new Map<string, LocationInformationHasura[]>();
        dataLocations.forEach((data: UserAccessPathInformation) => {
            if (data.user_id) {
                const location = map.get(data.user_id) || [];
                map.set(data.user_id, [...location, { ...data.location }]);
            }
        });

        return map;
    }, [dataLocations]);

    return {
        mapLocations,
        isLoading,
        refetch,
    };
}
