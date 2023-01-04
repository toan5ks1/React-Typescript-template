import { defineService } from "src/squads/syllabus/services/service-creator";

import masterReaderServiceBob from "src/squads/syllabus/services/bob/master-reader-service/master-data-reader.mutation";

const masterReaderService = defineService({
    query: {
        masterReaderGetLocation: () => {
            return masterReaderServiceBob.retrieveLocations();
        },
    },
});

export default masterReaderService;
