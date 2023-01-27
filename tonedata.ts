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
    console.log(resChord);
    return resChord;
}