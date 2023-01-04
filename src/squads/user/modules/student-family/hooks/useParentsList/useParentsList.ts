import { ParentSearch } from "src/squads/user/common/types";
import { inferQuery } from "src/squads/user/service/infer-service";

export interface UseParentsListReturn {
    parents: ParentSearch[];
    isLoading: boolean;
}

export default function useParentsList(keyword: string): UseParentsListReturn {
    const { data: parents = [], isLoading } = inferQuery({
        entity: "parent",
        action: "userGetManyParentsBySearch",
    })(
        {
            filter: {
                email: keyword,
                name: keyword,
            },
        },
        {
            enabled: true,
        }
    );
    return { parents, isLoading };
}
