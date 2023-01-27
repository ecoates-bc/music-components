import * as tone from 'tone';

export class Chord {
    notes: number[];

    constructor(notes: number[]) {
        this.notes = notes;
    }
};

export type ToneData = {
    bpm: number;
    measures: Chord[][];
    timeSignature: string;
    clef: string;
};

export enum NoteNames {
    C = 0,
    Db,
    D,
    Eb,
    E,
    F,
    Gb,
    G,
    Ab,
    A,
    Bb,
    B,
}

export function parseChord(chord: Chord, addSlash: boolean) {
    const resChord = chord.notes.map((n) => {
        const noteType = n % 12;
        const name = NoteNames[noteType];
        const octave = Math.floor(n / 12) + 1;

        const chordName = addSlash? `${name}/${octave}` : `${name}${octave}`;
        return chordName;
    });
    return resChord;
}

export function playNotes(bpm: number, measures: Chord[][]) {
    const beatLength = 1 / (bpm / 60);
    const synth = new tone.PolySynth(tone.Synth).toDestination();
    const now = tone.now();
    const noteLength = 4 / measures[0].length;

    measures.map((measure, i) => {
        measure.map((chord, j) => {
            const notes = parseChord(chord, false);
            const duration = noteLength*beatLength;
            const startTime = now + i*duration + j*beatLength;
            synth.triggerAttackRelease(notes, duration - 0.5, startTime);
        });
    });
}