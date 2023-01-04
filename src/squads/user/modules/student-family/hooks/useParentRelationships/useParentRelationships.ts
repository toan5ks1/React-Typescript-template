import { getEnumString } from "src/common/constants/helper";
import { pick1stElement } from "src/common/utils/other";
import { ParentSearch } from "src/squads/user/common/types";
import { inferQuery } from "src/squads/user/service/infer-service";

import { FamilyRelationship } from "manabuf/usermgmt/v2/enums_pb";

export interface UseParentRelationshipsReturn {
    isFetchingRelationship: boolean;
}

export default function useParentRelationships(
    userId: ParentSearch["user_id"] | undefined,
    onSuccess: (relationship: keyof FamilyRelationship) => void
): UseParentRelationshipsReturn {
    const { isFetching: isFetchingRelationship } = inferQuery({
        entity: "studentParent",
        action: "userGetParentRelationshipsByParentId",
    })(
        {
            filter: {
                userId,
            },
        },
        {
            enabled: Boolean(userId),
            onSuccess: (student_parents) => {
                let relationship: keyof FamilyRelationship;
                if (!student_parents) {
                    relationship = getEnumString(
                        FamilyRelationship,
                        FamilyRelationship.FAMILY_RELATIONSHIP_FATHER
                    ) as keyof FamilyRelationship;
                } else {
                    relationship = pick1stElement(student_parents)
                        ?.relationship! as keyof FamilyRelationship;
                }
                onSuccess(relationship);
            },
            onError: (error) => {
                window.warner?.warn(`Something is wrong when get relationship`, error);
            },
        }
    );

    return {
        isFetchingRelationship,
    };
}
