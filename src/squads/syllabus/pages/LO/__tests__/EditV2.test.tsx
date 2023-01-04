import logger from "src/squads/syllabus/internals/logger";
import NsSyllabus_LearningObjectiveService from "src/squads/syllabus/services/eureka/learning-objective/types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import { LearningObjectiveType } from "manabuf/common/v1/enums_pb";

import EditLOV2, { EditLOProps } from "../EditV2";

import { fireEvent, render, RenderResult, waitFor } from "@testing-library/react";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("src/squads/syllabus/internals/logger/logger");

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => jest.fn());
jest.mock("src/squads/syllabus/hooks/useTranslate");
jest.mock("src/squads/syllabus/hooks/useResourceTranslate", () => {
    const tLos = (t: string) => t;
    return () => tLos;
});

jest.mock("src/squads/syllabus/services/infer-mutation");

const props: EditLOProps = {
    open: true,
    onClose: jest.fn(),
    onSave: jest.fn(),
    defaultValues: {
        lo_id: "lo_id",
        school_id: 1,
        topic_id: "topic_id",
        name: "LO",
        type: "LEARNING_OBJECT",
        display_order: 0,
        prerequisites: null,
        study_guide: null,
        video: null,
    },
};

const { lo_id, school_id, topic_id, type, display_order, prerequisites, study_guide, video } =
    props.defaultValues;

const payload: NsSyllabus_LearningObjectiveService.UpsertLOs = {
    loId: lo_id,
    schoolId: school_id,
    topicId: topic_id as string,
    name: "",
    type: type as keyof typeof LearningObjectiveType,
    displayOrder: Number(display_order),
    prerequisitesList: prerequisites,
    studyGuide: study_guide || undefined,
    video: video || undefined,
};

const mockLOMutation = jest.fn();

const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        learningObjective: mockLOMutation,
    });
};

const ComposeWrapper = () => {
    return (
        <TestAppWithQueryClient>
            <EditLOV2 {...props} />
        </TestAppWithQueryClient>
    );
};

describe("<EditLOV2 /> successful cases", () => {
    let wrapper: RenderResult;
    const mutateFn = jest.fn();
    const showSnackbar = jest.fn();

    beforeEach(() => {
        mockLOMutation.mockReturnValue({
            mutate: mutateFn,
        });
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        wrapper = render(<ComposeWrapper />);
    });

    it("should call onSave on submitted valid input data", async () => {
        // makes sure that the default LO values were passed to the form
        const lONameInput = wrapper.getByTestId("LODialog__inputName") as HTMLInputElement;
        expect(lONameInput.value).toEqual(props.defaultValues.name);

        fireEvent.change(lONameInput, { target: { value: "New LO" } });
        expect(lONameInput.value).toEqual("New LO");

        payload.name = lONameInput.value;

        fireEvent.click(wrapper.getByTestId("FooterDialogConfirm__buttonSave"));

        await waitFor(() => {
            expect(mutateFn).toBeCalledWith(payload);
        });

        const [options] = getLatestCallParams(mockLOMutation);

        options.onSuccess();

        expect(showSnackbar).toBeCalledWith("ra.common.updatedSuccess");
    });

    it("should call onClose and close window when clicking Cancel", () => {
        fireEvent.click(wrapper.getByTestId("FooterDialogConfirm__buttonClose"));
        expect(props.onClose).toBeCalled();
    });
});

describe("<EditLOV2 /> error cases", () => {
    it("should show error message when call the onError callback", async () => {
        const mutateFn = jest.fn();
        const showSnackbar = jest.fn();

        mockLOMutation.mockReturnValue({
            mutate: mutateFn,
        });
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        render(<ComposeWrapper />);

        const [options] = getLatestCallParams(mockLOMutation);

        const error = new Error("An error occurred on editing LO");

        options.onError(error);

        expect(showSnackbar).toBeCalledWith(error.message, "error");
        expect(logger.warn).toBeCalledWith(`onError upsertLOs`, error);
    });
});

describe("<EditLOV2 /> rendering an unknown error message", () => {
    it("should show an unknown error message when there is no error message", async () => {
        const showSnackbar = jest.fn();

        mockLOMutation.mockReturnValue({
            mutate: jest.fn(),
        });
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        render(<ComposeWrapper />);

        const [options] = getLatestCallParams(mockLOMutation);

        options.onError("unknown");

        await waitFor(() => {
            expect(showSnackbar).toBeCalledWith("ra.manabie-error.unknown", "error");
        });
    });
});
