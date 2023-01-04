export function getCallTimes(mockFn: jest.Mock) {
    return mockFn.mock.calls.length;
}

export function getLatestCallParams(mockFn: jest.Mock | jest.SpyInstance) {
    return getCallParamsAt(mockFn, mockFn.mock.calls.length - 1);
}

export function getCallParamsAt(mockFn: jest.Mock | jest.SpyInstance, index: number) {
    if (index > mockFn.mock.calls.length - 1) {
        //eslint-disable-next-line no-console
        console.error("Invalid index, current max index is %s", mockFn.mock.calls.length);
        return;
    }

    return mockFn.mock.calls[index];
}
