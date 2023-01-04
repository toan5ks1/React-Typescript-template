import { generateSampleStudent } from "src/squads/lesson/test-utils/lesson-management";

import ListStudentOnUpsert, {
    ListStudentOnUpsertProps,
} from "src/squads/lesson/components/Lists/ListStudentOnUpsert";

import { render, RenderResult, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const renderListStudentOnUpsertWrapper = (props: ListStudentOnUpsertProps<any>) => {
    return render(<ListStudentOnUpsert {...props} />);
};

const studentsList = [generateSampleStudent("Student 01"), generateSampleStudent("Student 02")];

describe("<ListStudentOnUpsert /> testing", () => {
    it("should render number of items by students list length", async () => {
        const props: ListStudentOnUpsertProps<any> = {
            students: studentsList,
            onSelect: jest.fn(),
            selectedIndex: 0,
        };

        const wrapper: RenderResult = renderListStudentOnUpsertWrapper(props);

        const itemsList = wrapper.queryAllByTestId("ListStudentOnUpsert__listItem");
        expect(itemsList).toHaveLength(props.students.length);

        const secondStudentIndex = 1;
        userEvent.click(itemsList[secondStudentIndex]);
        await waitFor(() => {
            expect(props.onSelect).toBeCalledWith(secondStudentIndex);
        });
    });

    it("should render error icons", async () => {
        const props: ListStudentOnUpsertProps<any> = {
            students: studentsList,
            onSelect: jest.fn(),
            selectedIndex: 0,
            errors: [
                {
                    message: "Message error sample",
                },
                {
                    message: "Message error sample",
                },
            ],
        };

        const wrapper: RenderResult = renderListStudentOnUpsertWrapper(props);

        const itemsList = wrapper.queryAllByTestId("ListStudentOnUpsert__iconError");
        const errors = props.errors as Array<{ message: string }>;
        expect(itemsList).toHaveLength(errors.length);
    });
});
