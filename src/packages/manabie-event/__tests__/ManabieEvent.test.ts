import ManabieEvent from "../ManabieEvent";

interface NetworkErrorType {
    code: number;
    props: {
        error: { name: string; message: string };
        errorInfo: { componentStack: string };
    };
}

describe("ManabieEvent", () => {
    it("should call custom event function with correct detail event", () => {
        const mockElement = document.createElement("div");
        const fakeHandlers = jest.fn();

        const params: NetworkErrorType = {
            code: 2,
            props: {
                error: { name: "Test", message: "Test error" },
                errorInfo: { componentStack: "Test error" },
            },
        };

        const manabieEvent = new ManabieEvent(mockElement);

        const unregister = manabieEvent.addListener("eventA", fakeHandlers);

        manabieEvent.dispatchEvent("eventA", { detail: params });

        expect(fakeHandlers).toBeCalled();
        expect(fakeHandlers.mock.calls[0][0].detail).toEqual(params);

        unregister();
    });

    it("should not call custom event function", () => {
        const mockElement = document.createElement("div");

        const params: NetworkErrorType = {
            code: 10,
            props: {
                error: { name: "Test", message: "Test error" },
                errorInfo: { componentStack: "Test error" },
            },
        };

        const fakeHandlers = jest.fn();
        const manabieEvent = new ManabieEvent(mockElement);

        manabieEvent.dispatchEvent("eventB", { detail: params });
        expect(fakeHandlers).not.toBeCalled();
    });
});
