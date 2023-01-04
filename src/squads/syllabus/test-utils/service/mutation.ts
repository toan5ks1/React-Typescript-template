type HasProperty<T> = {
    [K in keyof T]: (...args: any[]) => any;
};

interface Constructable<T> {
    new (...args: any): HasProperty<T>;
}

export const createFakeProtoResponse = <T = string>(toObjectResult: T) => {
    return {
        toObject: () => toObjectResult,
    };
};

export const createMockClass = <T>(
    origin: Constructable<T>,
    mocks: {
        [K in keyof T]?: jest.Mock<T[K]> | Function;
    }
) => {
    const keys = Object.keys(mocks);

    for (let i = 0; i <= keys.length; i++) {
        origin.prototype[keys[i]] = jest.fn().mockImplementation();

        jest.spyOn(origin.prototype, keys[i]).mockImplementation(mocks[keys[i]]);
    }
};
