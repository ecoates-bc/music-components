import math


def main():
    notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
    for i in range(72):
        if i > 0 and i % 12 == 0:
            print()

        note = notes[i % 12]
        octave = math.floor(i / 12) + 1
        print(f"{note}{octave} {i}")


if __name__ == "__main__":
    main()
