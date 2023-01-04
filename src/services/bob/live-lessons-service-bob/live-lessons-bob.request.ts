import { toTimestampEndDate, toTimestampStartDate } from "src/common/utils/timezone";

import { RetrieveLessonsFilter, RetrieveLessonsRequest } from "manabuf/bob/v1/lessons_pb";
import { Paging } from "manabuf/common/v1/requests_pb";

export function newRetrieveLessonReq(
    data: RetrieveLessonsRequest.AsObject
): RetrieveLessonsRequest {
    const req = new RetrieveLessonsRequest();

    const pagingObj = new Paging();
    pagingObj.setLimit(data.paging!.limit);
    pagingObj.setOffsetTime(data.paging!.offsetTime);
    pagingObj.setOffsetInteger(data.paging!.offsetInteger);
    pagingObj.setOffsetString(data.paging!.offsetString);

    const filterObj = new RetrieveLessonsFilter();
    filterObj.setCourseIdsList(data.filter!.courseIdsList);
    filterObj.setLessonStatusList(data.filter!.lessonStatusList);

    const startTime = data.filter?.startTime;
    if (startTime) {
        const time = toTimestampStartDate(startTime);

        filterObj.setStartTime(time);
    } else {
        filterObj.setStartTime(null);
    }

    const endTime = data.filter?.endTime;
    if (endTime) {
        const time = toTimestampEndDate(endTime);

        filterObj.setEndTime(time);
    } else {
        filterObj.setEndTime(null);
    }

    req.setFilter(filterObj);
    req.setPaging(pagingObj);
    req.setKeyword(data.keyword);

    return req;
}

export function newCreateClassReq() {
    // TODO: Implement create request for live lessons
    // data: Required<NsBobLessonsService.CreateLessons>
    // const req = new CreateLiveLessonRequest();
    // return req;
}
