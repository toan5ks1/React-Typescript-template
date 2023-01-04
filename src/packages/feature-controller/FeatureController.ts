import { EnvKeysForUnleash } from "src/typings/configuration";

interface FeatureStorageInitProps {
    schoolId?: string;
    userId?: string;
    env: EnvKeysForUnleash;
    variant?: string;
}
export interface IFeatureStorage<T> {
    update(props: FeatureStorageInitProps): Promise<boolean | undefined>;
    init(props: FeatureStorageInitProps): Promise<boolean | undefined>;
    get(featureName: T): boolean;
    subscribeToRemoteChanges: (onRemoteConfigChange: Function) => void;
    unsubscribe: () => void;
}

export interface FeatureStorageController<T> {
    [serviceName: string]: IFeatureStorage<T>;
}
// FeaturesNameType is collection of feature,
// currently we're using an enum but in the future we will replace them with string and union
class FeatureController<FeaturesNameType> {
    initiated = false;
    private readonly featureStorage: IFeatureStorage<FeaturesNameType>;

    constructor(featureStorageController: IFeatureStorage<FeaturesNameType>) {
        this.featureStorage = featureStorageController;

        this.isFeatureEnabled = this.isFeatureEnabled.bind(this);
        this.subscribeToRemoteChanges = this.subscribeToRemoteChanges.bind(this);
    }

    update(props: FeatureStorageInitProps) {
        return this.featureStorage.update(props);
    }
    init(props: FeatureStorageInitProps) {
        return this.featureStorage.init(props).then((value) => {
            this.initiated = true;
            return value;
        });
    }

    isFeatureEnabled(featureName: FeaturesNameType | undefined): boolean {
        if (typeof featureName === "undefined") {
            // If a module doesn't have featureName, we think of it as no longer need a remote feature toggle.
            // That feature will always show on all envs
            return true;
        }

        const result = this.featureStorage.get(featureName);

        return Boolean(result);
    }

    subscribeToRemoteChanges(onRemoteConfigChange: Function) {
        this.featureStorage.subscribeToRemoteChanges(onRemoteConfigChange);
    }

    unsubscribe() {
        this.featureStorage.unsubscribe();
    }
}

export default FeatureController;
