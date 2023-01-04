import getManaEventEmitter from "src/squads/timesheet/internals/mana-event-emitter";

export default function useManaEventEmitter() {
    const manaEventEmitter = getManaEventEmitter();
    if (!manaEventEmitter) {
        window.warner?.error("[useManaEventEmitter]: cannot get manaEventEmitter");
    }

    return {
        manaEventEmitter,
    };
}
