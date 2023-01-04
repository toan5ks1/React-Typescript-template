import { MutationMenus } from "src/common/constants/enum";

import MoveUpDown, { MoveUpDownProps } from "../MoveUpDown";

import { fireEvent, render, screen } from "@testing-library/react";

interface Data {
    name: string;
}

describe(MoveUpDown.name, () => {
    const moveUpTestId = "MoveUpDownBase__up";
    const moveDownTestId = "MoveUpDownBase__down";

    const onClick = jest.fn();
    const defaultProps: MoveUpDownProps<Data> = {
        identity: "entity_id",
        onClick,
        record: { name: "book name" },
        moveDownProps: {},
        moveUpProps: {},
    };

    it("should trigger the onClick callback", () => {
        render(<MoveUpDown {...defaultProps} />);

        // trigger with move up
        fireEvent.click(screen.getByTestId(moveUpTestId));
        expect(onClick).toBeCalledWith(
            MutationMenus.MOVE_UP,
            defaultProps.identity,
            defaultProps.record
        );

        // trigger with move down
        fireEvent.click(screen.getByTestId(moveDownTestId));
        expect(onClick).toBeCalledWith(
            MutationMenus.MOVE_DOWN,
            defaultProps.identity,
            defaultProps.record
        );
    });

    it("should disable when moveDownProps || moveUpProps  passed", () => {
        render(
            <MoveUpDown
                {...defaultProps}
                moveDownProps={{
                    disabled: true,
                }}
                moveUpProps={{
                    disabled: true,
                }}
            />
        );

        expect(screen.getByTestId(moveDownTestId)).toBeDisabled();
        expect(screen.getByTestId(moveUpTestId)).toBeDisabled();
    });
});
