import { FC } from "react";

import { useLocation, useParams } from "react-router";
import { Entities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { parseQuery } from "src/squads/syllabus/common/utils/url";
import { LOWithQuizSet } from "src/squads/syllabus/models/quizset-lo";
import { QuizzesOneQuery } from "src/squads/syllabus/services/eureka/eureka-types";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import useQuizEssentials from "../useQuizEssentials";
import { mockLOValue, mockQuizValue } from "./data";

import { renderHook } from "@testing-library/react-hooks";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import TestTranslationProvider from "src/squads/syllabus/test-utils/translate/TestTranslationProvider";

jest.mock("src/squads/syllabus/common/utils/url");
jest.mock("src/squads/syllabus/services/infer-query");
jest.mock("src/squads/syllabus/hooks/useShowSnackbar");
jest.mock("src/squads/syllabus/hooks/useNavigation");
jest.mock("src/squads/syllabus/internals/logger");

jest.mock("react-router", () => {
    const actual = jest.requireActual("react-router");
    return {
        ...actual,
        useLocation: jest.fn(),
        useParams: jest.fn(),
    };
});

const mockPushNavigation = jest.fn();

const mockUseNavigation = () => ({ push: mockPushNavigation });

const mockParseQuery = (parentId?: string) => () => ({
    parentId,
});

const mockShowSnackbar = jest.fn();

const mockUseSnowSnackbar = () => mockShowSnackbar;

interface MockInferQueryOptions {
    enabled?: boolean;
    onError?: (err: Error) => void;
    onSuccess?: (data: QuizzesOneQuery["quizzes"][0] | LOWithQuizSet | null) => void;
}

const createMockInferQuery =
    (error?: Error, data?: QuizzesOneQuery["quizzes"][0] | LOWithQuizSet) =>
    () =>
    (_: {}, options?: MockInferQueryOptions) => {
        if (error && options?.onError) {
            options.onError(error);
        }

        return {
            isLoading: false,
            data: data,
        };
    };

const Wrapper: FC = ({ children }) => <TestTranslationProvider>{children}</TestTranslationProvider>;

const redirectUrlOnLOError = `/${MicroFrontendTypes.SYLLABUS}/${Entities.BOOKS}`;

const defaultMockQuizInfer = createMockInferQuery(undefined, mockQuizValue);
const defaultMockLoInfer = createMockInferQuery(undefined, mockLOValue);

const renderUseQuizEssentialsHook = () =>
    renderHook(() => useQuizEssentials(), {
        wrapper: Wrapper,
    });

type InferQueryMockImplementation = (...args: any) => any;

const mockInferQueryImplementations = (...implementations: InferQueryMockImplementation[]) => {
    const mocked = inferQuery as jest.Mock;
    mocked.mockClear();
    implementations.forEach((fn) => {
        mocked.mockImplementationOnce(fn);
    });
};

describe(useQuizEssentials.name, () => {
    beforeEach(() => {
        (parseQuery as jest.Mock).mockImplementation(mockParseQuery());
        (useShowSnackbar as jest.Mock).mockImplementation(mockUseSnowSnackbar);
        (useNavigation as jest.Mock).mockImplementation(mockUseNavigation);
        (useParams as jest.Mock).mockReturnValue({
            id: mockQuizValue.quiz_id,
        });
        (useLocation as jest.Mock).mockReturnValue({
            search: "",
        });
    });

    it("should fetch lo with lo_id from url query", () => {
        const parentId = "abc";
        (parseQuery as jest.Mock).mockImplementation(mockParseQuery(parentId));
        const mockUseQuery = jest.fn();
        const mockLoInfer = () => mockUseQuery;

        mockInferQueryImplementations(defaultMockQuizInfer, mockLoInfer);

        renderUseQuizEssentialsHook();

        expect(mockUseQuery).toBeCalledWith(
            {
                lo_id: parentId,
            },
            expect.anything()
        );
    });

    it("should show 'Element does not exist' message on fetch LO error", () => {
        const mockLoInfer = createMockInferQuery(new Error("ra.notification.item_doesnt_exist"));

        mockInferQueryImplementations(defaultMockQuizInfer, mockLoInfer);

        renderUseQuizEssentialsHook();

        expect(mockShowSnackbar).toBeCalledWith("Element does not exist");
    });

    it(`should redirect to ${redirectUrlOnLOError} on fetch LO error`, () => {
        mockInferQueryImplementations(
            defaultMockQuizInfer,
            createMockInferQuery(new Error("ra.notification.item_doesnt_exist"))
        );

        renderUseQuizEssentialsHook();

        expect(mockPushNavigation).toBeCalledWith(redirectUrlOnLOError);
    });

    it("should fetch quiz with quiz_id from url params", () => {
        const mockUseQuery = jest.fn();
        const mockQuizInfer = () => mockUseQuery;

        mockInferQueryImplementations(mockQuizInfer, defaultMockLoInfer);

        renderUseQuizEssentialsHook();

        expect(mockUseQuery).toBeCalledWith(
            {
                quiz_id: mockQuizValue.quiz_id,
            },
            expect.anything()
        );
    });

    it("should show error message on empty quiz data", () => {
        const mockUseQuery = jest.fn((_: {}, options?: MockInferQueryOptions) => {
            options?.onSuccess?.(null);
            return {
                isLoading: false,
                data: null,
            };
        });
        const mockQuizInfer = () => mockUseQuery;

        mockInferQueryImplementations(mockQuizInfer, defaultMockLoInfer);

        renderUseQuizEssentialsHook();

        expect(mockShowSnackbar).toBeCalledWith("Element does not exist", expect.anything());
    });

    it("should show error message and redirect to LO detail on Quiz error", () => {
        const loId = "abc";
        const redirectUrlOnQuizError = `/${MicroFrontendTypes.SYLLABUS}/${Entities.LOS}/${loId}/show`;

        (parseQuery as jest.Mock).mockImplementation(mockParseQuery(loId));
        mockInferQueryImplementations(
            createMockInferQuery(new Error("ra.notification.item_doesnt_exist")),
            defaultMockLoInfer
        );

        renderUseQuizEssentialsHook();

        expect(mockShowSnackbar).toBeCalledWith("Element does not exist", expect.anything());
        expect(mockPushNavigation).toBeCalledWith(redirectUrlOnQuizError);
    });

    it("should be fetching if quiz query is fetching", () => {
        const mockUseQuery = jest.fn((_: {}) => {
            return {
                isLoading: true,
            };
        });
        const mockQuizInfer = () => mockUseQuery;

        mockInferQueryImplementations(mockQuizInfer, defaultMockLoInfer);

        const { result } = renderUseQuizEssentialsHook();

        expect(result.current.isFetching).toBeTruthy();
    });

    it("should be fetching if lo query is fetching", () => {
        const mockUseQuery = jest.fn((_: {}) => {
            return {
                isLoading: true,
            };
        });
        const mockLoInfer = () => mockUseQuery;

        mockInferQueryImplementations(defaultMockQuizInfer, mockLoInfer);

        const { result } = renderUseQuizEssentialsHook();

        expect(result.current.isFetching).toBeTruthy();
    });
});
