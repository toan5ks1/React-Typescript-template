import { EurekaEntities, MutationMenus } from "src/common/constants/enum";

import LOAndAssignmentItem, { LOAndAssignmentItemProps } from "../LOAndAssignmentItem";
import { LOAndAssignmentType } from "../models";

import { render, screen, fireEvent } from "@testing-library/react";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar");

describe(LOAndAssignmentItem.name, () => {
    const props: LOAndAssignmentItemProps = {
        topicId: "topic_id",
        disabledDown: false,
        disabledUp: false,
        isLO: false,
        onReOrder: jest.fn(),
        onSuccess: jest.fn(),
        resource: EurekaEntities.ASSIGNMENTS,
        searchUrl: "searchUrl",
        itemId: "assignment_id",
        data: { assignment_id: "assignment_id" } as LOAndAssignmentType,
    };
    beforeEach(() => {
        render(<LOAndAssignmentItem {...props} />, { wrapper: TestAppWithQueryClient });
    });

    it("should call the onReOrder callback when click to move up itself", () => {
        const control = screen.getByTestId("LOAndAssignmentItem__moveUp");

        fireEvent.click(control);

        expect(props.onReOrder).toBeCalledWith(MutationMenus.MOVE_UP, "assignment_id");
    });

    it("should call the onReOrder callback when click to move down itself", () => {
        const control = screen.getByTestId("LOAndAssignmentItem__moveDown");

        fireEvent.click(control);

        expect(props.onReOrder).toBeCalledWith(MutationMenus.MOVE_DOWN, "assignment_id");
    });
});
