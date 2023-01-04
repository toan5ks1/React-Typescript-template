export default function useManaEventEmitter() {
    const manaEventEmitter = window.__MANA__?.getManaEventEmitter();
    if (!manaEventEmitter) {
        window.warner?.error("[useManaEventEmitter]: cannot get manaEventEmitter");
    }

    return {
        manaEventEmitter,
    };
}
