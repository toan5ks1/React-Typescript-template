import { createMockQuestionnaireQuestionsList } from "src/squads/communication/test-utils/query-data";

import useCheckExpandingQuestionnaireDetail from "../useCheckExpandingQuestionnaireDetail";

import { act, renderHook } from "@testing-library/react-hooks";

const questionnaireQuestions = createMockQuestionnaireQuestionsList();

describe("useCheckExpandingQuestionnaireDetail", () => {
    it("should set correct default", () => {
        const { result } = renderHook(() =>
            useCheckExpandingQuestionnaireDetail({
                questionnaireQuestions,
            })
        );
        expect(result.current.isExpandingAll).toBe(false);
        expect(result.current.listStatusQuestions).toEqual([
            {
                expanding: false,
                isShortAnswer: false,
            },
            {
                expanding: false,
                isShortAnswer: false,
            },
            {
                expanding: false,
                isShortAnswer: true,
            },
        ]);
    });

    it("should change state isExpandingAll correctly when call toggleViewMoreLess", () => {
        const { result } = renderHook(() =>
            useCheckExpandingQuestionnaireDetail({
                questionnaireQuestions,
            })
        );
        expect(result.current.isExpandingAll).toBe(false);

        act(() => {
            result.current.toggleViewMoreLess();
        });
        expect(result.current.isExpandingAll).toBe(true);

        act(() => {
            result.current.toggleViewMoreLess();
        });
        expect(result.current.isExpandingAll).toBe(false);
    });

    it("should change state listStatusQuestions and isExpandingAll correctly when call expandEachQuestion", () => {
        const { result } = renderHook(() =>
            useCheckExpandingQuestionnaireDetail({
                questionnaireQuestions,
            })
        );

        act(() => {
            result.current.expandEachQuestion(0);
        });
        act(() => {
            result.current.expandEachQuestion(1);
        });

        expect(result.current.listStatusQuestions).toEqual([
            {
                expanding: true,
                isShortAnswer: false,
            },
            {
                expanding: true,
                isShortAnswer: false,
            },
            {
                expanding: false,
                isShortAnswer: true,
            },
        ]);
        expect(result.current.isExpandingAll).toBe(true);

        act(() => {
            result.current.expandEachQuestion(0);
        });
        act(() => {
            result.current.expandEachQuestion(1);
        });

        expect(result.current.listStatusQuestions).toEqual([
            {
                expanding: false,
                isShortAnswer: false,
            },
            {
                expanding: false,
                isShortAnswer: false,
            },
            {
                expanding: false,
                isShortAnswer: true,
            },
        ]);
        expect(result.current.isExpandingAll).toBe(false);
    });
});
