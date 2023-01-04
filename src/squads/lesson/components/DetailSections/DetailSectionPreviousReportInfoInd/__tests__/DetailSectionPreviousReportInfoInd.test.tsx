import { TestApp } from "src/squads/lesson/test-utils";
import {
    mockDynamicLessonReportData,
    mockFields,
} from "src/squads/lesson/test-utils/lesson-report";

import DetailSectionPreviousReportInfoInd, {
    DetailSectionPreviousReportInfoIndProps,
} from "src/squads/lesson/components/DetailSections/DetailSectionPreviousReportInfoInd";

import { render } from "@testing-library/react";

const renderDetailSectionPreviousReportInfoInd = (
    props: DetailSectionPreviousReportInfoIndProps
) => {
    return render(
        <TestApp>
            <DetailSectionPreviousReportInfoInd {...props} />
        </TestApp>
    );
};

describe("<DetailSectionPreviousReportInfoInd />", () => {
    it("should render fields and values correctly", () => {
        const props: DetailSectionPreviousReportInfoIndProps = {
            fields: mockFields,
            dynamicLessonReportData: mockDynamicLessonReportData,
        };
        const wrapper = renderDetailSectionPreviousReportInfoInd(props);

        expect(wrapper.getByText("Attendance")).toBeInTheDocument();

        expect(
            wrapper.getByTestId("DynamicLabelAttendanceStatus__typographyLabel")
        ).toHaveTextContent("Attendance Status");
        expect(
            wrapper.getByTestId("DynamicLabelAttendanceStatus__typographyValue")
        ).toHaveTextContent("Absent");

        expect(
            wrapper.getByTestId("DynamicLabelAttendanceRemark__typographyLabel")
        ).toHaveTextContent("Remark");
        expect(
            wrapper.getByTestId("DynamicLabelAttendanceRemark__typographyValue")
        ).toHaveTextContent("not good");

        expect(wrapper.getByTestId("DynamicLabelBase__typographyLabel")).toHaveTextContent(
            "Homework Status"
        );
        expect(wrapper.getByTestId("DynamicLabelBase__typographyValue")).toHaveTextContent(
            "Completed"
        );
    });

    it("should render null when there isn't any field", () => {
        const props: DetailSectionPreviousReportInfoIndProps = {
            fields: [],
            dynamicLessonReportData: [],
        };
        const wrapper = renderDetailSectionPreviousReportInfoInd(props);
        expect(wrapper.container.children).toHaveLength(0);
    });
});
