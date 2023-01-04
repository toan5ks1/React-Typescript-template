import Switch, { SwitchProps } from "src/squads/payment/components/Flow/Switch/Switch";

import { render, screen } from "@testing-library/react";

const renderNormalUseCase = (props: SwitchProps, when: string) => {
    return render(
        <Switch {...props}>
            <Switch.Case when={when === "case-1"}>
                <h1>Case 1</h1>
            </Switch.Case>

            <Switch.Case when={when === "case-2"}>
                <h1>Case 2</h1>
            </Switch.Case>

            <Switch.Case when={when === "case-2"}>
                <h1>Case 2.1</h1>
            </Switch.Case>

            <Switch.Case when={when === "case-3"}>
                <h1>Case 3</h1>
            </Switch.Case>
        </Switch>
    );
};

const EssentialUser = {
    accountType: "Essential",
    maxUploads: 120,
};

const StandardUser = {
    accountType: "Standard",
    maxUploads: 180,
    maxStorage: 100,
};

const PremiumUser = {
    accountType: "Premium",
    maxUploads: 240,
    maxStorage: 200,
    tags: ["VIP", "Premium"],
};

const renderAdvancedUseCase = (
    props: SwitchProps,
    when: typeof EssentialUser | null,
    when2: typeof StandardUser | null,
    when3: typeof PremiumUser | null
) => {
    return render(
        <Switch {...props}>
            <Switch.Case when={when}>
                {(user) => (
                    <div>
                        <p>Account Type: {user.accountType}</p>
                        <p>User can upload upto {user.maxUploads} file</p>
                    </div>
                )}
            </Switch.Case>

            <Switch.Case when={when2}>
                {(user) => (
                    <div>
                        <p>Account Type: {user.accountType}</p>
                        <p>User can upload upto {user.maxUploads} file</p>
                        <p>User can store upto {user.maxStorage}GB</p>
                    </div>
                )}
            </Switch.Case>

            <Switch.Case when={when3}>
                {(user) => (
                    <div>
                        {user.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                        ))}

                        <p>Account Type: {user.accountType}</p>
                        <p>User can upload upto {user.maxUploads} file</p>
                        <p>User can store upto {user.maxStorage}GB</p>
                    </div>
                )}
            </Switch.Case>
        </Switch>
    );
};

describe("<Switch /> normal use cases", () => {
    it("should render only component meet the case", () => {
        renderNormalUseCase({ fallback: <h1>Fallback case</h1> }, "case-2");

        expect(screen.queryByText("Fallback case")).not.toBeInTheDocument();
        expect(screen.queryByText("Case 1")).not.toBeInTheDocument();
        expect(screen.queryByText("Case 2")).toBeInTheDocument();
        expect(screen.queryByText("Case 2.1")).not.toBeInTheDocument();
        expect(screen.queryByText("Case 3")).not.toBeInTheDocument();
    });

    it("should render only very first component meet the case", () => {
        renderNormalUseCase({ fallback: <h1>Fallback case</h1> }, "case-2");

        expect(screen.queryByText("Fallback case")).not.toBeInTheDocument();
        expect(screen.queryByText("Case 1")).not.toBeInTheDocument();
        expect(screen.queryByText("Case 2")).toBeInTheDocument();
        expect(screen.queryByText("Case 2.1")).not.toBeInTheDocument();
        expect(screen.queryByText("Case 3")).not.toBeInTheDocument();
    });

    it("should render fallback component when no component meet the case", () => {
        renderNormalUseCase({ fallback: <h1>Fallback case</h1> }, "case-222");

        expect(screen.queryByText("Fallback case")).toBeInTheDocument();
        expect(screen.queryByText("Case 1")).not.toBeInTheDocument();
        expect(screen.queryByText("Case 2")).not.toBeInTheDocument();
        expect(screen.queryByText("Case 2.1")).not.toBeInTheDocument();
        expect(screen.queryByText("Case 3")).not.toBeInTheDocument();
    });

    it("should render nothing when no component meet the case and not define fallback", () => {
        expect(renderNormalUseCase({}, "case-222").container.children).toHaveLength(0);
    });
});

describe("<Switch /> advanced use cases", () => {
    it("should render information of Essential user", () => {
        renderAdvancedUseCase({ fallback: <h1>Fallback case</h1> }, EssentialUser, null, null);

        expect(screen.queryByText("Fallback case")).not.toBeInTheDocument();
        expect(screen.queryByText("Account Type: Essential")).toBeInTheDocument();
        expect(screen.queryByText("User can upload upto 120 file")).toBeInTheDocument();
    });

    it("should render information of Standard user", () => {
        renderAdvancedUseCase({ fallback: <h1>Fallback case</h1> }, null, StandardUser, null);

        expect(screen.queryByText("Fallback case")).not.toBeInTheDocument();
        expect(screen.queryByText("Account Type: Standard")).toBeInTheDocument();
        expect(screen.queryByText("User can upload upto 180 file")).toBeInTheDocument();
        expect(screen.queryByText("User can store upto 100GB")).toBeInTheDocument();
    });

    it("should render information of Premium user", () => {
        renderAdvancedUseCase({ fallback: <h1>Fallback case</h1> }, null, null, PremiumUser);

        expect(screen.queryByText("Fallback case")).not.toBeInTheDocument();
        expect(screen.queryByText("VIP")).toBeInTheDocument();
        expect(screen.queryByText("Premium")).toBeInTheDocument();
        expect(screen.queryByText("Account Type: Premium")).toBeInTheDocument();
        expect(screen.queryByText("User can upload upto 240 file")).toBeInTheDocument();
        expect(screen.queryByText("User can store upto 200GB")).toBeInTheDocument();
    });
});
