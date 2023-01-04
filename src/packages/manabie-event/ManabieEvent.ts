class ManabieEvent {
    private rootElement: HTMLElement | Window;

    constructor(rootElement: HTMLElement | Window) {
        this.rootElement = rootElement;
    }

    dispatchEvent(eventName: string, detail?: CustomEventInit) {
        const event = new CustomEvent(eventName, detail);
        this.rootElement.dispatchEvent(event);
    }

    addListener(
        eventName: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
    ) {
        this.rootElement.addEventListener(eventName, listener, options);

        return () => {
            this.rootElement.removeEventListener(eventName, listener, options);
        };
    }
}

export default ManabieEvent;
