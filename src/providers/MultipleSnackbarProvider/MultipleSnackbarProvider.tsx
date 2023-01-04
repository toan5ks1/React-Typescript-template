import { PureComponent } from "react";

import { genId } from "src/common/utils/id-generator";

import SnackbarItem, {
    SnackbarItemProps,
    CloseReason,
    DefaultsSnackbar,
    SnackbarKey,
    SnackbarMessage,
    TransitionHandlerProps,
} from "src/components/Snackbars/SnackbarMultipleItem";
import SnackbarContainer from "src/components/Snackbars/SnackbarMultipleItem/SnackbarContainer";

import MultipleSnackbarContext, {
    MultipleSnackbarContextProps,
    SnackbarOptions,
} from "src/contexts/MultipleSnackbarContext";

type Reducer = (state: State) => State;

interface StateSnackbar extends SnackbarItemProps {
    persist?: boolean;
}
interface State {
    snacks: StateSnackbar[];
    queue: StateSnackbar[];
    contextValue: MultipleSnackbarContextProps;
}

export interface MultipleSnackbarProviderProps {
    children: React.ReactNode | React.ReactNode[];
    maxSnack?: number;
    onCloseSnackbar?: () => void;
}

class MultipleSnackbarProvider extends PureComponent<MultipleSnackbarProviderProps, State> {
    constructor(props: MultipleSnackbarProviderProps) {
        super(props);
        this.state = {
            snacks: [],
            queue: [],
            contextValue: {
                enqueueSnackbar: this.enqueueSnackbar.bind(this),
                closeSnackbar: this.closeSnackbar.bind(this),
                closeAllSnackbarPersist: this.closeAllSnackbarPersist.bind(this),
            },
        };
    }

    get maxSnack(): number {
        return this.props.maxSnack || DefaultsSnackbar.MAX_SNACK;
    }

    /**
     * Adds a new snackbar to the queue to be presented.
     * Returns generated or user defined key referencing the new snackbar or null
     */
    enqueueSnackbar = (message: SnackbarMessage, opts?: SnackbarOptions): SnackbarKey => {
        const id = opts?.snackKey || genId();

        const snack: StateSnackbar = {
            snackKey: id,
            ...opts,
            message,
            open: true,
            variant: opts?.variant || DefaultsSnackbar.VARIANT,
            autoHideDuration: opts?.autoHideDuration || DefaultsSnackbar.AUTO_HIDE_DURATION,
            onClose: opts?.onClose || this.handleCloseSnack,
            onExited: opts?.onExited || this.handleExitedSnack,
        };

        if (opts?.persist) {
            snack.autoHideDuration = undefined;
        }

        this.setState((state) => {
            return this.handleDisplaySnack({
                ...state,
                queue: [...state.queue, snack],
            });
        });

        return id;
    };

    /**
     * Reducer: Display snack if there's space for it. Otherwise, immediately
     * begin dismissing the oldest message to start showing the new one.
     */
    handleDisplaySnack: Reducer = (state) => {
        const { snacks } = state;
        if (snacks.length >= this.maxSnack) {
            return this.handleDismissOldest(state);
        }
        return this.processQueue(state);
    };

    /**
     * Reducer: Display items (notifications) in the queue if there's space for them.
     */
    processQueue: Reducer = (state) => {
        const { queue, snacks } = state;
        if (queue.length > 0) {
            return {
                ...state,
                snacks: [...snacks, queue[0]],
                queue: queue.slice(1, queue.length),
            };
        }
        return state;
    };

    /**
     * Reducer: Hide oldest snackbar on the screen because there exists a new one which we have to display.
     * (ignoring the one with 'persist' flag. i.e. explicitly told by user not to get dismissed).
     *
     * Note 1: If there is already a message leaving the screen, no new messages are dismissed.
     * Note 2: If the oldest message has not yet entered the screen, only a request to close the
     *         snackbar is made. Once it entered the screen, it will be immediately dismissed.
     */
    handleDismissOldest: Reducer = (state) => {
        if (state.snacks.some((item) => !item.open)) {
            return state;
        }

        let popped = false;
        let ignore = false;

        const persistentCount = state.snacks.reduce(
            (acc, current) => acc + (current.open && current.persist ? 1 : 0),
            0
        );

        if (persistentCount === this.maxSnack) {
            ignore = true;
        }

        const snacks = state.snacks.map((item) => {
            if (!popped && (!item.persist || ignore)) {
                popped = true;

                if (item.onClose) item.onClose(null, CloseReason.MAXSNACK, item.snackKey);

                return {
                    ...item,
                    open: false,
                };
            }

            return { ...item };
        });

        return { ...state, snacks };
    };

    /**
     * Hide a snackbar after its timeout.
     */
    handleCloseSnack: TransitionHandlerProps["onClose"] = (_event, _reason, key) => {
        this.setState(({ snacks, queue }) => ({
            snacks: snacks.map((item) => {
                if (item.snackKey !== key) {
                    return { ...item };
                }

                return { ...item, open: false };
            }),
            queue: queue.filter((item) => item.snackKey !== key),
        }));
    };

    /**
     * Close snackbar with the given key
     */
    closeSnackbar: MultipleSnackbarContextProps["closeSnackbar"] = (key) => {
        // call individual snackbar onClose callback passed through options parameter
        const toBeClosed = this.state.snacks.find((item) => item.snackKey === key);
        if (Boolean(key) && toBeClosed && toBeClosed.onClose) {
            toBeClosed.onClose(null, CloseReason.INSTRUCTED, key);
        }

        this.handleCloseSnack(null, CloseReason.INSTRUCTED, key);
    };

    closeAllSnackbarPersist = () => {
        this.setState((state) => {
            const mappedPersistStacks = this.state.snacks.map((stack) => {
                if (stack.persist) {
                    return {
                        ...stack,
                        autoHideDuration: 500,
                    };
                }
                return stack;
            });

            const mappedPersistQueue = this.state.queue.map((item) => {
                if (item.persist) {
                    return {
                        ...item,
                        autoHideDuration: 500,
                    };
                }
                return item;
            });
            return {
                ...state,
                snacks: mappedPersistStacks,
                queue: mappedPersistQueue,
            };
        });
    };

    /**
     * When we set open attribute of a snackbar to false (i.e. after we hide a snackbar),
     * it leaves the screen and immediately after leaving animation is done, this method
     * gets called. We remove the hidden snackbar from state and then display notifications
     * waiting in the queue (if any). If after this process the queue is not empty, the
     * oldest message is dismissed.
     */
    handleExitedSnack: TransitionHandlerProps["onExited"] = (_event, key) => {
        if (!Boolean(key)) {
            throw new Error("handleExitedSnack Cannot be called with undefined key");
        }
        this.setState((state) => {
            const newState = this.processQueue({
                ...state,
                snacks: state.snacks.filter((item) => item.snackKey !== key),
            });

            if (newState.queue.length === 0) {
                return newState;
            }

            return this.handleDismissOldest(newState);
        });
        this.props.onCloseSnackbar && this.props.onCloseSnackbar();
    };

    render() {
        const { contextValue } = this.state;

        return (
            <MultipleSnackbarContext.Provider value={contextValue}>
                {this.props.children}
                <SnackbarContainer>
                    {this.state.snacks.map((snack) => {
                        return (
                            <SnackbarItem
                                {...snack}
                                key={snack.snackKey}
                                onClose={this.handleCloseSnack}
                                onExited={this.handleExitedSnack}
                            />
                        );
                    })}
                </SnackbarContainer>
            </MultipleSnackbarContext.Provider>
        );
    }
}

export default MultipleSnackbarProvider;
