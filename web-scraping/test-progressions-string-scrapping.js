/*

// '[Cb^7 D7] [G^7 Bb7] Eb^7 [Am7 D7] [G^7 Bb7] [Eb^7 Gb7] Cb^7 [Fm7 Bb7] Eb^7 [Am7 D7] G^7 [Dbm7 Gb7] Cb^7 [Fm7 Bb7] Eb^7 [Dbm7 Gb7]';
let progression = 
  'Cm7 Cm7 Cm7 Cm7 Fm7 Fm7 Cm7 Cm7\n[F#m7b5 F7913] [Em7b5 A7alt] Cm7 Cm7';

progression

progression = progression
  // Separate progression bars with commas
  .replaceAll(/\]\s/g, "],")
  .replaceAll(/\s\[/g, ",[")
  // Deal with progression bars of only one chord
  .replaceAll(/\],[A-G]/g, (match) => "],[" + match.slice(-1))
  .replaceAll(/[^\]],\[/g, (match) => match[0] + '],[')
  // Separate progression bars
  .split(",")
  .map(bar => bar.replace(/[\[\]]/g, "").split(" "))

progression

let flattenProgression = progression
  // Convert arrays into how many 
  // chords there are per bar
  .map(function(bar) {
    const numChords = bar.length;
    return Array(numChords).fill(numChords);
  })
  // Convert to a one dimensional array,
  // in order to easily iterate it when
  // Strudel is playing some progression
  .flat(1);

flattenProgression

let progression = 
  "[['Eb7', 'D-6', 'Eb7', 'D-6', 'E#7', 'D-6', '[Em7b5 A7]', 'D-6'], ['Eb7', 'D-6', 'Eb7', 'D-6', 'Eb7', 'D-6', '[Em7b5 A7]', 'D-6'], ['Am7b5', 'D79b', 'G-7', 'G-7', 'Cm7b5', 'C79b', 'Fj7', '[Em7b5 A7]'], ['Eb7', 'D-6'], ['Eb7', 'D-6', 'Eb7', 'D-6', '[Em7b5 A7]', 'D-6']]";

console.log(progression);

progression = progression
  // Insert single chords bars into an array
  .replaceAll(/'[\w-#]+'/g, (match) => "[" + match + "]")
  // Replace instances of [[[.. or ]]]...
  .replaceAll(/\[+/g, '[')
  .replaceAll(/\]+/g, ']')
  // Deal with bars with case [... [X Y], [Z], ...]
  .replaceAll(/\]'\]/g, "]'")
  // Case of bars with multiple chords
  .replaceAll(/'\[/g, "['")
  .replaceAll(/\]'/g, "']")
  // Prepare for JSON parse
  .replaceAll(/'/g, '"')

progression = "[" + progression + "]";
progression = JSON.parse(progression)

// The number of chords in each bar will be counted
// via string.split(" "), therefore, extra empty
// space needs to be trimmed
progression = progression
  .map((bar) => [bar[0].replaceAll(/\s+/g, " ")])

// Flatten array into chords per bar
progression = progression
  .map(function(bar) {
    const numChords = bar[0].split(" ").length;
    return Array(numChords).fill(numChords);
  }).flat(1)

console.log(progression)

*/


function getProgressionBars(StringBars) {
  let progression = StringBars.replace(/'/g, '"');
  progression = JSON.parse(progression);
  progression = progression.flat(1);

  // The number of chords in each bar could be 
  // counted via string.split(" "), therefore, 
  // extra empty space should be trimmed.
  // Let's also remove the [ and ] in the bars with
  // more than chord, although is not necessary.
  progression = progression.map(function(barString) {
    return barString
      .replaceAll(/\s+/g, " ")
      .replaceAll(/[\[\]]/g, "")
  });

  return progression;
}


const rawProgression = 
  "[['D-6', '[Em7b5 A79b]', 'D-6', '[Em7b5 A79b]', 'D-6', '[Am7b5 D79b]', 'G-7', 'G-7', '[B-7 E7]', '[G-7 C7]', 'Fj7', '[Em7b5 A7]', 'Dj7', '[Em7b5 A7]'], ['D-6', '[Em7b5 A79b]', 'D-6', '[Em7b5 A79b]', 'D-6', '[Am7b5 D79b]', 'G-7', 'G-7', '[B-7 E7]', '[G-7 C7]', 'Fj7', '[Em7b5 A7]', 'Dj7', 'Dj7'], ['Am7b5', 'D79b', 'G-6', 'G-6', 'Gm7b5', 'C79b', 'Fj7', '[Em7b5 A79b]'], ['D-6', '[Em7b5 A79b]', 'D-6', '[Em7b5 A79b]', 'D-6', '[Bb7 A7]', 'D-6', '[Em7b5 A7]']]"
  .replaceAll("j", "^")  // major
  .replaceAll("-", "m")  // minor
  .replaceAll("+", "aug")  // augmented

const chords = getProgressionBars(rawProgression)
.map(bar => bar.split(" "))
.flat(1);

console.log(chords);


let strudelProgression =
  'Dm6 [Em7b5 A79b] Dm6 [Em7b5 A79b] Dm6 [Am7b5 D79b] Gm7 Gm7 [Bm7 E7] [Gm7 C7] F^7 [Em7b5 A7] D^7 [Em7b5 A7]\nDm6 [Em7b5 A79b] Dm6 [Em7b5 A79b] Dm6 [Am7b5 D79b] Gm7 Gm7 [Bm7 E7] [Gm7 C7] F^7 [Em7b5 A7] D^7 D^7\nAm7b5 D79b Gm6 Gm6 Gm7b5 C79b F^7 [Em7b5 A79b]\nDm6 [Em7b5 A79b] Dm6 [Em7b5 A79b] Dm6 [Bb7 A7] Dm6 [Em7b5 A7]';

// Goal:
// Convert strudelProgression into same value as variable "chords"

strudelProgression = strudelProgression
    .replaceAll(/[\[\]]/g, "")
    .replaceAll(/\n/g, " ")
    // User may have added extra spaces 
    .replaceAll(/[\s]+/g, " ")
    .split(" ");

console.log(
  strudelProgression.every((el, index) => el === chords[index])
)
