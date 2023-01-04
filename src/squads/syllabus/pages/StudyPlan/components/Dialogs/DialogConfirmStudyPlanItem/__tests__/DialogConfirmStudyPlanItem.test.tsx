import DialogConfirmStudyPlanItem from "..";

import { render } from "@testing-library/react";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

describe(DialogConfirmStudyPlanItem.name, () => {
    it("should correct passed text", () => {
        const { getByRole, getByText } = render(
            <DialogConfirmStudyPlanItem open textProceed="" onClose={() => {}} onProceed={() => {}}>
                Children
            </DialogConfirmStudyPlanItem>,
            { wrapper: TestApp }
        );

        expect(
            getByText("Children Your changes will be lost if you don't save them.")
        ).toBeInTheDocument();
        expect(getByText("Save changes")).toBeInTheDocument();
        expect(getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    });
});
