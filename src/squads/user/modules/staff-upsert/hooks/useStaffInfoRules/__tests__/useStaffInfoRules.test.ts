import { REGEX_VALIDATE_EMAIL } from "src/common/constants/const";
import { inferStandaloneQuery } from "src/squads/user/service/infer-service";
import { createMockUsersFilterByEmail } from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import useUserValidateRules from "../useStaffInfoRules";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferStandaloneQuery: jest.fn(),
}));

jest.mock("react-hook-form", () => {
    const reactHookForm = jest.requireActual("react-hook-form");
    return {
        ...reactHookForm,
        useFormContext: () => ({
            getValues: jest.fn(),
        }),
    };
});

jest.useFakeTimers("modern");

const respUserByEmailOrPhone = createMockUsersFilterByEmail();

describe("useStaffInfoRules", () => {
    const expectResult = {
        required: {
            value: true,
            message: "This field is required",
        },
        pattern: {
            email: {
                value: REGEX_VALIDATE_EMAIL,
                message: "Email address is not valid",
            },
        },
        messages: {
            existed: "Email address already exists",
        },
    };
    const { required, pattern, messages } = expectResult;

    it("should call debounce util", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(() => () => {
            return [];
        });

        const {
            result: { current },
        } = renderHook(() => useUserValidateRules());

        const promises: Promise<string | undefined>[] = Array.from(
            { length: 10 },
            (_, i) => current.validate.email(`email_${i}@manabie.com`)!
        );

        await Promise.all(promises);

        // Fast-forward time => 500ms will be passed
        jest.runAllTimers();

        expect(inferStandaloneQuery).toBeCalledTimes(2);
    });

    it("should validate email already exists in the system", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(() => () => {
            return [respUserByEmailOrPhone];
        });
        const {
            result: { current },
        } = renderHook(() => useUserValidateRules(), {
            wrapper: TestCommonAppProvider,
        });

        expect(current.required).toEqual(required);
        expect(current.pattern).toEqual(pattern);

        expect(await current.validate.email("email_existed@manabie.com")).toEqual(messages.existed);
    });

    it("should validate email format", async () => {
        const {
            result: { current },
        } = renderHook(() => useUserValidateRules());

        const checkInvalidEmailFormat = current.pattern.email.value.test("manabie.com");
        expect(checkInvalidEmailFormat).toEqual(false);

        const checkValidEmailFormat = current.pattern.email.value.test("test.nguyen@manabie.com");
        expect(checkValidEmailFormat).toEqual(true);
    });
});
