import { Route } from "react-router";
import { Features } from "src/common/constants/enum";
import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import { UseQueryBaseV2Return } from "src/squads/syllabus/hooks/data/data-types";
import { Syllabus_LearningObjectivesOneQuery } from "src/squads/syllabus/services/eureka/eureka-types";
import { inferQuery } from "src/squads/syllabus/services/infer-query";
import { getCallParamsAt } from "src/squads/syllabus/test-utils/mock-utils";

import ShowV2 from "../ShowV2";

import { fireEvent, render, screen } from "@testing-library/react";
import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useDeleteLOs from "src/squads/syllabus/pages/Book/hooks/useDeleteLOs";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

const mockBookId = "bookId";
const lOName = "lo_name_test";

jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...originalModule,
        useParams: () => {
            return { id: "lo_id" };
        },
    };
});

jest.mock("src/squads/syllabus/common/utils/url", () => {
    const actual = jest.requireActual("src/squads/syllabus/common/utils/url");
    return {
        __esModule: true,
        ...actual,
        parseQuery: () => ({ bookId: mockBookId }),
    };
});

jest.mock("src/squads/syllabus/hooks/useBreadcrumb/useBreadcrumbLOs");

jest.mock("../LODetail", () => {
    return {
        __esModule: true,
        default: () => <div data-testid="LO_showCurrentVersion"></div>,
    };
});

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => jest.fn());
jest.mock("src/squads/syllabus/hooks/useFeatureToggle", () => jest.fn());

jest.mock("../../Flashcard/hooks/useGetFlashcard", () => {
    return {
        __esModule: true,
        default: () => ({
            data: [],
        }),
    };
});

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/hooks/useNavigation");

jest.mock("src/squads/syllabus/pages/Book/hooks/useDeleteLOs", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockDeleteLOs = jest.fn();
const mockUseDeleteLOs = () => {
    (useDeleteLOs as jest.Mock).mockImplementation(() => ({
        deleteLOs: mockDeleteLOs,
        isLoading: false,
    }));
};

const renderUtil = async () => {
    mockUseDeleteLOs();

    render(<ShowV2 />, { wrapper: TestAppWithQueryClient });
    expect(await screen.findByTestId("Breadcrumbs__entityName")).toBeInTheDocument();
};

const mockPushNavigation = jest.fn();
const mockUseNavigation = () => {
    (useNavigation as jest.Mock).mockImplementation(() => ({ push: mockPushNavigation }));
};

export const createLOData = (
    type: keyof typeof KeyLOTypes
): Pick<
    UseQueryBaseV2Return<Syllabus_LearningObjectivesOneQuery["learning_objectives"][0]>,
    "data"
> => ({
    data: {
        name: lOName,
        type,
        lo_id: "lo_id",
        school_id: 1,
    },
});

describe("LO detail page V2 render by LO type", () => {
    it("should render show LO current when feature flag is not enabled", async () => {
        (useFeatureToggle as jest.Mock).mockReturnValue({
            isEnabled: false,
        });

        (inferQuery as jest.Mock).mockImplementation(
            () => () => createLOData("LEARNING_OBJECTIVE_TYPE_LEARNING")
        );

        await renderUtil();
        expect(screen.getByTestId("LO_showCurrentVersion")).toBeInTheDocument();
    });

    it("should render flashcard v2 when type is FL and enabled feature flag", async () => {
        (useFeatureToggle as jest.Mock).mockReturnValue({
            isEnabled: true,
        });
        (inferQuery as jest.Mock).mockImplementation(
            () => () => createLOData("LEARNING_OBJECTIVE_TYPE_FLASH_CARD")
        );

        await renderUtil();

        expect(screen.getByTestId("FlashcardV2__show")).toBeInTheDocument();
    });
});

describe("LO detail page v2 test for header and action panel", () => {
    beforeEach(async () => {
        (useFeatureToggle as jest.Mock).mockReturnValue({
            isEnabled: true,
        });

        (inferQuery as jest.Mock).mockImplementation(
            () => () => createLOData("LEARNING_OBJECTIVE_TYPE_LEARNING")
        );

        await renderUtil();
    });

    it("should render header title", () => {
        expect(screen.getByTestId("WrapperPageHeader__root")).toBeInTheDocument();
        expect(screen.getByText(lOName, { selector: "h6" })).toBeInTheDocument();
    });

    it("should render action panel", () => {
        expect(screen.getByTestId("ActionPanel__root")).toBeInTheDocument();
    });

    it("should open and close EditV2 dialog from action panel", () => {
        const actionPanelBtn = screen.getByTestId("ActionPanel__trigger");
        fireEvent.click(actionPanelBtn);

        const btnEdit = screen
            .getByTestId("ActionPanel__popover--open")
            .querySelector("button:first-of-type")!;

        fireEvent.click(btnEdit);

        expect(screen.getByTestId("DialogFullScreen__dialog")).toBeInTheDocument();

        const btnClose = screen.getByTestId("FooterDialogConfirm__buttonClose");

        fireEvent.click(btnClose);

        expect(screen.queryByTestId("DialogFullScreen__dialog")).not.toBeInTheDocument();
    });
});

describe("LO detail page V2 test access page through by feature flag", () => {
    const features: Features[] = [
        Features.OFFLINE_STUDY_MANAGEMENT,
        Features.EXAM_LO_MANAGEMENT,
        Features.FLASHCARD_MANAGEMENT,
    ];

    const mapFeatureFlagWithLOType: {
        [key in Features]?: keyof typeof KeyLOTypes;
    } = {
        [Features.OFFLINE_STUDY_MANAGEMENT]: "LEARNING_OBJECTIVE_TYPE_OFFLINE_LEARNING",
        [Features.EXAM_LO_MANAGEMENT]: "LEARNING_OBJECTIVE_TYPE_EXAM_LO",
        [Features.FLASHCARD_MANAGEMENT]: "LEARNING_OBJECTIVE_TYPE_FLASH_CARD",
    };

    features.forEach((feature) => {
        const LOType = mapFeatureFlagWithLOType[feature];
        if (!LOType) throw new Error("Don't accept LOType is null list");

        it(`should redirect to 404 when LOType is ${LOType} and feature flag is disabled`, async () => {
            mockUseDeleteLOs();
            (useFeatureToggle as jest.Mock).mockImplementation((featurePassed: Features) => {
                if (feature === featurePassed) {
                    return {
                        isEnabled: false,
                    };
                }

                return {
                    isEnabled: true,
                };
            });
            (inferQuery as jest.Mock).mockImplementation(() => () => createLOData(LOType));

            render(
                <>
                    <ShowV2 />
                    <Route
                        path={"/page-not-found"}
                        render={() => <span data-testid="PageNotFound__custom" />}
                    />
                </>,
                { wrapper: TestAppWithQueryClient }
            );

            expect(screen.getByTestId("PageNotFound__custom")).toBeInTheDocument();
        });
    });
});

describe("LO detail page V2 navigate to exact path", () => {
    it("should navigate to book detail page after delete successfully", async () => {
        const mockExpectedPushHistory = `/syllabus/books/${mockBookId}/show`;
        mockUseNavigation();
        (useFeatureToggle as jest.Mock).mockReturnValue({
            isEnabled: true,
        });

        (inferQuery as jest.Mock).mockImplementation(
            () => () => createLOData("LEARNING_OBJECTIVE_TYPE_LEARNING")
        );

        await renderUtil();

        fireEvent.click(screen.getByTestId("ActionPanel__trigger"));
        fireEvent.click(screen.getByLabelText("ra.common.action.delete"));

        expect(screen.getByRole("dialog")).toHaveTextContent("ra.common.deleteDialogTitle");

        fireEvent.click(screen.getByLabelText("ra.common.action.confirm"));

        expect(mockDeleteLOs).toBeCalled();

        const [, options] = getCallParamsAt(mockDeleteLOs, 0);

        options.onSuccess();

        expect(mockPushNavigation).toBeCalledWith(mockExpectedPushHistory);
    });
});
