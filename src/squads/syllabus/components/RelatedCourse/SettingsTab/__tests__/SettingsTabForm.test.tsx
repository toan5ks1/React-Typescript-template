import { PropsWithChildren } from "react";

import { Features } from "src/common/constants/enum";
import { convertToString } from "src/squads/syllabus/common/utils/utils";
import inferMutation from "src/squads/syllabus/services/infer-mutation";

import SettingsTabForm, { getLocationsList, SettingsTabFormProps } from "../SettingsTabForm";

import { fireEvent, render, RenderResult, screen, waitFor, within } from "@testing-library/react";
import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";
import TestApp from "src/squads/syllabus/test-utils/TestApp";
import TestHookFormProvider from "src/squads/syllabus/test-utils/TestHookFormProvider";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => jest.fn(),
}));

const mockUploadAvatar = jest.fn();

jest.mock("src/squads/syllabus/services/infer-mutation", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const defaultProps: SettingsTabFormProps = {
    course: {
        course_books: [],
        name: "Course 01",
        course_id: "abc",
        icon: "",
        school_id: 1,
    },
    isLoadingLocation: false,
    locations: [
        { location_id: "location_id_1", name: "Center 1" },
        { location_id: "location_id_2", name: "Center 2" },
    ],
    refetch: jest.fn(),
};

const renderComponent = (enableTeachingMethod: boolean = true, enableLocation: boolean = true) => {
    (inferMutation as jest.Mock).mockImplementation(
        (_inferredBase: { entity: "coursesYasuo"; action: "courseCreate" }) => {
            return () => ({ mutate: mockUploadAvatar });
        }
    );
    (useFeatureToggle as jest.Mock).mockImplementation((feature: Features) => {
        let enable: boolean = false;
        switch (feature) {
            case Features.LESSON_COURSE_BACK_OFFICE_TEACHING_METHOD:
                enable = enableTeachingMethod;
                break;
            case Features.LESSON_COURSE_DETAIL_BACK_OFFICE_LOCATION_FIELD:
                enable = enableLocation;
                break;
            default:
                break;
        }
        return {
            isEnabled: enable,
        };
    });

    return render(<SettingsTabForm {...defaultProps} />, {
        wrapper: ({ children }: PropsWithChildren<{}>) => (
            <TestApp>
                <TestHookFormProvider>{children}</TestHookFormProvider>
            </TestApp>
        ),
    });
};

describe("<SettingsTabForm/> in course enabledTeachingMethod true", () => {
    let wrapper: RenderResult;
    beforeEach(() => {
        wrapper = renderComponent();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should show correctly course name", () => {
        const courseName = screen.getByTestId("SettingsTabForm__courseName");
        expect(within(courseName).getByText(defaultProps.course.name)).toBeTruthy();
    });

    it("should call mockUploadAvatar function when upload avatar for course", async () => {
        expect(screen.getByTestId("AvatarInput__labelHtmlFor")).toBeInTheDocument();
        const uploader = screen.getByTestId("AvatarInput__input");
        const file = new File(["(⌐□_□)"], "avatar.png", { type: "image/png" });
        expect(uploader).toBeInTheDocument();

        fireEvent.change(uploader, {
            target: { files: [file] },
        });

        await waitFor(() =>
            expect(screen.getByTestId("AvatarInput__root").style.backgroundImage).not.toEqual(
                "undefined"
            )
        );
        expect(mockUploadAvatar).toHaveBeenCalled();
    });

    it("should not call mockUploadAvatar function when upload empty file", async () => {
        expect(screen.getByTestId("AvatarInput__labelHtmlFor")).toBeInTheDocument();
        const uploader = screen.getByTestId("AvatarInput__input");
        expect(uploader).toBeInTheDocument();

        fireEvent.change(uploader, { target: { files: [] } });

        await waitFor(() =>
            expect(screen.getByTestId("AvatarInput__root").style.backgroundImage).toEqual("none")
        );
        expect(mockUploadAvatar).not.toHaveBeenCalled();
    });

    it("should show locations name correctly", () => {
        const locationNames = getLocationsList(defaultProps.locations);
        expect(screen.getByText(convertToString(locationNames))).toBeInTheDocument();
    });

    it("should show teaching method field", () => {
        expect(screen.getByTestId("SettingsTabForm__teachingMethod")).toBeInTheDocument();
    });
});

describe("<SettingsTabForm/> in course with unleash flag", () => {
    it("should render correctly with teaching method unleash key false", () => {
        renderComponent(false, true);
        expect(screen.queryByTestId("SettingsTabForm__teachingMethod")).not.toBeInTheDocument();
    });

    it("should render correctly with location unleash key false", () => {
        renderComponent(true, false);
        expect(screen.queryByTestId("SettingsTabForm__locationsName")).not.toBeInTheDocument();
    });
});
