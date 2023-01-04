import { KeyAssignmentTypes, KeyLOTypes } from "src/squads/syllabus/common/constants/const";

import LearningObjectiveIcon from "../LearningObjectiveIcon";

import { render, screen } from "@testing-library/react";

describe(`${LearningObjectiveIcon.name} with disabled is true`, () => {
    it("should render disabled button when disabled is true", () => {
        render(<LearningObjectiveIcon disabled />);

        expect(screen.getByRole("button").className).toContain("disabled");
    });
});

describe(`${LearningObjectiveIcon.name} with variant is contained`, () => {
    it("should render flash card icon", () => {
        render(<LearningObjectiveIcon type={KeyLOTypes.LEARNING_OBJECTIVE_TYPE_FLASH_CARD} />);

        expect(screen.getByTestId("FlashCardIcon__svg")).toBeInTheDocument();
    });

    it("should render offline learning icon", () => {
        render(
            <LearningObjectiveIcon type={KeyLOTypes.LEARNING_OBJECTIVE_TYPE_OFFLINE_LEARNING} />
        );

        expect(screen.getByTestId("OfflineStudyIcon__svg")).toBeInTheDocument();
    });

    it("should render lo icon", () => {
        render(<LearningObjectiveIcon type={KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING} />);

        expect(screen.getByTestId("LOIcon__svg")).toBeInTheDocument();
    });

    it("should render exam icon", () => {
        render(<LearningObjectiveIcon type={KeyLOTypes.LEARNING_OBJECTIVE_TYPE_EXAM_LO} />);

        expect(screen.getByTestId("ExamLOIcon_svg")).toBeInTheDocument();
    });

    it("should render task assignment icon", () => {
        render(<LearningObjectiveIcon type={KeyAssignmentTypes.ASSIGNMENT_TYPE_TASK} />);

        expect(screen.getByTestId("TaskAssignmentIcon__svg")).toBeInTheDocument();
    });

    it("should render assignment icon", () => {
        render(<LearningObjectiveIcon />);

        expect(screen.getByTestId("AssignmentIcon__svg")).toBeInTheDocument();
    });
});

describe(`${LearningObjectiveIcon.name} with variant is outlined`, () => {
    it("should render flash card icon", () => {
        render(
            <LearningObjectiveIcon
                variant="outlined"
                type={KeyLOTypes.LEARNING_OBJECTIVE_TYPE_FLASH_CARD}
            />
        );

        expect(screen.getByRole("img", { name: "Flash card icon" })).toBeInTheDocument();
    });

    it("should render offline learning icon", () => {
        render(
            <LearningObjectiveIcon
                variant="outlined"
                type={KeyLOTypes.LEARNING_OBJECTIVE_TYPE_OFFLINE_LEARNING}
            />
        );

        expect(screen.getByRole("img", { name: "Offline study icon" })).toBeInTheDocument();
    });

    it("should render lo icon", () => {
        render(
            <LearningObjectiveIcon
                variant="outlined"
                type={KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING}
            />
        );

        expect(screen.getByRole("img", { name: "Learning objective icon" })).toBeInTheDocument();
    });

    it("should render exam icon", () => {
        render(
            <LearningObjectiveIcon
                variant="outlined"
                type={KeyLOTypes.LEARNING_OBJECTIVE_TYPE_EXAM_LO}
            />
        );

        expect(screen.getByTestId("ExamLOIcon_svg")).toBeInTheDocument();
    });

    it("should render task assignment icon", () => {
        render(
            <LearningObjectiveIcon
                variant="outlined"
                type={KeyAssignmentTypes.ASSIGNMENT_TYPE_TASK}
            />
        );

        expect(screen.getByTestId("TaskAssignmentIcon__svg")).toBeInTheDocument();
    });

    it("should render assignment icon", () => {
        render(<LearningObjectiveIcon variant="outlined" />);

        expect(screen.getByRole("img", { name: "Assignment icon" })).toBeInTheDocument();
    });
});
