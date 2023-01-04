import { createMemoryHistory } from "history";
import { Router } from "react-router";

import Menu from "src/squads/architecture/components/Menu";

import { render, screen } from "@testing-library/react";

jest.mock("src/squads/architecture/hooks/useManaSidebarItems", () => {
    const { MessageOutlined } = require("@mui/icons-material");

    const mockItems: ISidebarItem[] = [
        {
            icon: MessageOutlined,
            isActive: (path) => path.includes("/arch"),
            key: "arch",
            name: "Arch",
            order: 1,
            owner: "arch",
            to: "/arch/path1",
            target: "_self",
        },
        {
            icon: MessageOutlined,
            isActive: (path) => path.includes("/comm"),
            key: "comm",
            name: "Comm",
            order: 1,
            owner: "comm",
            to: "/comm/path2",
            target: "_self",
        },
    ];
    return {
        __esModule: true,
        default: () => {
            return mockItems;
        },
    };
});

describe("Menu", () => {
    it("should render success items in Menu component", () => {
        const history = createMemoryHistory({ initialEntries: ["/arch/path1"] });

        render(
            <Router history={history}>
                <Menu sidebarOpen={true} defaultItems={[]} />
            </Router>
        );
        expect(screen.getAllByTestId("MenuItemLink__root")).toHaveLength(2);
        expect(screen.getByLabelText("Arch")).toHaveClass("Mui-selected");
        expect(screen.getByLabelText("Comm")).not.toHaveClass("Mui-selected");
    });
    it("should redirect to first route when access to /", () => {
        const history = createMemoryHistory({ initialEntries: ["/"] });

        render(
            <Router history={history}>
                <Menu sidebarOpen={true} defaultItems={[]} />
            </Router>
        );
        expect(screen.getByLabelText("Arch")).toHaveClass("Mui-selected");
    });
});
