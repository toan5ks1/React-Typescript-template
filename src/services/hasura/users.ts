import { ProviderTypes } from "../../common/constants/enum";
import { arrayHasItem } from "../../common/utils/other";
import { userQueriesBob } from "../bob/user-service-bob";
import { ListQuery } from "../service-types";
import { createEmptyResponse, getEmptyResponse } from "../utils";

type Params =
    | {
          type: ProviderTypes.GET_USERNAMES;
          payload: ListQuery<Parameters<typeof userQueriesBob.getUserNameList>[0]>;
      }
    | {
          type: ProviderTypes.MANY;
          payload: Parameters<typeof userQueriesBob.getMany>[0] & {
              ids?: string[];
          };
      }
    | {
          type: ProviderTypes.TITLE;
          payload: Parameters<typeof userQueriesBob.getTitle>[0] & {
              id?: string;
          };
      }
    | {
          type: ProviderTypes.ONE;
          payload: ListQuery<Parameters<typeof userQueriesBob.getOne>[0]>;
      };

export default (params: Params) => {
    switch (params.type) {
        case ProviderTypes.MANY: {
            const { user_id, ids } = params.payload;
            return userQueriesBob.getMany({ user_id: user_id || ids! });
        }

        case ProviderTypes.TITLE: {
            const { user_id, id } = params.payload;
            return userQueriesBob.getTitle({ user_id: user_id || id! });
        }
        case ProviderTypes.ONE: {
            const { filter } = params.payload;
            const { email, phone_number, user_id } = filter!;
            if (!email && !phone_number && !user_id) {
                return createEmptyResponse({ data: [] });
            }
            return userQueriesBob.getOne({ email, phone_number, user_id });
        }
        case ProviderTypes.GET_USERNAMES: {
            const { filter } = params.payload;
            const { user_id } = filter!;

            if (!arrayHasItem(user_id)) {
                return createEmptyResponse({ data: [] });
            }

            return userQueriesBob.getUserNameList({ user_id });
        }
        default: {
            return getEmptyResponse();
        }
    }
};
