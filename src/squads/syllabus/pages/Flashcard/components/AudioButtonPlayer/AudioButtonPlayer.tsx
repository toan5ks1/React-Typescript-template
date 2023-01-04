import { useCallback } from "react";

import { useAudio } from "react-use";

import AudioButtonBase, { AudioButtonBaseProps } from "src/components/Audios/AudioButtonBase";

import { HTMLMediaProps } from "react-use/lib/factory/createHTMLMediaHook";

export interface AudioButtonPlayerProps extends HTMLMediaProps {
    audioButtonProps?: AudioButtonBaseProps;
}

const AudioButtonPlayer = ({ audioButtonProps, ...props }: AudioButtonPlayerProps) => {
    const [audio, state, controls] = useAudio(props);

    const onClick = useCallback(() => {
        if (!state.paused) {
            controls.seek(0);
        }

        void controls.play();
    }, [controls, state.paused]);

    return (
        <div data-testid="AudioButtonPlayer__root">
            {audio}
            <AudioButtonBase
                onClick={onClick}
                data-testid="AudioButtonPlayer__button"
                {...audioButtonProps}
            />
        </div>
    );
};

export default AudioButtonPlayer;
