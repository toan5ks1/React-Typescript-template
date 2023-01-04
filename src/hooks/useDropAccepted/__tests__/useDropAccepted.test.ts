import { createFile } from "src/test-utils/file";

import { UseDropAcceptedProps } from "..";
import useDropAccepted from "../useDropAccepted";

import { renderHook } from "@testing-library/react-hooks";

const fileNameOne = "fileNameOne";
const fileNameTwo = "fileNameTwo";

const createMockFiles = () => {
    return [createFile(fileNameOne), createFile(fileNameTwo)];
};

describe(useDropAccepted.name, () => {
    it("should onChange with original files when customFilterFn not passed", () => {
        const onChangeFn = jest.fn();
        const { result } = renderHook(() =>
            useDropAccepted({
                onChange: onChangeFn,
            })
        );

        const files = createMockFiles();

        result.current.onDropAccepted(files);

        expect(onChangeFn).toBeCalledWith(files);
    });

    // Only lesson team use this option
    it("should onChange with filtered files when customFilterFn passed", () => {
        const onChangeFn = jest.fn();

        const customFilterFn: UseDropAcceptedProps["customFilterFn"] = (files) => {
            return files.filter((file) => file.name !== fileNameOne);
        };

        const { result } = renderHook(() =>
            useDropAccepted({
                onChange: onChangeFn,
                customFilterFn,
            })
        );

        const files = createMockFiles();

        result.current.onDropAccepted(files);

        expect(onChangeFn).toBeCalledWith(customFilterFn(files));
    });
});
