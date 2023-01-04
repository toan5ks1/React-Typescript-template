import { ModeOpenDialog } from "src/common/constants/enum";
import { inferMutation } from "src/squads/user/service/infer-service";
import { NsUsermgmtStudentService } from "src/squads/user/service/usermgmt/student-service-usermgmt/types";

import { renderHook } from "@testing-library/react-hooks";
import useUpsertParent, {
    UseUpsertParentReturn,
} from "src/squads/user/modules/student-family/hooks/useUpsertParent";

jest.mock("src/squads/user/service/infer-service", () => {
    return {
        __esModule: true,
        inferMutation: jest.fn(),
    };
});

jest.mock("src/squads/user/hooks/useShowSnackbar", () => jest.fn());

describe("useUpsertParent ADD mode", () => {
    const mutate = jest.fn();

    beforeEach(() => {
        (inferMutation as jest.Mock).mockReturnValue(() => ({
            mutate,
        }));
    });

    it("should api called with correctly payload", () => {
        const {
            result: { current },
        } = renderHook(() => useUpsertParent({ mode: ModeOpenDialog.ADD }));

        const { upsertParent } = current;

        const payload: Parameters<UseUpsertParentReturn["upsertParent"]>[0] = {
            formData: {
                name: "Parent Edit",
                relationship: 2,
                countryCode: 5,
                phoneNumber: "0123456789",
                email: "parent_email@manabie.com",
            },
            studentId: "student_1",
        };

        upsertParent(payload, {});

        const expectedPayload: NsUsermgmtStudentService.UpsertParent = {
            studentId: payload.studentId,
            parent: {
                ...payload.formData,
            },
        };

        expect(mutate.mock.calls[0][0]).toEqual(expectedPayload);
    });
});

describe("useUpsertParent EDIT mode", () => {
    const mutate = jest.fn();

    beforeEach(() => {
        (inferMutation as jest.Mock).mockReturnValue(() => ({
            mutate,
        }));
    });

    it("should api called with correctly payload", () => {
        const {
            result: { current },
        } = renderHook(() => useUpsertParent({ mode: ModeOpenDialog.EDIT }));

        const { upsertParent } = current;

        const payload: Parameters<UseUpsertParentReturn["upsertParent"]>[0] = {
            formData: {
                name: "Parent Edit",
                relationship: 2,
                countryCode: 5,
                phoneNumber: "0123456789",
                email: "parent_email+edit@manabie.com",
                userId: "parent_1",
            },
            studentId: "student_1",
        };

        upsertParent(payload, {});

        const expectedPayload: NsUsermgmtStudentService.UpsertParent = {
            studentId: payload.studentId,
            parent: {
                ...payload.formData,
            },
        };

        expect(mutate.mock.calls[0][0]).toEqual(expectedPayload);
    });
});
