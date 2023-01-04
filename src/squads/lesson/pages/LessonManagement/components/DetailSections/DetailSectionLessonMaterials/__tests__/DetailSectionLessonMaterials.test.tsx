import { convertString } from "src/common/constants/helper";
import { toShortenStr } from "src/common/utils/other";
import { TestApp } from "src/squads/lesson/test-utils";
import { createMockMedia } from "src/squads/lesson/test-utils/lesson-management";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/react-hooks";

import DetailSectionLessonMaterials, {
    DetailSectionLessonMaterialsProps,
} from "src/squads/lesson/pages/LessonManagement/components/DetailSections/DetailSectionLessonMaterials";

import { render, screen } from "@testing-library/react";

const mockMediasList = createMockMedia();
describe("<LessonDetailsMaterials /> component renders", () => {
    const props: DetailSectionLessonMaterialsProps = {
        mediasList: mockMediasList,
        isLoadingMedias: false,
    };

    beforeEach(() => {
        render(
            <TestApp>
                <TestQueryWrapper>
                    <DetailSectionLessonMaterials {...props} />
                </TestQueryWrapper>
            </TestApp>
        );
    });

    it("should render Material Info title correctly", () => {
        expect(screen.getByTestId("LessonDetailsMaterials__root")).toBeInTheDocument();
        expect(screen.getByText("Material Info")).toBeInTheDocument();
    });

    it("should render media chips correctly", () => {
        expect(screen.getAllByTestId("ChipFileDescription")).toHaveLength(mockMediasList.length);

        mockMediasList.forEach((media) => {
            const shortenedMediaName = toShortenStr(convertString(media.name), 20);
            expect(screen.getByText(shortenedMediaName)).toBeInTheDocument();
        });
    });
});
