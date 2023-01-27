import StaffLine from "./StaffLine";
import TonePlayer from "./TonePlayer";
import { Chord } from "./tonedata";

const toneData = {
    bpm: 100,
    measures: [
        [new Chord([46, 42, 37, 32]), new Chord([43, 39, 34, 29])],
        [new Chord([40, 36, 31, 26]), new Chord([41, 37, 32, 27])],
        [new Chord([39, 35, 32, 28])]
    ],
    timeSignature: "4/4",
    clef: "treble"
};

export default function MusicPanel() {
    return (
        <>
            <TonePlayer 
                data={toneData}
            />
            <StaffLine 
                data={toneData}
            />
        </>
    );
}
