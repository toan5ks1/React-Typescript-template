import { useWatch } from "react-hook-form";
import { inferStandaloneQuery } from "src/squads/user/service/infer-service";
import {
    mockParentUpdate,
    mockUseParentValidateRulesResult,
} from "src/squads/user/test-utils/mocks/family";
import {
    createMockListParent,
    createMockUsersFilterByEmail,
} from "src/squads/user/test-utils/mocks/student";

import { Country } from "manabuf/common/v1/enums_pb";

import useParentValidateRules, { UseParentValidateRulesReturn } from "../useParentValidateRules";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";

const mockParentListData = createMockListParent({ length: 2, student_id: "113" });
const respUserByEmailOrPhone = createMockUsersFilterByEmail();

jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferStandaloneQuery: jest.fn(),
}));

jest.mock("src/squads/user/hooks/useResourceTranslate");

jest.mock("src/squads/user/hooks/useTranslate");

jest.useFakeTimers("modern");

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");

    return {
        __esModule: true,
        ...originalModule,
        useWatch: jest.fn(),
    };
});

describe("useParentValidateRules", () => {
    beforeEach(() => {
        (useWatch as jest.Mock).mockImplementation(() => {
            return Country.COUNTRY_VN;
        });
    });

    const { required, pattern, messages } = mockUseParentValidateRulesResult;

    it("should return student info rule", () => {
        const {
            result: { current },
        }: RenderHookResult<null, UseParentValidateRulesReturn> = renderHook(() =>
            useParentValidateRules(mockParentListData)
        );

        expect(current.required).toEqual(required);
        expect(current.pattern).toEqual(pattern);
    });

    it("should call debounce util", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(() => () => []);
        const {
            result: { current },
        }: RenderHookResult<null, UseParentValidateRulesReturn> = renderHook(() =>
            useParentValidateRules(mockParentListData, mockParentUpdate)
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

    it("should validation email, phone already exists in the system", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(() => () => [
            respUserByEmailOrPhone,
        ]);
        const {
            result: { current },
        }: RenderHookResult<null, UseParentValidateRulesReturn> = renderHook(() =>
            useParentValidateRules(mockParentListData, mockParentUpdate)
        );

        expect(await current.validate.email("email_exited@manabie.com")).toEqual(messages.exited);
        expect(await current.validate.phone("0323333333")).toEqual(messages.exited);
    });

    it("should validation email, phone in the state", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(() => () => []);

        const {
            result: { current },
        }: RenderHookResult<null, UseParentValidateRulesReturn> = renderHook(() =>
            useParentValidateRules(mockParentListData, mockParentUpdate)
        );

        expect(current.required).toEqual(required);
        expect(current.pattern).toEqual(pattern);

        expect(await current.validate.email("parent_email0@example.com")).toEqual(
            messages.hasOnList
        );
        // Fast forward time => 500ms will be passed
        jest.runAllTimers();
        expect(await current.validate.email("")).toBeUndefined();

        expect(await current.validate.phone("1111")).toEqual(messages.invalid);
        expect(await current.validate.phone("Phone Number 0")).toEqual(messages.hasOnList);
        expect(await current.validate.phone("")).toBeUndefined();
    });
});
