import useHandleFormActions from "../useHandleFormActions";

import { renderHook } from "@testing-library/react-hooks";

const mockFunction = jest.fn();

jest.mock("src/squads/lesson/hooks/useSafeState", () => () => [false, mockFunction]);

describe("useHandleFormActions", () => {
    it("should change state match with action", () => {
        const {
            result: { current },
        } = renderHook(() => useHandleFormActions());

        const { cancelDialogActions, submitFormActions, submitDialogActions } = current;

        submitFormActions.handleSubmittingForm();
        expect(mockFunction).toBeCalledWith(true);

        submitFormActions.handleSubmittedForm();
        expect(mockFunction).toBeCalledWith(false);

        submitDialogActions.handleOpenSubmitDialog();
        expect(mockFunction).toBeCalledWith(true);

        submitDialogActions.handleCloseSubmitDialog();
        expect(mockFunction).toBeCalledWith(false);

        cancelDialogActions.handleOpenCancelDialog();
        expect(mockFunction).toBeCalledWith(true);

        cancelDialogActions.handleCloseCancelDialog();
        expect(mockFunction).toBeCalledWith(false);
    });
});
