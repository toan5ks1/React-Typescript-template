import { defineService } from "@manabie-com/react-utils";
import masterReaderServiceBob from "src/squads/architecture/service/bob/master-reader-service/master-reader-bob.mutation";

export const masterReaderService = defineService({
    query: {
        retrieveLocations: () => {
            return masterReaderServiceBob.retrieveLocations();
        },
        retrieveLocationTypes: () => {
            return masterReaderServiceBob.retrieveLocationTypes();
        },
    },
});
