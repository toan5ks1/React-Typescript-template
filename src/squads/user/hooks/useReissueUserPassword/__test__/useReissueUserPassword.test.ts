import { inferMutation } from "src/squads/user/service/infer-service";

import { userPassword as mockData } from "../__mocks__";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useReissueUserPassword, {
    UseReissueUserPasswordReturn,
} from "src/squads/user/hooks/useReissueUserPassword";

jest.mock("src/squads/user/service/infer-service", () => {
    return {
        __esModule: true,
        inferMutation: jest.fn(),
    };
});

describe("useReissueUserPassword", () => {
    it("should return new password", async () => {
        (inferMutation as jest.Mock).mockReturnValue(() => ({
            mutateAsync: () => mockData,
        }));

        const { result }: RenderHookResult<null, UseReissueUserPasswordReturn> = renderHook(() =>
            useReissueUserPassword()
        );

        expect(
            await result.current.reissueUserPassword({
                userId: "user_id",
            })
        ).toEqual(mockData);
    });
});
