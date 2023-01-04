import { Entities, EurekaEntities, Features } from "src/common/constants/enum";
import { PORTAL_DIALOG_FOOTER } from "src/common/constants/other";
import { MicroFrontendTypes } from "src/routing/type";
import { AppError } from "src/squads/syllabus/internals/errors";
import logger from "src/squads/syllabus/internals/logger";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import CreateLOsTab, { CreateLOsTabProps } from "../CreateLOsTab";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import { UseTopicControlReturn } from "src/squads/syllabus/hooks/useTopicControl";
import useCreateLOs from "src/squads/syllabus/pages/Book/hooks/useCreateLOs";
import { CreateLOFormData, losWithAssignmentTypes } from "src/squads/syllabus/pages/LO/common/type";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("src/squads/syllabus/hooks/useNavigation");
jest.mock("src/squads/syllabus/internals/logger/logger");
jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/hooks/useTopicControl", () => {
    return {
        __esModule: true,
        default: (): UseTopicControlReturn => ({
            configKeys: {
                EXAM_LO: true,
                FLASH_CARD: true,
                LO: true,
                OFFLINE_STUDY: true,
                ASSIGNMENT: true,
                TASK_ASSIGNMENT: true,
            },
        }),
    };
});

jest.mock("src/squads/syllabus/pages/Book/hooks/useCreateLOs", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockAppErrorMsg = new AppError("ra.manabie-error.invalid_params");

const renderUtil = (props: CreateLOsTabProps) => {
    return render(
        <>
            <CreateLOsTab {...props} />
            <div id={PORTAL_DIALOG_FOOTER} />
        </>,
        { wrapper: TestAppWithQueryClient }
    );
};

const mockUseCreateLOs = (
    override: {
        isLoading?: boolean;
        isPrepareLoading?: boolean;
        createLOs?: () => void;
    } = {}
) => {
    const { isLoading = false, isPrepareLoading = false, createLOs = () => {} } = override;

    (useCreateLOs as jest.Mock).mockImplementation(() => ({
        isLoading,
        isPrepareLoading,
        createLOs,
    }));
};

const mockUseFeatureToggle = () => {
    (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
        // TODO: Remove when Exam LO instruction is released
        if (toggleName === Features.SYLLABUS_EXAM_LO_INSTRUCTION) {
            return {
                isEnabled: true,
            };
        }
    });
};

describe(CreateLOsTab.name, () => {
    const mockPushNavigation = jest.fn();
    const mockShowSnackbar = jest.fn();
    const mockCreateLOs = jest.fn();

    const mockProps: CreateLOsTabProps = {
        topicId: "topicId",
        searchURL: "?searchURL",
        onClose: () => {},
    };

    beforeEach(() => {
        (useNavigation as jest.Mock).mockImplementation(() => ({ push: mockPushNavigation }));
        (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);
    });

    it("should render when loading for prepare data to create", () => {
        mockUseFeatureToggle();
        mockUseCreateLOs({ isPrepareLoading: true });

        renderUtil(mockProps);

        expect(screen.getByTestId("CreateLOsTab__prepareLoading")).toBeInTheDocument();
    });

    it("should render correct select type and input name field to create LOs", () => {
        mockUseFeatureToggle();
        mockUseCreateLOs();

        renderUtil(mockProps);

        expect(screen.getByTestId("SelectHF__select").querySelector("input")).toHaveAttribute(
            "name",
            "type"
        );
        // default doesn't show input field when select type is empty
        expect(screen.queryAllByTestId("TextFieldHF__input")).toHaveLength(0);
        // render custom footer actions
        expect(screen.getByTestId("DialogWithHeaderFooter__dialogActions")).toBeInTheDocument();
    });

    it("should create LOs successfully when select LO type", async () => {
        mockUseFeatureToggle();
        const mockCreateLOFormData: CreateLOFormData = {
            name: "LO name",
            type: losWithAssignmentTypes.LO,
        };
        const mockLoIdList = ["loId"];
        const expectedNavigation = `/${MicroFrontendTypes.SYLLABUS}/${Entities.LOS}/${mockLoIdList[0]}/show${mockProps.searchURL}`;

        mockUseCreateLOs({ createLOs: mockCreateLOs });

        renderUtil(mockProps);

        fireEvent.change(
            screen.getByTestId("SelectHF__select").querySelector("input") as HTMLInputElement,
            {
                target: { value: mockCreateLOFormData.type },
            }
        );

        fireEvent.change(screen.getByTestId("TextFieldHF__input"), {
            target: { value: mockCreateLOFormData.name },
        });

        fireEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));

        await waitFor(() => {
            expect(mockCreateLOs).toBeCalled();
        });

        getLatestCallParams(mockCreateLOs)[1].onSuccess({ loIdsList: mockLoIdList });

        expect(mockPushNavigation).toBeCalledWith(expectedNavigation);

        expect(mockShowSnackbar).toBeCalledWith("You have created a new LO successfully");
    });

    it("should create LOs failed with error message", async () => {
        mockUseFeatureToggle();
        const mockCreateLOFormData: CreateLOFormData = {
            name: "Flashcard name",
            type: losWithAssignmentTypes.FLASH_CARD,
        };

        mockUseCreateLOs({ createLOs: mockCreateLOs });

        renderUtil(mockProps);

        fireEvent.change(
            screen.getByTestId("SelectHF__select").querySelector("input") as HTMLInputElement,
            {
                target: { value: mockCreateLOFormData.type },
            }
        );

        fireEvent.change(screen.getByTestId("TextFieldHF__input"), {
            target: { value: mockCreateLOFormData.name },
        });

        fireEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));

        await waitFor(() => {
            expect(mockCreateLOs).toBeCalled();
        });

        getLatestCallParams(mockCreateLOs)[1].onError(mockAppErrorMsg);

        expect(logger.warn).toBeCalledWith("[LOs create]", mockAppErrorMsg);
        expect(mockShowSnackbar).toBeCalledWith(
            "Created failed Invalid params. Please check your data",
            "error"
        );
    });

    it("should navigate to create assignment page when select assignment type", async () => {
        mockUseFeatureToggle();
        const expectedNavigation = `/${MicroFrontendTypes.SYLLABUS}/${EurekaEntities.ASSIGNMENTS}/create${mockProps.searchURL}`;

        mockUseCreateLOs();

        renderUtil(mockProps);

        fireEvent.change(
            screen.getByTestId("SelectHF__select").querySelector("input") as HTMLInputElement,
            {
                target: { value: losWithAssignmentTypes.ASSIGNMENT },
            }
        );

        expect(screen.queryByTestId("TextFieldHF__input")).not.toBeInTheDocument();

        fireEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));

        await waitFor(() => {
            expect(mockPushNavigation).toBeCalledWith(expectedNavigation);
        });
    });

    it("should navigate to create task assignment page when select task assignment type", async () => {
        mockUseFeatureToggle();
        const expectedPath = `/${MicroFrontendTypes.SYLLABUS}/${EurekaEntities.TASK_ASSIGNMENTS}/create${mockProps.searchURL}`;

        mockUseCreateLOs();

        renderUtil(mockProps);

        fireEvent.change(
            screen.getByTestId("SelectHF__select").querySelector("input") as HTMLInputElement,
            { target: { value: losWithAssignmentTypes.TASK_ASSIGNMENT } }
        );

        expect(screen.queryByTestId("TextFieldHF__input")).not.toBeInTheDocument();

        fireEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));

        await waitFor(() => expect(mockPushNavigation).toBeCalledWith(expectedPath));
    });

    it("should navigate to create exam LO create page when select exam LO type", async () => {
        const expectedPath = `/${MicroFrontendTypes.SYLLABUS}/${EurekaEntities.EXAM_LO}/create${mockProps.searchURL}`;
        const mockCreateLOFormData: CreateLOFormData = {
            name: "LO name",
            type: losWithAssignmentTypes.EXAM_LO,
        };

        mockUseFeatureToggle();

        (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
            if (toggleName === Features.SYLLABUS_EXAM_LO_INSTRUCTION) {
                return {
                    isEnabled: true,
                };
            }
        });

        mockUseCreateLOs();

        renderUtil(mockProps);

        fireEvent.change(
            screen.getByTestId("SelectHF__select").querySelector("input") as HTMLInputElement,
            { target: { value: mockCreateLOFormData.type } }
        );

        fireEvent.change(screen.getByTestId("TextFieldHF__input"), {
            target: { value: mockCreateLOFormData.name },
        });

        expect(screen.queryByTestId("TextFieldHF__input")).toBeInTheDocument();

        fireEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));

        await waitFor(() => expect(mockPushNavigation).toBeCalledWith(expectedPath));
    });
});
