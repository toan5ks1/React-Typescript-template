import ReferenceReviewField from "../ReferenceReviewField";

import { render, RenderResult, screen } from "@testing-library/react";

const mockListLOs = [
    {
        country: "COUNTRY_NONE",
        created_at: "2021-10-13T07:00:19.764748+00:00",
        display_order: 3,
        grade: 0,
        lo_id: "lo_id",
        name: "LO name",
        school_id: 123,
        study_guide: "",
        subject: "SUBJECT_NONE",
        topic_id: "topic id",
        type: "LEARNING_OBJECTIVE_TYPE_LEARNING",
        updated_at: "2021-10-13T07:00:19.764748+00:00",
    },
];

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: () => () => ({
            data: mockListLOs,
        }),
    };
});

describe("ReferenceReviewField component", () => {
    let wrapper: RenderResult;
    beforeEach(() => {
        wrapper = render(<ReferenceReviewField value={["lo_id"]} label={"Learning objectives"} />);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should show type of LO is Learning objectives and name of LO correctly", () => {
        expect(screen.getByText("Learning objectives")).toBeInTheDocument();
        expect(screen.getByText(mockListLOs[0].name)).toBeInTheDocument();
    });
});
