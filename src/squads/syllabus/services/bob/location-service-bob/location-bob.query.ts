import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/syllabus/internals/hasura-client/execute-query";
import {
    Lesson_LocationIdsByCourseIdV2QueryVariables,
    Lesson_LocationIdsByCourseIdV2Query,
    LocationListByIdsQuery,
    LocationListByIdsQueryVariables,
} from "src/squads/syllabus/services/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/syllabus/services/service-types";

const getManyQuery = gql`
    query LocationListByIds($location_ids: [String!] = []) {
        locations(where: { location_id: { _in: $location_ids } }) {
            name
            location_id
        }
    }
`;

const getLocationIdsByCourseId = gql`
    query Lesson_LocationIdsByCourseIdV2($course: String = "") {
        get_locations_active_by_course_id(args: { course: $course }) {
            location_id
        }
    }
`;

class LocationQueryBob extends InheritedHasuraServiceClient {
    async getManyQuery(
        variables: LocationListByIdsQueryVariables
    ): Promise<LocationListByIdsQuery["locations"] | undefined> {
        const response = await this._call<LocationListByIdsQuery>({
            query: getManyQuery,
            variables,
        });

        return response.data?.locations;
    }

    async getLocationIdsByCourseId(
        variables: Lesson_LocationIdsByCourseIdV2QueryVariables
    ): Promise<
        Lesson_LocationIdsByCourseIdV2Query["get_locations_active_by_course_id"] | undefined
    > {
        const response = await this._call<Lesson_LocationIdsByCourseIdV2Query>({
            query: getLocationIdsByCourseId,
            variables,
        });

        return response.data?.get_locations_active_by_course_id;
    }
}

const locationQueryBob = new LocationQueryBob(appConfigs, "bobGraphQL", doQuery);

export default locationQueryBob;
