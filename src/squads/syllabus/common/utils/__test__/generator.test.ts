import { genId } from "../generator";

describe(genId.name, () => {
    it("should return next id greater than prev id", () => {
        const prevId = genId();
        const nextId = genId();

        expect(nextId).not.toEqual(prevId);
        expect(nextId > prevId).toEqual(true);
    });
});
