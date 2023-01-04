import { AppError } from "src/internals/errors";

import useCheckQuizExternalId from "../useCheckQuizExternalId";

import { renderHook, act } from "@testing-library/react-hooks";
import useStandaloneQuery from "src/squads/syllabus/hooks/data/useStandaloneQuery";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => jest.fn());
jest.mock("src/squads/syllabus/internals/logger");
jest.mock("src/squads/syllabus/hooks/useTranslate");
jest.mock("src/squads/syllabus/hooks/data/useStandaloneQuery");

/* 
    What is quiz externalId is valid?
    Not contain invalid character: [spacing]
    Unique in the DB
*/

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => jest.fn());

describe(useCheckQuizExternalId.name, () => {
    const snackbarFn = jest.fn();
    const mockQueryGetExternalId = jest.fn();

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockReturnValue(snackbarFn);
        (useStandaloneQuery as jest.Mock).mockReturnValue({
            quiz: { syllabusQuizGetByExternalId: mockQueryGetExternalId },
        });
    });

    it("should return default error externalId is empty string", async () => {
        const { result } = renderHook(() => useCheckQuizExternalId());

        expect(result.current.externalIdError).toEqual("");
    });

    it("should return false when id contain invalid character(spacing)", async () => {
        const { result } = renderHook(() => useCheckQuizExternalId());

        await act(async () => {
            const isValid = await result.current.checkExternalIdIsValid("1b  a");
            expect(isValid).toEqual(false);
        });

        expect(result.current.externalIdError).toEqual(
            "resources.quizzes.mappedIdMustNotContainWhiteSpaces"
        );
    });

    it("should return false when externalId is existed in the DB", async () => {
        const externalIdExisted = "1abc";
        mockQueryGetExternalId.mockResolvedValue(externalIdExisted);

        const { result } = renderHook(() => useCheckQuizExternalId());

        await act(async () => {
            const isValid = await result.current.checkExternalIdIsValid(externalIdExisted);
            expect(isValid).toEqual(false);
        });

        expect(result.current.externalIdError).toEqual("resources.quizzes.duplicateExternalId");
    });

    it("should return false when check externalId in the DB has error", async () => {
        const externalIdExisted = "1abc";
        mockQueryGetExternalId.mockRejectedValue(new AppError("network-err"));

        const { result } = renderHook(() => useCheckQuizExternalId());

        const isValid = await result.current.checkExternalIdIsValid(externalIdExisted);

        expect(isValid).toEqual(false);
        expect(snackbarFn).toBeCalledWith("network-err", "error");
    });

    it("should return false when quiz external ID is an empty string", async () => {
        mockQueryGetExternalId.mockResolvedValue(undefined);

        const { result } = renderHook(() => useCheckQuizExternalId());

        await act(async () => {
            const isValid = await result.current.checkExternalIdIsValid("");
            expect(isValid).toEqual(false);
        });

        expect(result.current.externalIdError).toEqual(
            "resources.quizzes.mappedIdMustNotContainWhiteSpaces"
        );
    });

    it("should return true when externalId is valid", async () => {
        mockQueryGetExternalId.mockResolvedValue([]);
        const { result } = renderHook(() => useCheckQuizExternalId());

        await act(async () => {
            const isValid = await result.current.checkExternalIdIsValid("ValidQuizExternalId");
            expect(isValid).toEqual(true);
        });

        expect(result.current.externalIdError).toEqual("");
    });
});
