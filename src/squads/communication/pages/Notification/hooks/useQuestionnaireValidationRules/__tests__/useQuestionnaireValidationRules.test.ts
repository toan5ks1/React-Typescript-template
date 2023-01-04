import {
    MAX_LENGTH_ANSWER_CONTENT,
    MAX_LENGTH_QUESTION_CONTENT,
} from "src/squads/communication/common/constants/enum";
import { AnswerFormValue } from "src/squads/communication/common/constants/types";
import { getDateAfterDuration } from "src/squads/communication/common/utils/utils";
import { TimeAutocompleteOption } from "src/squads/communication/models/time-autocomplete";

import useQuestionnaireValidationRules from "../useQuestionnaireValidationRules";

import { renderHook } from "@testing-library/react-hooks";

const expirationTime: TimeAutocompleteOption = {
    label: "10:10",
    value: getDateAfterDuration(10, "minutes"),
};
const scheduleTime: TimeAutocompleteOption = {
    label: "10:50",
    value: getDateAfterDuration(50, "minutes"),
};

describe("useQuestionnaireValidationRules validate question content", () => {
    it("should show error message when question content is empty", () => {
        const {
            result: { current },
        } = renderHook(() => useQuestionnaireValidationRules());

        expect(current.questionContent.validate("")).toEqual("resources.input.error.required");
    });

    it("should show error message when question content exceeds max length", () => {
        const {
            result: { current },
        } = renderHook(() => useQuestionnaireValidationRules());

        expect(
            current.questionContent.validate("a".repeat(MAX_LENGTH_QUESTION_CONTENT + 1))
        ).toEqual("resources.input.error.limitLength");
    });

    it("should pass when question content is valid", () => {
        const {
            result: { current },
        } = renderHook(() => useQuestionnaireValidationRules());

        expect(current.questionContent.validate("Question")).toEqual(undefined);
    });
});

describe("useQuestionnaireValidationRules validate answer content", () => {
    it("should show error message when answer content is empty", () => {
        const answers: AnswerFormValue[] = [
            {
                content: "",
            },
        ];

        const {
            result: { current },
        } = renderHook(() => useQuestionnaireValidationRules());

        expect(current.answerContent(answers).validate("")).toEqual(
            "resources.input.error.required"
        );
    });

    it("should show error message when answer exceeds max length", () => {
        const answers: AnswerFormValue[] = [
            {
                content: "a".repeat(MAX_LENGTH_ANSWER_CONTENT + 1),
            },
        ];

        const {
            result: { current },
        } = renderHook(() => useQuestionnaireValidationRules());

        expect(
            current.answerContent(answers).validate("a".repeat(MAX_LENGTH_ANSWER_CONTENT + 1))
        ).toEqual("resources.input.error.limitLength");
    });

    it("should show error message when answer content is duplicated", () => {
        const duplicatedAnswers: AnswerFormValue[] = [
            {
                content: "Answer",
            },
            {
                content: "Answer",
            },
        ];

        const {
            result: { current },
        } = renderHook(() => useQuestionnaireValidationRules());

        expect(current.answerContent(duplicatedAnswers).validate("Answer")).toEqual(
            "resources.input.error.duplicatedAnswer"
        );
    });

    it("should pass when answer content is valid", () => {
        const answers: AnswerFormValue[] = [
            {
                content: "Answer",
            },
        ];

        const {
            result: { current },
        } = renderHook(() => useQuestionnaireValidationRules());

        expect(current.answerContent(answers).validate("Answer")).toEqual(undefined);
    });
});

describe("useQuestionnaireValidationRules validate expiration date", () => {
    it("should show error message when expiration date < current date", () => {
        const {
            result: { current },
        } = renderHook(() => useQuestionnaireValidationRules());

        const expirationDate = getDateAfterDuration(-1);

        expect(
            current
                .expirationDate({
                    isSchedule: false,
                })
                .validate(expirationDate)
        ).toEqual("resources.input.error.invalidExpirationDate");
    });

    it("should show error message when expiration date < schedule date", () => {
        const {
            result: { current },
        } = renderHook(() => useQuestionnaireValidationRules());

        const scheduleDate = getDateAfterDuration(10);
        const expirationDate = getDateAfterDuration(7);

        expect(
            current
                .expirationDate({
                    isSchedule: true,
                    scheduleDate,
                })
                .validate(expirationDate)
        ).toEqual("resources.input.error.invalidExpirationDate");
    });

    it("should pass when current date < schedule date < expiration date", () => {
        const {
            result: { current },
        } = renderHook(() => useQuestionnaireValidationRules());

        const scheduleDate = new Date();
        const expirationDate = getDateAfterDuration(7);

        expect(
            current
                .expirationDate({
                    isSchedule: true,
                    scheduleDate,
                })
                .validate(expirationDate)
        ).toEqual(undefined);
    });
});

describe("useQuestionnaireValidationRules validate expiration time", () => {
    it("should show error message when expiration date = current date and expiration time < current time", () => {
        const {
            result: { current },
        } = renderHook(() => useQuestionnaireValidationRules());

        const expirationTime: TimeAutocompleteOption = {
            label: "10:10",
            value: getDateAfterDuration(-10, "minutes"),
        };

        expect(
            current
                .expirationTime({
                    isSchedule: false,
                    expirationDate: new Date(),
                })
                .validate(expirationTime)
        ).toEqual("resources.input.error.invalidExpirationTime");
    });

    it("should show error message when expiration date = schedule date and expiration time < schedule time", () => {
        const {
            result: { current },
        } = renderHook(() => useQuestionnaireValidationRules());

        expect(
            current
                .expirationTime({
                    isSchedule: true,
                    expirationDate: new Date(),
                    scheduleDate: new Date(),
                    scheduleTime,
                })
                .validate(expirationTime)
        ).toEqual("resources.input.error.invalidExpirationTime");
    });

    it("should show error message when expiration date is undefined", () => {
        const {
            result: { current },
        } = renderHook(() => useQuestionnaireValidationRules());

        expect(
            current
                .expirationTime({
                    isSchedule: true,
                    expirationDate: new Date(),
                    scheduleDate: new Date(),
                    scheduleTime,
                })
                .validate(undefined)
        ).toEqual("resources.input.error.required");
    });

    it("should pass when expiration date > current date", () => {
        const {
            result: { current },
        } = renderHook(() => useQuestionnaireValidationRules());

        expect(
            current
                .expirationTime({
                    isSchedule: false,
                    expirationDate: getDateAfterDuration(7),
                })
                .validate(expirationTime)
        ).toEqual(undefined);
    });

    it("should pass when expiration date > schedule date", () => {
        const {
            result: { current },
        } = renderHook(() => useQuestionnaireValidationRules());

        expect(
            current
                .expirationTime({
                    isSchedule: true,
                    expirationDate: getDateAfterDuration(7),
                    scheduleDate: new Date(),
                    scheduleTime,
                })
                .validate(expirationTime)
        ).toEqual(undefined);
    });
});
