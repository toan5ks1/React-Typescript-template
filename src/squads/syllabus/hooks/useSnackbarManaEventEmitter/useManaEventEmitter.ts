import logger from "src/squads/syllabus/internals/logger";
import getManaEventEmitter from "src/squads/syllabus/internals/mana-event-emitter";

export default function useManaEventEmitter() {
    const manaEventEmitter = getManaEventEmitter();
    if (!manaEventEmitter) {
        logger.error("[useManaEventEmitter]: cannot get manaEventEmitter");
    }

    return {
        manaEventEmitter,
    };
}
