import { tagsService } from "src/squads/communication/service/bob/tags-services/tags-service";

import { coursesService } from "./bob/courses-service/courses-service";
import { infoNotificationMgsService } from "./bob/info-notification-msgs-service/info-notification-msgs-service";
import { infoNotificationsService } from "./bob/info-notifications-service/info-notifications-service";
import { mediaService } from "./bob/media-service/media-service";
import { questionnaireQuestionsService } from "./bob/questionnaire-questions-service/questionnaire-questions-service";
import { questionnaireUserAnswersService } from "./bob/questionnaire-user-answers-service/questionnaire-user-answers-service";
import { questionnairesService } from "./bob/questionnaires-service/questionnaires-service";
import { usersInfoNotificationsServices } from "./bob/users-info-notifications-service/users-info-notifications-service";
import { usersService } from "./bob/users-service/users-service";
import { infoNotificationsMgmtService } from "./notificationmgmt/info-notifications-notificationmgmt-service/info-notifications-notificationmgmt-service";
import standaloneQueryClient from "./standalone-query";
import { brightcoveService } from "./yasuo/brightcove-yasuo-service/brightcove-yasuo-service";

import {
    composeServices,
    createUseQuery,
    createUseQueryPagination,
    createUseQueryWithGRPCPagination,
} from "@manabie-com/react-utils";

// compose all services into service map
export const rootService = composeServices({
    brightcove: brightcoveService,
    infoNotifications: infoNotificationsService,
    infoNotificationMgs: infoNotificationMgsService,
    users: usersService,
    usersInfoNotifications: usersInfoNotificationsServices,
    courses: coursesService,
    media: mediaService,
    questionnaires: questionnairesService,
    questionnaireQuestions: questionnaireQuestionsService,
    questionnaireUserAnswers: questionnaireUserAnswersService,
    infoNotificationsMgmt: infoNotificationsMgmtService,
    tags: tagsService,
});

// infer typing for useQuery, we must use another infer layer because of typescript limitation
// else we will need to pass full generic on usage useQuery<A, B, C, D, E>().
export const inferQuery = createUseQuery(rootService);

export const inferQueryPagination = createUseQueryPagination(rootService);

export const inferQueryWithGRPCPagination = createUseQueryWithGRPCPagination(rootService);

export const inferStandaloneQuery = standaloneQueryClient.createStandaloneQuery(rootService);
