import { MutationMenus } from "src/common/constants/enum";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import { Action } from "src/components/Menus/ActionPanel";

import MoreAction, { MoreActionProps } from "../MoreAction";

import { fireEvent, render, screen } from "@testing-library/react";
import useCourseControl from "src/squads/syllabus/hooks/useCourseControl";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

const mockProps: MoreActionProps = {
    recordId: "",
    recordName: "Course Name",
    onEdit: jest.fn(),
};
const mockActions: Action[] = [MutationMenus.EDIT, MutationMenus.DELETE];

jest.mock("src/squads/syllabus/internals/permission", () => {
    const originalModule = jest.requireActual("src/squads/syllabus/internals/permission");
    return {
        ...originalModule,
        can: () => true,
    };
});

jest.mock("src/squads/syllabus/services/infer-mutation");
jest.mock("src/squads/syllabus/hooks/useCourseControl", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/hooks/useNavigation");

const mockPushNavigation = jest.fn();
const mockUseNavigation = () => {
    (useNavigation as jest.Mock).mockImplementation(() => ({ push: mockPushNavigation }));
};

const mockShowSnackbar = jest.fn();
const mockUseShowSnackbar = () => {
    (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);
};

const mockMutationCourseDelete = jest.fn();

const renderUtil = (actions: Action[] = mockActions) => {
    (inferMutation as jest.Mock).mockImplementation(() =>
        mockMutationCourseDelete.mockReturnValue({ mutate: () => {}, isLoading: false })
    );

    (useCourseControl as jest.Mock).mockReturnValue({
        actions,
    });

    return render(<MoreAction {...mockProps} />, {
        wrapper: TestAppWithQueryClient,
    });
};

describe("<MoreAction /> course", () => {
    it("should match snapshot", () => {
        const wrapper = renderUtil();

        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct icon", () => {
        const wrapper = renderUtil();

        expect(
            wrapper.container?.querySelector(".MuiButton-startIcon svg")
        ).not.toBeInTheDocument();
    });

    it("should render correct menu dropdown", () => {
        renderUtil();

        fireEvent.click(screen.getByTestId("ActionPanel__trigger"));

        expect(screen.getByLabelText("ra.common.action.delete")).toBeInTheDocument();
        expect(screen.getByLabelText("ra.common.action.edit")).toBeInTheDocument();
    });
});

describe("<MoreAction /> course without permission", () => {
    it("should render correct UI without permission", () => {
        renderUtil([]);

        expect(screen.queryByTestId("ActionPanel__trigger")).not.toBeInTheDocument();
    });
});

describe(`${MoreAction.name} navigate to exact path`, () => {
    it("should handle onSuccess and onError when delete course", () => {
        mockUseNavigation();
        mockUseShowSnackbar();
        renderUtil();

        getLatestCallParams(mockMutationCourseDelete)[0].onSuccess();
        expect(mockPushNavigation).toBeCalledWith("/syllabus/courses");
        expect(mockShowSnackbar).toBeCalledWith("You have deleted course successfully");

        getLatestCallParams(mockMutationCourseDelete)[0].onError();
        expect(mockShowSnackbar).toBeCalledWith("Delete failed", "error");
    });

    it("should trigger onEdit when click edit button", () => {
        renderUtil();

        fireEvent.click(screen.getByTestId("ActionPanel__trigger"));
        fireEvent.click(screen.getByLabelText("ra.common.action.edit"));

        expect(mockProps.onEdit).toBeCalled();
    });
});
