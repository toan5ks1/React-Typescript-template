import { Users_OrganizationsManyReferenceQueryVariables } from "src/squads/user/service/bob/bob-types";
import organizationsServiceBob from "src/squads/user/service/bob/organizations-service-bob";
import { defineService } from "src/squads/user/service/service-creator";

const locationService = defineService({
    query: {
        userGetManyOrganizationsReference: (
            variables: Users_OrganizationsManyReferenceQueryVariables
        ) => {
            return organizationsServiceBob.getOrganizationsManyReference(variables);
        },
    },
});

export default locationService;
