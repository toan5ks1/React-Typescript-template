import { createMockListParent } from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import ParentList, { ParentListProps } from "../ParentList";

import { render } from "@testing-library/react";
import useRemoveParent from "src/squads/user/modules/student-family/hooks/useRemoveParent";

jest.mock("src/squads/user/hooks/useReissueUserPassword");
jest.mock("src/squads/user/modules/student-family/hooks/useRemoveParent", () => jest.fn());
jest.mock("src/squads/user/hooks/useTranslate");

const mockDataParents = createMockListParent({ length: 2, student_id: "student_id" });

const defaultProps: ParentListProps = {
    studentId: "student_1",
    parents: mockDataParents,
    refetchParents: jest.fn(),
};

const renderComponent = (overrideProps?: ParentListProps) => {
    const props = overrideProps || defaultProps;

    (useRemoveParent as jest.Mock).mockImplementation(() => jest.fn());

    return render(
        <TestCommonAppProvider>
            <ParentList {...props} />
        </TestCommonAppProvider>
    );
};

describe("<ParentList />", () => {
    it("should match snapshot", () => {
        const wrapper = renderComponent();

        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct parent item", () => {
        const wrapper = renderComponent();

        expect(wrapper.queryByTestId("ParentList__root")).toBeInTheDocument();
        expect(wrapper.getAllByTestId("ParentItem__root")).toHaveLength(mockDataParents.length);
    });

    it("render with empty parents", () => {
        const props: ParentListProps = {
            studentId: "student_1",
            parents: [],
            refetchParents: jest.fn(),
        };

        const wrapper = renderComponent(props);

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.queryByTestId("NoData__message")).toHaveTextContent(
            "ra.message.noDataInformation"
        );
    });
});
