import { arrayHasItem } from "src/common/utils/other";
import { NsLesson_Bob_ClassesService } from "src/squads/lesson/service/bob/classes-service/types";
import { defineService } from "src/squads/lesson/service/service-creator";
import { InvalidParamError, MutationParams } from "src/squads/lesson/service/service-types";

import classModifierServiceBob from "src/squads/lesson/service/bob/classes-service/classes-modifier.mutation";

export const classesService = defineService({
    mutation: {
        classesConvertMedia: (
            variables: MutationParams<NsLesson_Bob_ClassesService.ConvertMedia>
        ) => {
            if (!arrayHasItem(variables.data?.mediaList)) {
                throw new InvalidParamError({
                    action: "classesConvertMedia",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "mediaList" }],
                });
            }

            return classModifierServiceBob.convertMedia(variables);
        },
    },
});
