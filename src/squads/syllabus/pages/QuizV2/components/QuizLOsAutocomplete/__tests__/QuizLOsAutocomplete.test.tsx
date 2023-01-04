import { LOWithQuizSet } from "src/squads/syllabus/models/quizset-lo";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import QuizLOsAutocomplete from "../QuizLOsAutocomplete";

import { render, screen } from "@testing-library/react";
import TestApp from "src/squads/syllabus/test-utils/TestApp";
import TestHookForm from "src/squads/syllabus/test-utils/TestHookForm";

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

const defaultLOIds: string[] = ["lo_01", "lo_02"];

const renderComponent = () => {
    render(
        <TestApp>
            <TestHookForm
                defaultValues={{
                    taggedLOs: defaultLOIds,
                }}
            >
                <QuizLOsAutocomplete />
            </TestHookForm>
        </TestApp>
    );
};

type MockInferQueryReturnValue<T = any> = () => {
    isLoading: boolean;
    data: T | undefined;
};

describe(QuizLOsAutocomplete.name, () => {
    it("should render loading when prepare default data via get many by LOIds", () => {
        (inferQuery as jest.Mock).mockReturnValue(() => ({
            isLoading: true,
        }));

        renderComponent();

        expect(screen.getByTestId("AutocompleteBase__loading")).toBeInTheDocument();
    });

    it("should render correct the default value", () => {
        (inferQuery as unknown as jest.Mock<MockInferQueryReturnValue<LOWithQuizSet[]>>)
            .mockReturnValueOnce(() => ({
                isLoading: false,
                data: [
                    {
                        lo_id: defaultLOIds[0],
                        name: "LO Name 01",
                        id: defaultLOIds[0],
                        type: "LEARNING_OBJECTIVE_TYPE_EXAM_LO",
                        school_id: 0,
                        created_at: "",
                    },
                    {
                        lo_id: defaultLOIds[1],
                        name: "LO Name 02",
                        id: defaultLOIds[1],
                        type: "LEARNING_OBJECTIVE_TYPE_EXAM_LO",
                        school_id: 0,
                        created_at: "",
                    },
                ],
            }))
            .mockReturnValueOnce(() => ({
                isLoading: false,
                data: undefined,
            }));

        renderComponent();

        expect(screen.getAllByTestId("AutocompleteBase__tagBox")).toHaveLength(defaultLOIds.length);
    });
});
