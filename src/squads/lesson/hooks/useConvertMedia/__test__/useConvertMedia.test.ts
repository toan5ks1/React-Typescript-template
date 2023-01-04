import { Entities, ProviderTypes } from "src/common/constants/enum";
import inferMutation from "src/squads/lesson/service/infer-mutation";

import { renderHook, act } from "@testing-library/react-hooks";
import useDataProvider from "src/hooks/useDataProvider";
import useConvertMedia, { MediasList } from "src/squads/lesson/hooks/useConvertMedia";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";

jest.mock("src/hooks/useDataProvider", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/service/infer-mutation", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

describe("useConvertMedia", () => {
    const fakeMutate = jest.fn();
    const fakeShowSnackbar = jest.fn();
    const fakeProvider = (
        _providerTypes: ProviderTypes,
        _entity: Entities,
        { filter: { media_id } }: { filter: { media_id: string[] } }
    ) => {
        const mediaTable: MediasList[] = [
            {
                media_id: "media_id_1",
                name: "pdf_file_1",
            },
            {
                media_id: "media_id_2",
                name: "pdf_file_2",
            },
        ];
        const resultData = mediaTable.filter((media) => media_id.includes(media.media_id));
        return {
            data: resultData,
        };
    };

    beforeEach(() => {
        (inferMutation as jest.Mock).mockImplementation(
            (_inferredBase: { entity: "classes"; action: "classesConvertMedia" }) => {
                return () => ({ mutate: fakeMutate });
            }
        );
        (useShowSnackbar as jest.Mock).mockImplementation(() => fakeShowSnackbar);
        (useDataProvider as jest.Mock).mockImplementation(() => fakeProvider);
    });

    it("should trigger convert media for files that exist on Hasura", async () => {
        const onError = jest.fn();
        const {
            result: { current },
        } = renderHook(() => useConvertMedia({ onError }));

        await act(async () => {
            await current.convertMedia(["media_id_1"]);
        });

        expect(fakeMutate).toBeCalledWith({
            data: {
                mediaList: [
                    {
                        media_id: "media_id_1",
                        name: "pdf_file_1",
                    },
                ],
            },
        });
        expect(fakeShowSnackbar).not.toBeCalled();
    });

    it("should show error for files that does not exist on hasura", async () => {
        const onError = jest.fn();
        const {
            result: { current },
        } = renderHook(() => useConvertMedia({ onError }));

        await act(async () => {
            await current.convertMedia(["media_id_not_exist_on_hasura"]);
        });

        expect(fakeMutate).not.toBeCalled();
    });

    it("should not do anything if mediaIds is empty", async () => {
        const onError = jest.fn();
        const {
            result: { current },
        } = renderHook(() => useConvertMedia({ onError }));

        await act(async () => {
            await current.convertMedia([]);
        });

        expect(fakeMutate).not.toBeCalled();
        expect(fakeShowSnackbar).not.toBeCalled();
    });
});
