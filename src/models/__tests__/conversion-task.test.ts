import { KeyConversionTaskStatusTypes } from "../../common/constants/const";
import { getStatusConversionTask } from "../conversion-task";

describe("getStatusConversionTask", () => {
    it("should return correct task status", () => {
        expect(getStatusConversionTask({})).toEqual(undefined);

        expect(getStatusConversionTask({ conversion_tasks: [] })).toEqual(undefined);

        expect(
            getStatusConversionTask({
                conversion_tasks: [
                    { status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_CONVERTING },
                ],
            })
        ).toEqual(KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_CONVERTING);
    });
});
