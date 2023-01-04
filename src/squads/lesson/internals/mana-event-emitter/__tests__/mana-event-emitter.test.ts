import getManaEventEmitter from "../mana-event-emitter";

describe("getManaEventEmitter", () => {
    it("should return manaEventEmitter", () => {
        const manaEventEmitter = getManaEventEmitter();
        expect(manaEventEmitter).not.toBeUndefined();
    });
});
