import { createMockFiles } from "src/squads/payment/test-utils/mocks/file";

import { renderHook, act } from "@testing-library/react-hooks";
import { useFiles } from "src/squads/payment/domains/MasterData/hooks/useFiles";

jest.mock("src/squads/payment/hooks/useResourceTranslate");

const mockFiles: File[] = createMockFiles(2);

describe("master-import > useFiles", () => {
    it("should return correctly when importing files", () => {
        const { result } = renderHook(() => useFiles());

        act(() => result.current.onChange(mockFiles));
        expect(result.current.files).toHaveLength(2);
        expect(result.current.files).toEqual(mockFiles);
    });

    it("should return correctly when removing a file", () => {
        const { result } = renderHook(() => useFiles(mockFiles));

        act(() => {
            result.current.onRemove(1);
        });

        expect(result.current.files).toHaveLength(1);
        expect(result.current.files).toEqual([mockFiles[0]]);

        act(() => {
            result.current.onRemove(0);
        });
        expect(result.current.files).toHaveLength(0);
        expect(result.current.files).toEqual([]);
    });
});
