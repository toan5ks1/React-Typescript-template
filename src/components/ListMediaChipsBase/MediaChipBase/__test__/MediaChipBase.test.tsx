import { KeyConversionTaskStatusTypes, KeyMediaTypes } from "src/common/constants/const";
import { TestApp } from "src/test-utils";

import MediaChipBase, { MediaChipBaseProps } from "../MediaChipBase";

import { render, screen, fireEvent } from "@testing-library/react";

describe("<MediaChip /> component renders data", () => {
    const mockDeleteFn = jest.fn();

    const props: MediaChipBaseProps = {
        onDelete: mockDeleteFn,
        shouldConfirmDelete: true,
        file: {
            name: "The Wonders of Nature",
            type: KeyMediaTypes.MEDIA_TYPE_PDF,
            resource: "https://green-school-portal.web.app/",
            media_id: "01",
            created_at: "Created At",
            updated_at: "Updated At",
            conversion_tasks: [
                {
                    created_at: "created at",
                    resource_url: "https://green-school-portal.web.app/",
                    status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
                    task_uuid: "task_uuid",
                    updated_at: "update at",
                },
            ],
            conversion_tasks_aggregate: {
                nodes: [],
            },
        },
        index: 0,
    };

    it("should match snapshot", () => {
        const { container } = render(
            <TestApp>
                <MediaChipBase {...props} />
            </TestApp>
        );
        expect(container).toMatchSnapshot();
    });

    it("should delete file correctly", () => {
        render(
            <TestApp>
                <MediaChipBase {...props} />
            </TestApp>
        );

        const removeIcon = screen.getByTestId("ChipRemoveIcon__icon");
        fireEvent.click(removeIcon);

        const confirmRemoveFileBtn = screen.getByTestId("FooterDialogConfirm__buttonSave");
        expect(confirmRemoveFileBtn).toBeInTheDocument();

        fireEvent.click(confirmRemoveFileBtn);
        expect(mockDeleteFn).toBeCalled();
    });

    it("should not render delete icon when onDelete is undefined", () => {
        render(
            <TestApp>
                <MediaChipBase {...props} onDelete={undefined} />
            </TestApp>
        );

        expect(screen.queryByTestId("ChipRemoveIcon__icon")).not.toBeInTheDocument();
    });
});
