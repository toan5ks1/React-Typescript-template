import { AppError } from "src/squads/adobo/domains/invoice/internals/errors/errors";

describe(AppError.name, () => {
    it("can check if an error is AppError", () => {
        const err = new AppError("test");

        expect(AppError.isAppError(err)).toEqual(true);
    });
});
