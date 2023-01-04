import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import StudentSchoolHistoryUpsert from "../StudentSchoolHistoryUpsert";

import { render, screen } from "@testing-library/react";
import useSchoolHistoryFieldArray, {
    UseSchoolHistoryFieldArrayReturn,
} from "src/squads/user/modules/student-upsert/hooks/useSchoolHistoryFieldArray";

jest.mock("src/squads/user/modules/student-upsert/hooks/useSchoolHistoryFieldArray", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<StudentSchoolHistoryUpsert/>", () => {
    const onAdd = jest.fn();
    const onRemove = jest.fn();
    const renderComponent = () => {
        return render(
            <TestCommonAppProvider>
                <StudentSchoolHistoryUpsert />
            </TestCommonAppProvider>
        );
    };
    beforeEach(() => {
        (useSchoolHistoryFieldArray as jest.Mock<UseSchoolHistoryFieldArrayReturn>).mockReturnValue(
            { fields: [], onAdd, onRemove }
        );
    });

    it("should match snapshot empty table", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
        expect(screen.getByText("School History")).toBeInTheDocument();
    });
});
