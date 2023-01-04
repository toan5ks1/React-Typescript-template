import { UserByEmailQueryVariables } from "src/squads/user/service/bob/bob-types";
import { userQueriesBob } from "src/squads/user/service/bob/user-service-bob";
import { defineService } from "src/squads/user/service/service-creator";
import { ListQuery } from "src/squads/user/service/service-types";

const userService = defineService({
    query: {
        userGetOneUserByEmailOrPhone: (variables: ListQuery<UserByEmailQueryVariables>) => {
            const { email, phone_number, user_id } = variables.filter!;

            return userQueriesBob.getOne({ email, phone_number, user_id });
        },
    },
});

export default userService;
