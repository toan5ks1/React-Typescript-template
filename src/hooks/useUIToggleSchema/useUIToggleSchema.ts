import { useContext } from "react";

import { UIToggleContext } from "src/contexts/UIToggleContext";

const useUIToggleSchema = () => {
    return useContext(UIToggleContext);
};

export default useUIToggleSchema;
