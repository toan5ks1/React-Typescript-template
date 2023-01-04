import { useHistory } from "react-router";

const useNavigation = () => {
    const history = useHistory(); // Note: history is mutable. This prevents render loops in useCallback.

    return history;
};

export default useNavigation;
