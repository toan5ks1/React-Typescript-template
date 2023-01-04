import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import SchoolHistoryTable from "../SchoolHistoryTable";

import { render } from "@testing-library/react";

describe("<SchoolHistoryTable/>", () => {
    const onSelect = jest.fn();
    const renderComponent = () => {
        return render(
            <TestCommonAppProvider>
                <SchoolHistoryTable data={[]} selectedSchoolHistory={[]} onSelect={onSelect} />
            </TestCommonAppProvider>
        );
    };

    it("should match snapshot empty table", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });
});
