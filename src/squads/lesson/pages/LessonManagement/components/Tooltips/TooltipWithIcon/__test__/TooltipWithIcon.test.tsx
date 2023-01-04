import ApprovalIcon from "@mui/icons-material/Approval";
import TooltipWithIcon, {
    TooltipWithIconProps,
} from "src/squads/lesson/pages/LessonManagement/components/Tooltips/TooltipWithIcon";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const renderTooltipWithIcon = (position: TooltipWithIconProps["position"]) => {
    return render(
        <TooltipWithIcon
            tooltipTitle="Sample tooltip title"
            icon={<ApprovalIcon />}
            position={position}
        />
    );
};

describe("<TooltipWithIcon /> component", () => {
    it("should render tooltip with correct CSS when used in textarea", () => {
        renderTooltipWithIcon("textarea");
        expect(screen.getByTestId("TooltipWithIcon__root")).toHaveStyle("margin-left: 16px");
    });

    it("should render tooltip with correct CSS when used in typography", () => {
        renderTooltipWithIcon("typography");
        expect(screen.getByTestId("TooltipWithIcon__root")).not.toHaveStyle("margin-left: 16px");
    });

    it("should render tooltip title when hovering icon", async () => {
        renderTooltipWithIcon("typography");

        const icon = screen.getByTestId("ApprovalIcon");
        expect(screen.queryByText("Sample tooltip title")).not.toBeInTheDocument();
        userEvent.hover(icon);
        await waitFor(() => {
            expect(screen.getByText("Sample tooltip title")).toBeInTheDocument();
        });
    });
});
