import { ManaEventEmitter } from "@manabie-com/event-emitter";

export default function enableManaEventEmitter() {
    const manaEventEmitter = new ManaEventEmitter<IEvents>();

    if (typeof window !== "undefined") {
        window.__MANA__ = window.__MANA__ || {};
        window.__MANA__.getManaEventEmitter = () => manaEventEmitter;
    }
}
