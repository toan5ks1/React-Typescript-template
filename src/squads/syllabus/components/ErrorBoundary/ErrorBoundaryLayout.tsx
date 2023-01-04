import {
    Component,
    ElementType,
    ErrorInfo,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react";

import { convertString } from "src/common/constants/helper";
import { isNetworkError } from "src/internals/grpc";
import { manabieWindowEvent } from "src/internals/manabie-event";

import { IErrorBoundary } from "../../internals/errors";
import ErrorBoundary from "./ErrorBoundary";

const defaultNetworkErrorValue: NetworkErrorType = {
    code: 0,
    props: { error: { name: "", message: "" }, errorInfo: { componentStack: "" } },
};

export interface MyErrorBoundaryProps {
    error?: ElementType;
    title?: ReactNode;
    code?: number;
    message?: string;
    errorProps?: IErrorBoundary;
}

export interface MyErrorBoundaryState {
    hasError: boolean;
    error: null | Error;
    errorInfo: null | ErrorInfo;
}

export interface NetworkErrorType {
    code: number;
    props: IErrorBoundary;
}

export class MyErrorBoundary extends Component<MyErrorBoundaryProps, MyErrorBoundaryState> {
    state = { hasError: false, error: null, errorInfo: null };

    constructor(props: MyErrorBoundaryProps) {
        super(props);
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ hasError: true, error, errorInfo });
    }

    render() {
        const { hasError, errorInfo, error } = this.state;

        const { children, code = 0, errorProps } = this.props;

        if (hasError) {
            return <ErrorBoundary error={error} errorInfo={errorInfo} />;
        }

        if (errorProps && isNetworkError(convertString(errorProps.error?.message), code))
            return <ErrorBoundary error={errorProps.error} errorInfo={errorProps.errorInfo} />;

        return children;
    }
}

const ErrorBoundaryLayout = ({ children, ...rest }: { children: ReactNode }) => {
    // handle network error
    const [isNetworkErr, setIsNetworkErr] = useState<NetworkErrorType>(defaultNetworkErrorValue);

    const handleNetworkErrors = useCallback((e: CustomEvent) => {
        setIsNetworkErr({
            code: e.detail.code,
            props: e.detail.props,
        });
    }, []);

    useEffect(() => {
        // https://github.com/microsoft/TypeScript/issues/28357#issuecomment-436484705
        return manabieWindowEvent.addListener(
            "manabie/network-error",
            handleNetworkErrors as EventListener
        );
    }, [handleNetworkErrors]);

    return (
        <MyErrorBoundary
            // network error
            errorProps={isNetworkErr.props}
            code={isNetworkErr.code}
            // This is to catch error for react admin error
            {...rest}
        >
            {children}
        </MyErrorBoundary>
    );
};

export default ErrorBoundaryLayout;
