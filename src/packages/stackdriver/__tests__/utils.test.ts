import { getErrorFromMsg } from "../utils";

describe(getErrorFromMsg.name, () => {
    it("should simply return the params itself", () => {
        const stringMessage = "Hello";
        expect(getErrorFromMsg(stringMessage)).toEqual(stringMessage);

        const errorMessage = new Error();
        expect(getErrorFromMsg(errorMessage)).toMatchObject(errorMessage);

        const errorArrayMessage = [errorMessage];
        expect(getErrorFromMsg(errorArrayMessage)).toEqual(new Error(errorMessage.toString()));
    });

    it("should combine the messages in array to generate new message", () => {
        const messagesWithoutError = ["Message:", "1", "2", "last"];
        expect(getErrorFromMsg(messagesWithoutError)).toEqual(messagesWithoutError.join(" "));

        const sampleError = new Error("sample error");
        const messagesWithError = [...messagesWithoutError, sampleError];

        const expectMessage = [...messagesWithoutError, sampleError.toString()].join(" ");
        expect(getErrorFromMsg(messagesWithError)).toEqual(new Error(expectMessage));
    });

    it("should combine the message with complex object", () => {
        const sampleError = new Error("sample error");

        const messagesWithError = [
            "Message:",
            "1",
            "2",
            sampleError,
            [
                [
                    {
                        message: {
                            errorMsg: "This is message",
                        },
                    },
                    {
                        message: "hello",
                    },
                ],
                {
                    field: "order",
                    fieldValueIfNotSensitive: undefined, // non-serializable value
                },
            ],
        ];
        expect(getErrorFromMsg(messagesWithError)).toEqual(
            new Error(
                `Message: 1 2 ${sampleError.toString()} [[{"message":{"errorMsg":"This is message"}},{"message":"hello"}],{"field":"order","fieldValueIfNotSensitive":"undefined"}]`
            )
        );
    });
});
