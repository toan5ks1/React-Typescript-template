import { isEmpty } from "lodash";
import { UserAccessPathInformation, LocationInformationHasura } from "src/squads/user/common/types";
import { inferQuery } from "src/squads/user/service/infer-service";

export interface UseStudentDetailLocationReturn {
    locations?: LocationInformationHasura[];
    isLoading: boolean;
    refetch: () => void;
}

export default function useStudentDetailLocation(
    studentId: string
): UseStudentDetailLocationReturn {
    const {
        data: dataLocations = [],
        isLoading,
        refetch,
    } = inferQuery({
        action: "userGetManyUserAccessPathsByUserId",
        entity: "userAccessPath",
    })<UserAccessPathInformation[]>(
        {
            user_id: studentId,
        },
        {
            enabled: true,
            selector: (data) => data?.filter((_) => !isEmpty(_.location)),
        }
    );

    const locations: LocationInformationHasura[] = dataLocations.map((data) => data.location);

    return {
        locations,
        isLoading,
        refetch,
    };
}
