import { genId } from "src/common/utils/id-generator";

describe(genId.name, () => {
    it("genId should return next id grader than prev id", () => {
        const prevId = genId();
        const nextId = genId();

        expect(nextId).not.toEqual(prevId);
        expect(nextId > prevId).toEqual(true);
    });
});
