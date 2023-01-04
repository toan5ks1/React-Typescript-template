import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import DialogUpdateLOs, { DialogUpdateLOsProps } from "../DialogUpdateLOs";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useUpdateLOs from "src/squads/syllabus/pages/Book/hooks/useUpdateLOs";
import { mockLOByTopicIdQueryData } from "src/squads/syllabus/services/eureka/topic-learning-objective/__mocks__/topic-learning-objective-bob.query";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("src/squads/syllabus/pages/Book/hooks/useUpdateLOs", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockLOByTopicIdData = mockLOByTopicIdQueryData();

const renderUtil = (props: DialogUpdateLOsProps) => {
    return render(<DialogUpdateLOs {...props} />, { wrapper: TestAppWithQueryClient });
};

const mockUseUpdateLOs = (
    override: {
        isLoading?: boolean;
        updateLOs?: () => void;
    } = {}
) => {
    const { isLoading = false, updateLOs = () => {} } = override;

    (useUpdateLOs as jest.Mock).mockImplementation(() => ({
        isLoading,
        updateLOs,
    }));
};

describe(DialogUpdateLOs.name, () => {
    it("should render correct UI update LOs dialog by LOs type", () => {
        const mockProps: DialogUpdateLOsProps = {
            open: true,
            topicId: mockLOByTopicIdData.topic_id!,
            data: mockLOByTopicIdData,
            onSuccess: () => {},
            onClose: () => {},
        };

        mockUseUpdateLOs();

        renderUtil(mockProps);

        expect(screen.getByText("Rename Learning Objective")).toBeInTheDocument();
        expect(screen.getByTestId("TextFieldHF__input")).toHaveValue(mockProps.data.name);
    });

    it("should update LOs successfully", async () => {
        const mockUpdateLOs = jest.fn();
        const mockOnSuccess = jest.fn();
        const mockOnClose = jest.fn();
        const mockProps: DialogUpdateLOsProps = {
            open: true,
            topicId: mockLOByTopicIdData.topic_id!,
            data: mockLOByTopicIdData,
            onSuccess: mockOnSuccess,
            onClose: mockOnClose,
        };

        mockUseUpdateLOs({ updateLOs: mockUpdateLOs });

        renderUtil(mockProps);
        const { data } = mockProps;

        userEvent.type(screen.getByTestId("TextFieldHF__input"), `Update ${data.name}`);

        userEvent.click(screen.getByLabelText("ra.common.action.save"));

        await waitFor(() => {
            expect(mockUpdateLOs).toBeCalled();
        });

        getLatestCallParams(mockUpdateLOs)[1].onSuccess();

        expect(mockOnSuccess).toBeCalled();
        expect(mockOnClose).toBeCalled();
    });
});
