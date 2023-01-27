import { parseChord } from './tonedata';
import { ToneData, playNotes } from './tonedata';

type TonePlayerProps = {
    data: ToneData;
};

export default function TonePlayer(props: TonePlayerProps) {
    const onClick = () => {
        playNotes(props.data.bpm, props.data.measures);
    }

    return (
        <div>
            <button onClick={onClick}>
                Click me!
            </button>
        </div>
    );
}