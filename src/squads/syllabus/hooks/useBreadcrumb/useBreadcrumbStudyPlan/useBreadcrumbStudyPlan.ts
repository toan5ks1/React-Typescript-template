import { useMemo } from "react";

import { useLocation } from "react-router";
import { Entities, SearchEngine } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import { UseBreadcrumbReturn, genBreadcrumbVariables, MapperBreadCrumbParams } from "../common";

const mapper: MapperBreadCrumbParams<"course"> = {
    course: {
        resource: Entities.COURSES,
        query: SearchEngine.COURSE_ID,
        basename: MicroFrontendTypes.SYLLABUS,
    },
};

interface UseBreadcrumbStudyPlanReturn extends UseBreadcrumbReturn {}

const useBreadcrumbStudyPlan = (): UseBreadcrumbStudyPlanReturn => {
    const { search } = useLocation();

    const { course } = useMemo(() => {
        return genBreadcrumbVariables(search, mapper);
    }, [search]);

    const { isLoading, data: courseData } = inferQuery({
        entity: "courses",
        action: "syllabusCourseGetTitle",
    })(
        {
            course_id: course.id || "",
        },
        {
            enabled: Boolean(course.id),
        }
    );

    return {
        loading: isLoading,
        breadcrumbInfos: [
            {
                url: `/${MicroFrontendTypes.SYLLABUS}/${Entities.COURSES}`,
                translateKey: `resources.${Entities.COURSES}.name`,
            },
            {
                url: `/${MicroFrontendTypes.SYLLABUS}/${Entities.COURSES}/${course.id}/show`,
                name: courseData?.name,
                translateKey: `resources.${Entities.COURSES}.name`,
            },
        ],
    };
};

export default useBreadcrumbStudyPlan;
