import { ReactNode } from "react";

import ControlButton, { StyleButtonProps } from "../ControlButton";

import { fireEvent, render, screen } from "@testing-library/react";

const tooltip: string = "control button";
const icon: string = "icon";
const children: ReactNode = <span>{icon}</span>;
const onClick = jest.fn();

const renderUtil = (props: StyleButtonProps) =>
    render(<ControlButton {...props}>{children}</ControlButton>);

describe(ControlButton.name, () => {
    it("should render correct icon button", () => {
        renderUtil({ tooltip, onClick, active: true });

        expect(screen.getByRole("button", { name: tooltip })).toBeInTheDocument();
        expect(screen.getByText(icon)).toBeInTheDocument();
    });

    it("should be trigger onClick handler once clicked", () => {
        renderUtil({ tooltip, onClick, active: true });
        fireEvent.click(screen.getByRole("button", { name: tooltip }));

        expect(onClick).toBeCalled();
    });
});
