import { useEffect, useRef } from "react";
import Vex from "vexflow";
import { parseChord } from "./tonedata";
import { ToneData } from "./tonedata";

type StaffLineProps = {
    data: ToneData;
};

enum NoteDuration {
    w = 1,
    h = 2,
    q = 4,
};

export default function StaffLine(props: StaffLineProps) {
    const VF = Vex.Flow;
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        if (root) {
            root.innerHTML = '';
            const renderer = new VF.Renderer(root, VF.Renderer.Backends.SVG);
            const measures = props.data.measures;
            const measureWidth = 250;
            const canvasWidth = measureWidth * measures.length + 1;
            renderer.resize(canvasWidth, 200);
            const context = renderer.getContext();

            measures.map((notes, i) => {
                const stave = new VF.Stave(measureWidth*i, 0, measureWidth);
                if (i === 0) {
                    stave
                        .addClef(props.data.clef)
                        .addTimeSignature(props.data.timeSignature);
                }
                stave.setContext(context).draw();

                const chords = notes.map((chord) => {
                    const noteNames = parseChord(chord, true);
                    let staveChord = new VF.StaveNote({keys: noteNames, duration: NoteDuration[notes.length]});
                    noteNames.map((note, j) => {
                        if (note.includes("b")) {
                            staveChord.addModifier(new VF.Accidental("b"), j);
                        }
                    });
                    return staveChord;
                });
                VF.Formatter.FormatAndDraw(context, stave, chords);
            });
        }
             
    });
    
    return (
        <div ref={rootRef}></div>
    );
}