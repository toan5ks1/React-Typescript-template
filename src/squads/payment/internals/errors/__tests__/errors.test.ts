import { AppError } from "../errors";

describe(AppError.name, () => {
    it("can check if an error is AppError", () => {
        const err = new AppError("test");

        expect(AppError.isAppError(err)).toEqual(true);
    });
});
