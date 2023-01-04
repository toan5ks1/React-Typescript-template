import AppProvider from "../AppProvider";
import AppRouter from "../AppRouter";

import { render, screen, waitFor } from "@testing-library/react";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => {
    return {
        __esModule: true,
        useInitializeUnleashWithoutIdentification: () => true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/user/routing/routings.ts");
jest.mock("src/squads/timesheet/routing/routings.ts");

describe("<MicroRouting />", () => {
    const renderComponent = () => {
        return render(
            <AppProvider>
                <AppRouter />
            </AppProvider>
        );
    };

    it("should render with enable multi tenant", async () => {
        (useUserFeatureToggle as jest.Mock).mockReturnValue(true);

        const { container } = renderComponent();

        await waitFor(() => expect(screen.queryByTestId("Loading__root")).not.toBeInTheDocument());

        expect(container).toMatchSnapshot();
    });

    it("should render with enable without multi tenant", async () => {
        (useUserFeatureToggle as jest.Mock).mockReturnValue(false);

        const { container } = renderComponent();

        await waitFor(() => expect(screen.queryByTestId("Loading__root")).not.toBeInTheDocument());

        expect(container).toMatchSnapshot();
    });
});
