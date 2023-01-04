import { useWatch } from "react-hook-form";
import { REGEX_VALIDATE_EMAIL } from "src/common/constants/const";
import { inferStandaloneQuery } from "src/squads/user/service/infer-service";
import { createMockUsersFilterByEmail } from "src/squads/user/test-utils/mocks/student";

import { Country } from "manabuf/common/v1/enums_pb";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useStudentInfoRules, {
    UseStudentInfoRulesReturn,
} from "src/squads/user/modules/student-upsert/hooks/useStudentInfoRules";

const expectResult = {
    required: {
        value: true,
        message: "resources.input.error.required",
    },
    pattern: {
        email: {
            value: REGEX_VALIDATE_EMAIL,
            message: "messages.error.invalid",
        },
    },
    messages: {
        exited: "messages.error.exited",
        hasOnList: "messages.error.hasInsertedOnListParents",
        invalid: "messages.error.invalid",
    },
};

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

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");

    return {
        __esModule: true,
        ...originalModule,
        useWatch: jest.fn(),
    };
});

const respUserByEmailOrPhone = createMockUsersFilterByEmail();

describe("useStudentInfoRules", () => {
    beforeEach(() => {
        (useWatch as jest.Mock).mockImplementation(() => {
            return [Country.COUNTRY_VN, "user_id_1"];
        });
    });

    const { required, pattern, messages } = expectResult;

    it("should return student info rule", () => {
        const {
            result: { current },
        }: RenderHookResult<null, UseStudentInfoRulesReturn> = renderHook(() =>
            useStudentInfoRules()
        );

        expect(current.required).toEqual(required);
        expect(current.pattern).toEqual(pattern);
    });

    it("should call debounce util", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(() => () => []);

        const {
            result: { current },
        }: RenderHookResult<null, UseStudentInfoRulesReturn> = renderHook(() =>
            useStudentInfoRules()
        );

        const promises: Promise<string | undefined>[] = Array.from(
            { length: 10 },
            (_, i) => current.validate.email(`email_${i}@manabie.com`)!
        );

        await Promise.all(promises);

        // Fast-forward time => 500ms will be passed
        jest.runAllTimers();

        expect(inferStandaloneQuery).toBeCalledTimes(2);
    });

    it("should validation email, phone already exists in the system", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(() => () => [
            respUserByEmailOrPhone,
        ]);

        const {
            result: { current },
        }: RenderHookResult<null, UseStudentInfoRulesReturn> = renderHook(() =>
            useStudentInfoRules()
        );

        expect(await current.validate.email("email_exited@manabie.com")).toEqual(messages.exited);
        expect(await current.validate.phone("0323333333")).toEqual(messages.exited);
    });

    it("should validation email, phone in the state", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(() => () => []);

        const {
            result: { current },
        }: RenderHookResult<null, UseStudentInfoRulesReturn> = renderHook(() =>
            useStudentInfoRules()
        );

        expect(current.required).toEqual(required);
        expect(current.pattern).toEqual(pattern);

        expect(await current.validate.phone("1111")).toEqual(messages.invalid);
        expect(await current.validate.phone("")).toBeUndefined();
    });
});
