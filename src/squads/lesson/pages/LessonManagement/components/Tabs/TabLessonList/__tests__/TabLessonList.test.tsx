import { useForm } from "react-hook-form";
import { TestApp } from "src/squads/lesson/test-utils";

import { formFilterDefaultValues } from "src/squads/lesson/pages/LessonManagement/components/Forms/FormFilterAdvancedLesson";
import TabLessonList, {
    TabLessonListProps,
} from "src/squads/lesson/pages/LessonManagement/components/Tabs/TabLessonList";
import MuiPickersUtilsProvider from "src/squads/lesson/providers/MuiPickersUtilsProvider";

import { screen, render } from "@testing-library/react";
import { FormFilterLessonManagementValues } from "src/squads/lesson/pages/LessonManagement/hooks/useValidateRulesForFormFilterAdvancedLessonManagement";

jest.mock("src/squads/lesson/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: () => ({ isEnabled: true }),
}));

describe("<TabLessonList />", () => {
    const HookFormComponent = ({
        defaultValues,
    }: {
        defaultValues: FormFilterLessonManagementValues;
    }) => {
        const methods = useForm<FormFilterLessonManagementValues>({
            defaultValues,
        });

        const props: TabLessonListProps = {
            table: <div data-testid="Table__root">Table</div>,
            onCreate: jest.fn(),
            methods,
            onFilter: () => jest.fn(),
            onFilterV2: () => jest.fn(),
            onSearch: () => jest.fn(),
            keyword: "",
        };
        return (
            <TestApp>
                <MuiPickersUtilsProvider>
                    <TabLessonList {...props} />
                </MuiPickersUtilsProvider>
            </TestApp>
        );
    };

    it("should render correct layout", () => {
        render(<HookFormComponent defaultValues={formFilterDefaultValues} />);
        const table = screen.getByTestId("Table__root");
        expect(table).toBeInTheDocument();

        const buttonAdd = screen.getByTestId("TabLessonList__buttonAdd");
        expect(buttonAdd).toBeInTheDocument();

        const buttonFilter = screen.getByTestId("ButtonDropdownWithPopover__button");
        expect(buttonFilter).toBeInTheDocument();
    });
});
