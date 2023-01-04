export function getLatestCallParams(mockFn: jest.Mock) {
    return getCallParamsAt(mockFn, mockFn.mock.calls.length - 1);
}

export function getCallParamsAt(mockFn: jest.Mock, index: number) {
    if (index > mockFn.mock.calls.length - 1) {
        //eslint-disable-next-line no-console
        console.error("Invalid index, current max index is %s", mockFn.mock.calls.length);
        return;
    }

    return mockFn.mock.calls[index];
}
