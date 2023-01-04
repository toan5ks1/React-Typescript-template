import Show, { ShowProps } from "src/squads/payment/components/Flow/Show/Show";

import { render, screen } from "@testing-library/react";

const renderNormalUseCase = (
    when: ShowProps<string>["when"],
    case1Fallback: JSX.Element | null,
    case2Fallback: JSX.Element | null
) => {
    return render(
        <>
            <Show fallback={case1Fallback} when={when === "case-1"}>
                <h1>Case 1</h1>
            </Show>

            <Show fallback={case2Fallback} when={when === "case-2"}>
                <h1>Case 2</h1>
            </Show>
        </>
    );
};

const StandardUser = {
    accountType: "Standard",
    maxUploads: 180,
    maxStorage: 100,
};

const renderAdvancedUseCase = ({
    fallback,
    when,
}: Omit<ShowProps<typeof StandardUser | null>, "children">) => {
    return render(
        <Show fallback={fallback} when={when}>
            {(user) => (
                <div>
                    <p>Account Type: {user.accountType}</p>
                    <p>User can upload upto {user.maxUploads} file</p>
                    <p>User can store upto {user.maxStorage}GB</p>
                </div>
            )}
        </Show>
    );
};

describe("<Show /> normal use cases", () => {
    it("should render only component meet the case", () => {
        renderNormalUseCase("case-1", <h1>Show case 1 fallback</h1>, null);

        expect(screen.queryByText("Show case 1 fallback")).not.toBeInTheDocument();
        expect(screen.queryByText("Case 1")).toBeInTheDocument();
        expect(screen.queryByText("Case 2")).not.toBeInTheDocument();
    });

    it("should render fallback component when no component meet the case", () => {
        renderNormalUseCase("case-3", <h1>Show case 1 fallback</h1>, null);

        expect(screen.queryByText("Show case 1 fallback")).toBeInTheDocument();
        expect(screen.queryByText("Case 1")).not.toBeInTheDocument();
        expect(screen.queryByText("Case 2")).not.toBeInTheDocument();
    });

    it("should render nothing when no component meet the case and not define fallback", () => {
        expect(renderNormalUseCase("case-3", null, null).container.children).toHaveLength(0);
    });
});

describe("<Show /> advanced use cases", () => {
    it("should render information of Standard user", () => {
        renderAdvancedUseCase({ fallback: <h1>Fallback case</h1>, when: StandardUser });

        expect(screen.queryByText("Fallback case")).not.toBeInTheDocument();
        expect(screen.queryByText("Account Type: Standard")).toBeInTheDocument();
        expect(screen.queryByText("User can upload upto 180 file")).toBeInTheDocument();
        expect(screen.queryByText("User can store upto 100GB")).toBeInTheDocument();
    });

    it("should render fallback when user = null", () => {
        renderAdvancedUseCase({ fallback: <h1>Fallback case</h1>, when: null });

        expect(screen.queryByText("Fallback case")).toBeInTheDocument();
        expect(screen.queryByText("Account Type: Standard")).not.toBeInTheDocument();
        expect(screen.queryByText("User can upload upto 180 file")).not.toBeInTheDocument();
        expect(screen.queryByText("User can store upto 100GB")).not.toBeInTheDocument();
    });

    it("should render nothing when user = null and fallback = null", () => {
        expect(
            renderAdvancedUseCase({ fallback: null, when: null }).container.children
        ).toHaveLength(0);
    });
});
