import { Features, ModeOpenDialog } from "src/common/constants/enum";
import { mockFlatLocations } from "src/squads/syllabus/test-utils/locations";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";
import { checkErrorMessage } from "src/squads/syllabus/test-utils/utils";

import { CourseTeachingMethodOption } from "../../CourseForm";
import DialogUpsertCourse, { DialogUpsertCourseProps } from "../DialogUpsertCourse";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

const onClose = jest.fn();
const onSave = jest.fn();

jest.mock("src/squads/syllabus/hooks/useFeatureToggle", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});
const mockUseFeatureToggle = (allowRemoveLocation: boolean, enabledTeachingMethod: boolean) => {
    (useFeatureToggle as jest.Mock).mockImplementation(
        (...hookParams: Parameters<typeof useFeatureToggle>) => {
            const [toggleName] = hookParams;

            switch (toggleName) {
                case Features.LESSON_COURSE_MANAGEMENT_REMOVE_COURSE_LOCATION:
                    return { isEnabled: allowRemoveLocation };
                case Features.LESSON_COURSE_BACK_OFFICE_TEACHING_METHOD:
                    return { isEnabled: enabledTeachingMethod };

                default:
                    return { isEnabled: true };
            }
        }
    );
};

const mockTeachingMethodOption: CourseTeachingMethodOption = {
    id: 1,
    name: "COURSE_TEACHING_METHOD_INDIVIDUAL",
};

const renderUtil = (
    overrideProps: Partial<DialogUpsertCourseProps> = {},
    featureToggle?: { allowRemoveLocation: boolean; enabledTeachingMethod: boolean }
) => {
    const defaultProps: DialogUpsertCourseProps = {
        onClose,
        onSave,
        open: true,
        ...overrideProps,
    };

    mockUseFeatureToggle(
        featureToggle?.allowRemoveLocation || false,
        featureToggle?.enabledTeachingMethod || false
    );
    render(
        <TestThemeProvider>
            <DialogUpsertCourse {...defaultProps} />
        </TestThemeProvider>
    );
};

const saveCourse = () => {
    const buttonSave = screen.getByTestId("FooterDialogConfirm__buttonSave");
    userEvent.click(buttonSave);
};

const closeUpsertCourse = () => {
    const buttonSave = screen.getByTestId("FooterDialogConfirm__buttonClose");
    userEvent.click(buttonSave);
};

describe(`${DialogUpsertCourse.name} without teaching method `, () => {
    it("should render title correct with create mode", async () => {
        renderUtil();
        expect(screen.getByText("resources.courses.addCourse")).toBeInTheDocument();
    });

    it("should render correct with edit mode", () => {
        const courseName = "Course name will be update";
        const iconUrl = "https://image_link";

        renderUtil({
            mode: ModeOpenDialog.EDIT,
            defaultValues: { name: courseName, iconUrl, locations: mockFlatLocations },
        });

        expect(screen.getByTestId("AvatarInput__delete")).toBeInTheDocument();
        expect(screen.getByText("resources.courses.editTitle")).toBeInTheDocument();
        expect(screen.getByTestId("AvatarInput__root")).toHaveStyle(
            `background-image: url(${iconUrl})`
        );
    });
});

describe(`${DialogUpsertCourse.name} handle form action correctly`, () => {
    it("should disabled button submit while submitting", () => {
        renderUtil({
            mode: ModeOpenDialog.ADD,
            isSubmiting: true,
        });
        const buttonSave = screen.getByTestId("FooterDialogConfirm__buttonSave");
        expect(buttonSave).toBeDisabled();
    });
});

describe(`${DialogUpsertCourse.name} with teaching method`, () => {
    it("should render correct with create mode", async () => {
        renderUtil(
            {
                mode: ModeOpenDialog.ADD,
            },
            { allowRemoveLocation: false, enabledTeachingMethod: true }
        );

        expect(screen.getByText("resources.courses.addCourse")).toBeInTheDocument();
        saveCourse();

        await checkErrorMessage(3, "resources.input.error.required");
        expect(onSave).not.toBeCalled();

        closeUpsertCourse();
        await waitFor(() => expect(onClose).toBeCalled());
    });

    it("should render correct with edit mode", async () => {
        const courseName = "Course name will be update";
        const iconUrl = "https://image_link";

        renderUtil(
            {
                mode: ModeOpenDialog.EDIT,
                defaultValues: {
                    name: courseName,
                    iconUrl,
                    locations: mockFlatLocations,
                    teachingMethod: mockTeachingMethodOption,
                },
            },
            { allowRemoveLocation: false, enabledTeachingMethod: true }
        );

        expect(screen.getByTestId("AvatarInput__delete")).toBeInTheDocument();
        expect(screen.getByText("resources.courses.editTitle")).toBeInTheDocument();
        expect(screen.getByTestId("AvatarInput__root")).toHaveStyle(
            `background-image: url(${iconUrl})`
        );

        const centerChips = screen.queryAllByTestId("LocationSelectInputHF__chipTag");
        const isChipsContainLocationNames = centerChips.every(
            (chip) => chip.textContent && ["location 1", "location 2"].includes(chip.textContent)
        );
        expect(isChipsContainLocationNames).toEqual(true);

        saveCourse();

        await waitFor(() => {
            const [payload] = getLatestCallParams(onSave);
            expect(payload).toMatchObject({
                iconUrl: "https://image_link",
                name: "Course name will be update",
                locations: mockFlatLocations,
                teachingMethod: mockTeachingMethodOption,
            });
        });
    });
});

describe(`${DialogUpsertCourse.name} edit location`, () => {
    const courseName = "Course name will be update";
    const iconUrl = "https://image_link";

    it("should can't remove location", async () => {
        renderUtil(
            {
                mode: ModeOpenDialog.EDIT,
                defaultValues: { name: courseName, iconUrl, locations: mockFlatLocations },
            },
            { allowRemoveLocation: false, enabledTeachingMethod: false }
        );

        await waitFor(() => {
            expect(screen.queryByTitle("Clear")).toBeNull();
        });
    });

    it("should remove location", async () => {
        renderUtil(
            {
                mode: ModeOpenDialog.EDIT,
                defaultValues: { name: courseName, iconUrl, locations: mockFlatLocations },
            },
            { allowRemoveLocation: true, enabledTeachingMethod: false }
        );

        const clearLocationBtn = screen.getByTitle("Clear");
        userEvent.click(clearLocationBtn);

        const allLocationChips = screen.queryAllByTestId("LocationSelectInputHF__tagBox");
        expect(allLocationChips).toHaveLength(0);

        saveCourse();

        await checkErrorMessage(0, "resources.input.error.required");
    });
});
