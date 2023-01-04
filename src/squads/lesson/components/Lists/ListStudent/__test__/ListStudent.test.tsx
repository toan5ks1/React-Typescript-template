import { FieldValues } from "react-hook-form";
import { generateSampleStudent } from "src/squads/lesson/test-utils/lesson-management";

import ListStudent, { ListStudentProps } from "src/squads/lesson/components/Lists/ListStudent";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("ListStudent", () => {
    const props: ListStudentProps<FieldValues> = {
        students: [generateSampleStudent("1"), generateSampleStudent("2")],
        onSelect: jest.fn(),
    };

    it("should render items list by student name", () => {
        render(<ListStudent {...props} />);

        props.students.forEach((student) => {
            const studentListItem = screen.getByRole("button", { name: student.user.name });
            userEvent.click(studentListItem);

            expect(props.onSelect).toBeCalledWith(student);
        });
    });

    it("should render error icons", () => {
        render(
            <ListStudent {...props} errors={[undefined, { message: "Message error sample" }]} />
        );

        const itemsList = screen.getAllByTestId("ListStudent__listItem");

        expect(within(itemsList[0]).queryByTestId("ErrorOutlineOutlinedIcon")).toBeNull();
        expect(within(itemsList[1]).queryByTestId("ErrorOutlineOutlinedIcon")).not.toBeNull();
    });
});
