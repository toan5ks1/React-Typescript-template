import uploadReaderServiceBob, {
    classServiceClientBob,
} from "src/services/bob/upload-reader-service-bob";
import { RaSort } from "src/typings/react-admin";

import { ProviderTypes } from "../../common/constants/enum";
import { arrayHasItem } from "../../common/utils/other";
import { mediaQueriesBob } from "../bob/media-service-bob";
import { AppPagination, ListQuery } from "../service-types";
import { calcGqlPagination, createEmptyResponse, getEmptyResponse } from "../utils";

type Params =
    | {
          type: ProviderTypes.ONE;
          payload: Parameters<typeof mediaQueriesBob.getOne>[0] & {
              id?: string;
          };
      }
    | {
          type: ProviderTypes.MANY;
          payload: ListQuery<Parameters<typeof mediaQueriesBob.getMany>[0]> & {
              ids?: string[];
          };
      }
    | {
          type: ProviderTypes.LIST;
          payload: ListQuery<
              Parameters<typeof mediaQueriesBob.getList>[0],
              RaSort | RaSort[],
              AppPagination
          >;
      }
    | {
          type: ProviderTypes.CREATE;
          payload: {
              data: Parameters<typeof classServiceClientBob.upsertMedia>[0];
          };
      }
    | {
          type: ProviderTypes.UPLOAD_BRIGHTCOVE;
          payload: {
              data: Parameters<typeof uploadReaderServiceBob.uploadBrightcove>[0];
          };
      }
    | {
          type: ProviderTypes.UPLOAD_FILES;
          payload: {
              data: Parameters<typeof uploadReaderServiceBob.filterAndUploadFiles>[0];
          };
      };

const hasuraMedia = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.ONE: {
            const { id, media_id } = params.payload;
            return mediaQueriesBob.getOne({ media_id: id || media_id! });
        }
        case ProviderTypes.MANY: {
            const { filter, ids } = params.payload;

            if (!arrayHasItem(filter?.media_id) && !arrayHasItem(ids)) {
                return createEmptyResponse({ data: null });
            }

            return mediaQueriesBob.getMany({ media_id: ids || filter?.media_id });
        }

        case ProviderTypes.LIST: {
            const { filter, pagination } = params.payload;
            const { media_id, converted_images, type, resource, comments } = filter!;
            const { limit, offset } = calcGqlPagination(pagination);
            return mediaQueriesBob.getList({
                limit,
                offset,
                media_id,
                converted_images,
                type,
                resource,
                comments,
            });
        }

        case ProviderTypes.CREATE: {
            return classServiceClientBob.upsertMedia(params.payload.data);
        }
        case ProviderTypes.UPLOAD_BRIGHTCOVE: {
            return uploadReaderServiceBob.uploadBrightcove(params.payload.data);
        }
        case ProviderTypes.UPLOAD_FILES: {
            return uploadReaderServiceBob.filterAndUploadFiles(params.payload.data);
        }

        default: {
            return getEmptyResponse();
        }
    }
};

export default hasuraMedia;
