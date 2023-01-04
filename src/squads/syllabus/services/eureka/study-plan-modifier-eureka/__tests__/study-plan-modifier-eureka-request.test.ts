import { convertDateStringToTimestamp } from "src/common/utils/timezone";

import {
    createRequestContentStructure,
    createUpsertStudyPlanItemsRequest,
    createUpsertStudyPlanRequest,
} from "../study-plan-modifier-eureka-request";
import { NsEurekaStudyPlanModifierService } from "../types";
import { createMockDataUpsertStudyPlan, createMockDataUpsertStudyPlanItem } from "./data";

describe(createUpsertStudyPlanRequest.name, () => {
    it("should create correct update request with full information", () => {
        const upsertPayload = createMockDataUpsertStudyPlan({
            studyPlanId: { value: "studyPlanId" },
        });
        expect(createUpsertStudyPlanRequest(upsertPayload).toObject()).toEqual(upsertPayload);
    });

    it("should create correct request when missing study plan id", () => {
        const payloadMissingId = createMockDataUpsertStudyPlan({
            studyPlanId: undefined,
        });
        expect(createUpsertStudyPlanRequest(payloadMissingId).toObject()).toEqual(payloadMissingId);
    });
});

describe(createUpsertStudyPlanItemsRequest.name, () => {
    it("should create correct request corresponding times", () => {
        const availableFrom = "2021/10/10, 00:00";
        const availableTo = "2022/01/01, 00:00";
        const startDate = "2021/02/02, 00:00";
        const endDate = "2021/12/12, 00:00";

        const studyPlanItem = createMockDataUpsertStudyPlanItem({
            availableFrom,
            availableTo,
            startDate,
            endDate,
        });
        const studyPlanItems = [studyPlanItem];

        const request = createUpsertStudyPlanItemsRequest(studyPlanItems);

        const requestItem = request.toObject().studyPlanItemsList[0];

        expect(requestItem.availableFrom).toEqual(
            convertDateStringToTimestamp(availableFrom, "yyyy/LL/dd, HH:mm").toObject()
        );

        expect(requestItem.availableTo).toEqual(
            convertDateStringToTimestamp(availableTo, "yyyy/LL/dd, HH:mm").toObject()
        );

        expect(requestItem.startDate).toEqual(
            convertDateStringToTimestamp(startDate, "yyyy/LL/dd, HH:mm").toObject()
        );

        expect(requestItem.endDate).toEqual(
            convertDateStringToTimestamp(endDate, "yyyy/LL/dd, HH:mm").toObject()
        );
    });
});

describe(createRequestContentStructure.name, () => {
    it("should create correct request for item is learning objective", () => {
        const lOId = "LearningObjective01";
        const studyPlanItem = createMockDataUpsertStudyPlanItem(
            {},
            {
                contentStructure: {
                    loId: { value: lOId },
                },
            }
        );

        const { contentStructure } = studyPlanItem;

        const request = createRequestContentStructure(studyPlanItem.contentStructure);

        expect(request.toObject()).toEqual<
            NsEurekaStudyPlanModifierService.UpsertStudyPlanItem["contentStructure"]
        >({
            ...contentStructure,
            loId: { value: lOId },
            assignmentId: undefined,
        });
    });

    it("should create correct request for item is assignment", () => {
        const assignmentId = "assignmentId01";

        const studyPlanItem = createMockDataUpsertStudyPlanItem(
            {},
            {
                contentStructure: {
                    assignmentId: { value: assignmentId },
                },
            }
        );

        const { contentStructure } = studyPlanItem;

        const request = createRequestContentStructure(studyPlanItem.contentStructure);

        expect(request.toObject()).toEqual<
            NsEurekaStudyPlanModifierService.UpsertStudyPlanItem["contentStructure"]
        >({
            ...contentStructure,
            assignmentId: { value: assignmentId },
            loId: undefined,
        });
    });
});
