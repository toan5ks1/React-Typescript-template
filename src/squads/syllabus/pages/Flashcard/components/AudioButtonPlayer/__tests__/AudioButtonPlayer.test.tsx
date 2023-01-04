import AudioButtonPlayer from "../AudioButtonPlayer";

import { render, screen } from "@testing-library/react";

describe(AudioButtonPlayer.name, () => {
    const rootTestId = "AudioButtonPlayer__root";

    it("should render audio tag and with src props", () => {
        const src = "src_mp3_passed";
        render(<AudioButtonPlayer src={src} />);

        expect(screen.getByTestId(rootTestId).querySelector("audio")).toBeInTheDocument();
        expect(screen.getByTestId(rootTestId).querySelector("audio")).toHaveAttribute("src", src);
    });
});
