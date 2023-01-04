// TODO: refactor when feature controller gets moved to mana-packs
import FeatureController, { IFeatureStorage } from "src/packages/feature-controller";
import { PaymentFeaturesType } from "src/squads/payment/constants/permission";

import useFeatureController from "src/squads/payment/hooks/useFeatureController";

export const mockUseFeatureController = (
    props: Partial<IFeatureStorage<PaymentFeaturesType>> = {}
) => {
    (useFeatureController as jest.Mock).mockImplementation(() => {
        const featureController = new FeatureController<PaymentFeaturesType>({
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
