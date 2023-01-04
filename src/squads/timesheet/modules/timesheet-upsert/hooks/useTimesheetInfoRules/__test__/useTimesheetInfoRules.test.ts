import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useTimesheetInfoRules, {
    UseTimesheetInfoRulesReturn,
} from "src/squads/timesheet/modules/timesheet-upsert/hooks/useTimesheetInfoRules";

const expectResult = {
    required: {
        value: true,
        message: "resources.input.error.required",
    },
};

describe("useTimesheetInfoRules", () => {
    const { required } = expectResult;

    it("should return student info rule", () => {
        const {
            result: { current },
        }: RenderHookResult<null, UseTimesheetInfoRulesReturn> = renderHook(() =>
            useTimesheetInfoRules()
        );

        expect(current.required).toEqual(required);
    });
});
