import { useDispatch } from "react-redux";
import { Entities, MutationMenus } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { UseQueryBaseV2Return } from "src/squads/syllabus/hooks/data/data-types";
import { inferQuery } from "src/squads/syllabus/services/infer-query";
import { QuizActionTypes } from "src/squads/syllabus/store/quiz";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import useStrictQuiz from "../useStrictQuiz";

import { renderHook } from "@testing-library/react-hooks";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),

    useDispatch: jest.fn(),
}));

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/hooks/useNavigation");

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => jest.fn());

describe(useStrictQuiz.name, () => {
    const showSnackbar = jest.fn();
    const mockPushNavigation = jest.fn();
    const dispatchFunction = jest.fn();

    const mockQueryGetOneLO = jest.fn();

    const mockInferQuery =
        (override: Partial<UseQueryBaseV2Return<{}>> = {}) =>
        () =>
            mockQueryGetOneLO.mockImplementation(() => {
                return {
                    isFetching: true,
                    ...override,
                };
            });

    beforeEach(() => {
        (inferQuery as jest.Mock).mockImplementation(mockInferQuery());

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        (useNavigation as jest.Mock).mockImplementation(() => ({ push: mockPushNavigation }));

        (useDispatch as jest.Mock).mockImplementation(() => {
            return dispatchFunction;
        });
    });

    afterEach(() => {
        mockQueryGetOneLO.mockRestore();
    });

    it("should dispatch to set LO to the store", () => {
        renderHook(() =>
            useStrictQuiz({
                action: MutationMenus.CREATE,
            })
        );

        const inferParams = getLatestCallParams(inferQuery as jest.Mock);

        const callbackOptions = getLatestCallParams(mockQueryGetOneLO)[1];

        const payload = {};
        callbackOptions.onSuccess(payload);

        expect(dispatchFunction).toBeCalledWith({
            type: QuizActionTypes.SET_CURRENT_LO,
            payload: {
                lo: payload,
            },
        });

        expect(inferParams).toEqual([{ action: "LO_GET_ONE", entity: "learningObjective" }]);
    });

    it("should handle error when get data is not success", () => {
        renderHook(() =>
            useStrictQuiz({
                action: MutationMenus.CREATE,
            })
        );

        const callbackOptions = getLatestCallParams(mockQueryGetOneLO)[1];

        const msgErr = "ra.notification.item_doesnt_exist";
        callbackOptions.onError(new Error(msgErr));

        expect(showSnackbar).toBeCalledWith(msgErr);

        expect(mockPushNavigation).toBeCalledWith(
            `/${MicroFrontendTypes.SYLLABUS}/${Entities.BOOKS}`
        );

        expect(dispatchFunction).not.toBeCalled();
    });
});
