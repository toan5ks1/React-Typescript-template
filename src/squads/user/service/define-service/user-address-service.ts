import { Users_UserAddressByUserIdsQueryVariables } from "src/squads/user/service/bob/bob-types";
import userAddressQueriesBob from "src/squads/user/service/bob/user-address-service-bob";
import { defineService } from "src/squads/user/service/service-creator";

export interface GetOneUserAddressVariables {
    user_id: string;
}
const userAddressService = defineService({
    query: {
        userGetListUserAddress: (variables: Users_UserAddressByUserIdsQueryVariables) => {
            return userAddressQueriesBob.getList(variables);
        },
        userGetOneUserAddress: (variables: GetOneUserAddressVariables) => {
            const { user_id } = variables;
            return userAddressQueriesBob.getOne({ user_ids: [user_id] });
        },
    },
});

export default userAddressService;
