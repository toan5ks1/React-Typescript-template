import { MutationMenus } from "src/common/constants/enum";
import { Lesson_ClassListByCourseIdV3Query } from "src/squads/syllabus/services/bob/bob-types";

import { within, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const generateMockClassList = (total = 5): Lesson_ClassListByCourseIdV3Query["class"] => {
    return Array.from({ length: total }).map((_, index) => {
        const count = index + 1;

        return {
            class_id: `Class_Id_${count}`,
            name: `Class Name ${count}`,
            location: {
                location_id: `Location_Id_${count}`,
                name: `Location Name ${count}`,
            },
        };
    });
};

export const triggerActionPanelAction = (wrapper: HTMLElement, action: MutationMenus) => {
    userEvent.click(within(wrapper).getByTestId("ActionPanel__trigger"));

    const actionButton = screen
        .getByTestId("ActionPanel__popover--open")
        .querySelector(`button[data-value="${action}"]`);

    if (!actionButton) throw Error("Action panel button is not found");

    userEvent.click(actionButton);
};
