import { Features } from "src/common/constants/enum";
//TODO: refactor when feature controller gets moved to mana-packs
import FeatureController, { IFeatureStorage } from "src/packages/feature-controller";

import useFeatureController from "src/app/useFeatureController";

export const mockUseFeatureController = (props: Partial<IFeatureStorage<Features>> = {}) => {
    (useFeatureController as jest.Mock).mockImplementation(() => {
        const featureController = new FeatureController<Features>({
            init: jest.fn(),
            update: jest.fn(),
            get: jest.fn(),
            subscribeToRemoteChanges: jest.fn(),
            unsubscribe: jest.fn(),
            ...props,
        });
        return { featureController: featureController };
    });
};
