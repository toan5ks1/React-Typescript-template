import getManaEventEmitter from "src/squads/user/internals/mana-event-emitter";

export default function useManaEventEmitter() {
    const manaEventEmitter = getManaEventEmitter();
    if (!manaEventEmitter) {
        window.warner?.error("[useManaEventEmitter]: cannot get manaEventEmitter");
    }

    return {
        manaEventEmitter,
    };
}
