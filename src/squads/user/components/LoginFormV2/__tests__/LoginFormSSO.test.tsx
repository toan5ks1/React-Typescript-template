import appConfigs from "src/internals/configuration";

import LoginFormSSO from "../LoginFormSSO";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("src/internals/configuration", () => {
    return jest.requireActual("src/internals/configuration/__mocks__/configuration");
});

describe("<LoginFormSSO />", () => {
    it("should call onLogin when click button", () => {
        const fn = jest.fn();

        (appConfigs.getCurrentPjOwner as jest.Mock).mockImplementation(() => {
            return "ABC";
        });

        render(<LoginFormSSO loading={false} onLogin={fn} />);

        userEvent.click(screen.getByLabelText("Log in"));

        expect(fn).toHaveBeenCalled();
    });

    it("should show PjOwner name on button", () => {
        const fn = jest.fn();
        const pjOwnerName = "cTEST";

        (appConfigs.getCurrentPjOwner as jest.Mock).mockImplementation(() => {
            return pjOwnerName;
        });

        render(<LoginFormSSO loading={false} onLogin={fn} />);

        expect(
            screen.getByText((text) => {
                return text.includes(pjOwnerName.toLocaleUpperCase());
            })
        ).toBeInTheDocument();
    });
});
