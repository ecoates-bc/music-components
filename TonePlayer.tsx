import * as tone from 'tone';
import { parseChord } from './tonedata';
import { ToneData } from './tonedata';

type TonePlayerProps = {
    data: ToneData;
};

export default function TonePlayer(props: TonePlayerProps) {
    const playNotes = () => {
        const bpm = props.data.bpm;
        const beatLength = 1 / (bpm / 60);
        const synth = new tone.PolySynth(tone.Synth).toDestination();
        const now = tone.now();
        const measures = props.data.measures;
        const noteLength = 4 / measures[0].length;

        for (let m=0; m<props.data.measures.length; m++) {
            const measure = measures[m];
            for (let i=0; i<measure.length; i++) {
                const notes = parseChord(measure[i], false);
                const duration = noteLength*beatLength;
                const startTime = now + m*duration + i*beatLength;
                
                synth.triggerAttackRelease(notes, duration - 0.5, startTime);
            }
        }

        // synth.triggerAttackRelease(["a4", "f4", "c4", "g3"], 4*beatLength, now);
        // synth.triggerAttackRelease(["g4", "eb4", "bb3", "f3"], 4*beatLength, now + 4*beatLength);
    }

    return (
        <div>
            <button onClick={playNotes}>
                Click me!
            </button>
        </div>
    );
}