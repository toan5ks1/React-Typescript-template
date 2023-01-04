import pick from "lodash/pick";

import { useStudyPlanItemTableColumns, UseStudyPlanItemTableColumnsProps } from "..";

import { renderHook } from "@testing-library/react-hooks";
import TestHookFormProvider from "src/squads/syllabus/test-utils/TestHookFormProvider";

const defaultProps: UseStudyPlanItemTableColumnsProps = {
    classes: {
        padding: "padding",
        topicColumn: "topicColumn",
        topicEditColumn: "topicEditColumn",
        loNameColumn: "loNameColumn",
        dateColumn: "dateColumn",
        dateEditColumn: "dateEditColumn",
        visibilityEditColumn: "visibilityEditColumn",
    },

    isEditing: false,
};

describe(useStudyPlanItemTableColumns.name, () => {
    it("should return columns for table view mode", () => {
        const { result } = renderHook<
            UseStudyPlanItemTableColumnsProps,
            ReturnType<typeof useStudyPlanItemTableColumns>
        >(
            () =>
                useStudyPlanItemTableColumns({
                    ...defaultProps,
                    classes: pick(defaultProps.classes, [
                        "topicColumn",
                        "loNameColumn",
                        "dateColumn",
                    ]),
                }),
            { wrapper: TestHookFormProvider }
        );
        const { classes } = defaultProps;
        const expectedResult: ReturnType<typeof useStudyPlanItemTableColumns> = [
            {
                key: "colTopicName",
                title: "resources.topics.topicName",
                cellProps: {
                    className: classes.topicColumn,
                    "data-testid": "StudyPlanItemTableColumns__topicName",
                },
            },
            {
                key: "colLoName",
                title: "resources.courses.studyPlan.loName",
                cellProps: {
                    className: classes.loNameColumn,
                    "data-testid": "StudyPlanItemTableColumns__loName",
                },
                render: () => "",
            },
            {
                key: "colAvailableFrom",
                title: "resources.courses.studyPlan.availableFrom",
                cellProps: {
                    className: classes.dateColumn,
                    "data-testid": "StudyPlanItemTableColumns__availableFrom",
                },
                render: () => "",
            },
            {
                key: "colAvailableUntil",
                title: "resources.courses.studyPlan.availableUntil",
                cellProps: {
                    className: classes.dateColumn,
                    "data-testid": "StudyPlanItemTableColumns__availableUntil",
                },
                render: () => "",
            },
            {
                key: "colStart",
                title: "resources.study_plans.columns.start",
                cellProps: {
                    className: classes.dateColumn,
                    "data-testid": "StudyPlanItemTableColumns__startDate",
                },
                render: () => "",
            },
            {
                key: "colDue",
                title: "resources.study_plans.columns.due",
                cellProps: {
                    className: classes.dateColumn,
                    "data-testid": "StudyPlanItemTableColumns__endDate",
                },
                render: () => "",
            },
        ];

        expect(JSON.stringify(result.current)).toEqual(JSON.stringify(expectedResult));
    });

    it("should return columns for table edit mode", () => {
        const { result } = renderHook<
            UseStudyPlanItemTableColumnsProps,
            ReturnType<typeof useStudyPlanItemTableColumns>
        >(
            () =>
                useStudyPlanItemTableColumns({
                    ...defaultProps,
                    classes: pick(defaultProps.classes, [
                        "padding",
                        "topicEditColumn",
                        "dateEditColumn",
                        "visibilityEditColumn",
                    ]),
                    isEditing: true,
                }),
            { wrapper: TestHookFormProvider }
        );
        const { classes } = defaultProps;
        const expectedResult: ReturnType<typeof useStudyPlanItemTableColumns> = [
            {
                key: "colTopicNameEdit",
                title: "resources.topics.topicName",
                cellProps: {
                    className: classes.topicEditColumn,
                    "data-testid": "StudyPlanItemTableColumns__topicName",
                },
            },
            {
                key: "colLoNameEdit",
                title: "resources.courses.studyPlan.loName",
                cellProps: {
                    className: classes.padding,
                    "data-testid": "StudyPlanItemTableColumns__loName",
                },
                render: () => "",
            },
            {
                key: "colAvailableFromEdit",
                title: "resources.courses.studyPlan.availableFrom",
                cellProps: {
                    className: `${classes.padding} ${classes.dateEditColumn}`,
                    "data-testid": "StudyPlanItemTableColumns__availableFrom",
                },
                render: () => "",
            },
            {
                key: "colAvailableUntilEdit",
                title: "resources.courses.studyPlan.availableUntil",
                cellProps: {
                    className: `${classes.padding} ${classes.dateEditColumn}`,
                    "data-testid": "StudyPlanItemTableColumns__availableUntil",
                },
                render: () => "",
            },
            {
                key: "colStartEdit",
                title: "resources.study_plans.columns.start",
                cellProps: {
                    className: `${classes.padding} ${classes.dateEditColumn}`,
                    "data-testid": "StudyPlanItemTableColumns__startDate",
                },
                render: () => "",
            },
            {
                key: "colDueEdit",
                title: "resources.study_plans.columns.due",
                cellProps: {
                    className: `${classes.padding} ${classes.dateEditColumn}`,
                    "data-testid": "StudyPlanItemTableColumns__endDate",
                },
                render: () => "",
            },
            {
                key: "colVisibilityEdit",
                title: "ra.action.show",
                cellProps: {
                    className: `${classes.padding} ${classes.visibilityEditColumn}`,
                    sx: {},
                },
                render: () => "",
            },
            {
                key: "colContentStructure",
                cellProps: { style: { display: "none" } },
                render: () => "",
            },
        ];

        expect(JSON.stringify(result.current)).toEqual(JSON.stringify(expectedResult));
    });
});
