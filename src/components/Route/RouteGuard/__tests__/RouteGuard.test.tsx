import { MemoryRouter } from "react-router";
import { Entities, Features } from "src/common/constants/enum";
import permission from "src/internals/permission";
import { ResourceActions } from "src/models/resource";

import RouteGuard from "../RouteGuard";

import { render, screen } from "@testing-library/react";
import { mockUseFeatureController } from "src/test-utils/useFeatureController";

jest.mock("src/internals/permission", () => {
    const originalModule = jest.requireActual("src/internals/permission");
    return {
        ...originalModule,
        can: jest.fn(originalModule.can),
    };
});

jest.mock("src/app/useFeatureController", () => jest.fn());
describe(RouteGuard.name, () => {
    it("should allow route when permission and feature flag are not passed", () => {
        mockUseFeatureController();

        render(
            <MemoryRouter initialEntries={["/syllabus/home"]}>
                <RouteGuard
                    path="/syllabus/home"
                    render={() => <span data-testid="Home__page">HOME</span>}
                />
            </MemoryRouter>
        );
        expect(screen.getByTestId("Home__page")).toBeInTheDocument();
    });

    it("should deny route when permission is denied", () => {
        (permission.can as jest.Mock).mockReturnValue(false);
        mockUseFeatureController();

        render(
            <MemoryRouter initialEntries={["/syllabus/course"]}>
                <RouteGuard
                    path="/syllabus/course"
                    render={() => <span data-testid="Course__page">COURSES</span>}
                    permissionConfigs={{
                        subject: Entities.COURSES,
                        action: ResourceActions.SHOW,
                    }}
                />
            </MemoryRouter>
        );
        expect(screen.queryByTestId("Course__page")).not.toBeInTheDocument();
    });

    it("should allow route when permission is allowed", () => {
        (permission.can as jest.Mock).mockReturnValue(true);
        mockUseFeatureController();

        render(
            <MemoryRouter initialEntries={["/syllabus/course"]}>
                <RouteGuard
                    path="/syllabus/course"
                    render={() => <span data-testid="Course__page">COURSES</span>}
                    permissionConfigs={{
                        subject: Entities.COURSES,
                        action: ResourceActions.SHOW,
                    }}
                />
            </MemoryRouter>
        );
        expect(screen.queryByTestId("Course__page")).toBeInTheDocument();
    });

    it("should deny route when feature flag is denied", () => {
        (permission.can as jest.Mock).mockReturnValue(true);

        mockUseFeatureController({ get: () => false });

        const { container } = render(
            <MemoryRouter initialEntries={["/syllabus/books"]}>
                <RouteGuard
                    path="/syllabus/books"
                    render={() => <span data-testid="Book__page">BOOKS</span>}
                    featureConfigs={{
                        feature: Features.LESSON_MANAGEMENT,
                    }}
                />
            </MemoryRouter>
        );

        expect(container).toBeEmptyDOMElement();
    });

    it("should allow route when feature flag is enabled", () => {
        (permission.can as jest.Mock).mockReturnValue(false);

        mockUseFeatureController({ get: () => true });

        render(
            <MemoryRouter initialEntries={["/syllabus/books"]}>
                <RouteGuard
                    path="/syllabus/books"
                    render={() => <span data-testid="Book__page">BOOKS</span>}
                    featureConfigs={{
                        feature: Features.LESSON_MANAGEMENT,
                    }}
                />
            </MemoryRouter>
        );
        expect(screen.getByTestId("Book__page")).toBeInTheDocument();
    });

    it("should deny when feature flag and permission are not allowed", () => {
        (permission.can as jest.Mock).mockReturnValue(false);

        mockUseFeatureController({ get: () => false });

        const { container } = render(
            <MemoryRouter initialEntries={["/syllabus/books"]}>
                <RouteGuard
                    path="/syllabus/books"
                    render={() => <span data-testid="Book__page">BOOKS</span>}
                    featureConfigs={{
                        feature: Features.LESSON_MANAGEMENT,
                    }}
                    permissionConfigs={{
                        subject: Entities.BOOKS,
                        action: ResourceActions.SHOW,
                    }}
                />
            </MemoryRouter>
        );

        expect(container).toBeEmptyDOMElement();
    });
});
