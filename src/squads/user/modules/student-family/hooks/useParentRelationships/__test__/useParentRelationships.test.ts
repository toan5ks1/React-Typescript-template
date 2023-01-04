import {
    ParentRelationshipsByUserIdQuery,
    ParentRelationshipsByUserIdQueryVariables,
} from "src/squads/user/service/bob/bob-types";
import studentParent from "src/squads/user/service/define-service/student-parents-service";
import { inferQuery } from "src/squads/user/service/infer-service";
import type { UseQueryBaseOptions } from "src/squads/user/service/service-creator";
import { mockWarner } from "src/squads/user/test-utils/warner";

import { renderHook } from "@testing-library/react-hooks";
import useParentRelationships from "src/squads/user/modules/student-family/hooks/useParentRelationships";

jest.mock("src/squads/user/service/infer-service", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});
describe("useParentRelationships", () => {
    const std = mockWarner();

    it("should return FAMILY_RELATIONSHIP_FATHER", () => {
        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "studentParent"; action: keyof typeof studentParent.query }) =>
                (
                    _params: ParentRelationshipsByUserIdQueryVariables,
                    options?: UseQueryBaseOptions<
                        ParentRelationshipsByUserIdQuery["student_parents"] | undefined
                    >
                ) => {
                    if (resource.action === "userGetParentRelationshipsByParentId") {
                        const result = [
                            {
                                relationship: "FAMILY_RELATIONSHIP_FATHER",
                            },
                        ];
                        options?.onSuccess?.(result);
                        return result;
                    }
                }
        );
        const onSuccess = jest.fn();
        renderHook(() => useParentRelationships("userId", onSuccess));
        expect(onSuccess).toBeCalledWith("FAMILY_RELATIONSHIP_FATHER");
    });

    it("should return the error", () => {
        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "studentParent"; action: keyof typeof studentParent.query }) =>
                (
                    _params: ParentRelationshipsByUserIdQueryVariables,
                    options?: UseQueryBaseOptions<
                        ParentRelationshipsByUserIdQuery["student_parents"] | undefined
                    >
                ) => {
                    if (resource.action === "userGetParentRelationshipsByParentId") {
                        options?.onError?.(Error("Error"));
                    }
                }
        );
        renderHook(() => useParentRelationships("userId", jest.fn()));

        expect(std.warn).toBeCalledWith(`Something is wrong when get relationship`, Error("Error"));
    });
});
