import AssignmentIcon from "src/squads/syllabus/components/SvgIcons/AssignmentIcon";

import EntityIcon from "../EntityIcon";

import { render, screen } from "@testing-library/react";

describe("<EntityIcon />", () => {
    beforeEach(() => {
        render(
            <EntityIcon>
                <AssignmentIcon />
            </EntityIcon>
        );
    });

    it("should render correct UI", () => {
        expect(screen.queryByTestId("EntityIcon__root")).toBeInTheDocument();
        expect(screen.queryByTestId("AssignmentIcon__svg")).toBeInTheDocument();
    });

    it("should render with correct prefix className", () => {
        expect(screen.queryByTestId("EntityIcon__root")?.getAttribute("class")).toMatch(
            /EntityIcon-root/gi
        );
    });
});
