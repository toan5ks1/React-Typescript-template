import { ChapterAttrsFragment } from "src/squads/syllabus/services/eureka/eureka-types";

import useCreateTopic, { UseCreateTopicReturn } from "../../../hooks/useCreateTopic";
import DialogCreateTopic from "../DialogCreateTopic";

import { render, RenderResult, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar");

jest.mock("../../../hooks/useCreateTopic", () => jest.fn());

const chapter: ChapterAttrsFragment = {
    chapter_id: "CHAPTER_ID",
    name: "CHAPTER_NAME",
    grade: 10,
    school_id: 12,
};

const useCreateTopicReturn: UseCreateTopicReturn = {
    isLoading: false,
    createTopic: jest.fn(),
};

describe(DialogCreateTopic.name, () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        (useCreateTopic as jest.Mock).mockImplementation(() => useCreateTopicReturn);

        wrapper = render(
            <DialogCreateTopic open chapter={chapter} onClose={jest.fn()} refetch={jest.fn()} />,
            {
                wrapper: TestAppWithQueryClient,
            }
        );
    });

    it("should render correct UI dialog create a topic", () => {
        // should render dialog
        expect(wrapper.getByTestId("DialogCreateTopic__root")).toBeInTheDocument();

        // should render form in the dialog
        expect(wrapper.getByTestId("TopicForm__root")).toBeInTheDocument();
    });

    it("should call createTopic function when press enter key", async () => {
        const dialog = wrapper.getByTestId("DialogCreateTopic__root");
        expect(dialog).toBeInTheDocument();

        const inputName = within(dialog).getByTestId("TextFieldHF__input");

        userEvent.type(inputName, "K Topic");
        userEvent.keyboard("{Enter}");

        await waitFor(() => expect(useCreateTopicReturn.createTopic).toBeCalled());
    });
});
