import { inferStandaloneQuery } from "src/squads/user/service/infer-service";
import { createMockUsersFilterByEmail } from "src/squads/user/test-utils/mocks/student";

import useUserValidateRules, { UseUserValidateRulesReturn } from "../useUserValidateRules";
import { mockExpectResult } from "./test-utils";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";

jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferStandaloneQuery: jest.fn(),
}));

jest.mock("src/squads/user/hooks/useResourceTranslate", () => {
    return () => (translateKey: string) => translateKey;
});

jest.mock("src/squads/user/hooks/useTranslate", () => {
    return () => (translateKey: string) => translateKey;
});

jest.useFakeTimers("modern");

const respUserByEmailOrPhone = createMockUsersFilterByEmail();

describe("useUserValidateRules for SCHOOL ADMIN", () => {
    const { required, pattern, messages } = mockExpectResult;

    it("should return student info rule", () => {
        const {
            result: { current },
        }: RenderHookResult<null, UseUserValidateRulesReturn> = renderHook(() =>
            useUserValidateRules()
        );

        expect(current.required).toEqual(required);
        expect(current.pattern).toEqual(pattern);
    });

    it("should call debounce util", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(() => () => []);
        const {
            result: { current },
        }: RenderHookResult<null, UseUserValidateRulesReturn> = renderHook(() =>
            useUserValidateRules()
        );

        const promises: Promise<string | undefined>[] = Array.from(
            { length: 10 },
            (_, i) => current.validate.email(`email_${i}@manabie.com`)!
        );

        await Promise.all(promises);

        // Fast forward time => 500ms will be passed
        jest.runAllTimers();

        expect(inferStandaloneQuery).toBeCalledTimes(2);
    });

    it("should validation email format", async () => {
        const {
            result: { current },
        }: RenderHookResult<null, UseUserValidateRulesReturn> = renderHook(() =>
            useUserValidateRules()
        );

        const checkInvalidEmailFormat = current.pattern.email.value.test("manabie.com");
        expect(checkInvalidEmailFormat).toEqual(false);

        const checkValidEmailFormat = current.pattern.email.value.test("loc.nguyen@manabie.com");
        expect(checkValidEmailFormat).toEqual(true);
    });

    it("should validation email, phone already exists in the system", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(() => () => [
            respUserByEmailOrPhone,
        ]);
        const {
            result: { current },
        }: RenderHookResult<null, UseUserValidateRulesReturn> = renderHook(() =>
            useUserValidateRules()
        );

        expect(await current.validate.email("email_exited@manabie.com")).toEqual(messages.exited);
        expect(await current.validate.phone("0323333333")).toEqual(messages.exited);
    });
});
