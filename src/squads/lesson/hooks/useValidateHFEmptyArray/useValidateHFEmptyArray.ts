const useValidateHFEmptyArray = <T>(errorMessage: string) => {
    return (array: T[]) => {
        if (!array?.length) return errorMessage;
    };
};

export default useValidateHFEmptyArray;
