const fs = require("fs");
const loadJSON = jsonPath => JSON.parse(fs.readFileSync(jsonPath));

const scrappedData = loadJSON("./data/web-scrapped-chord-progressions.json");
const scrappedProgressions = Object.values(scrappedData);
  
const chordTypesTranslator = loadJSON("./data/chord-types-translator.json");
Object.keys(chordTypesTranslator)
  .forEach(key => chordTypesTranslator[key] = chordTypesTranslator[key][0]);

/*
  Instead of, progression by progression,
  extracting the chords and then translating
  the chord types, all progressions will be joined,
  as a string, separated via some character not 
  present in any of the progressions' string form,
  nor in the chord types from the chord type translator JSON.

  Then, unique chords will be extracted from such
  concatenated text, and will be used to translate
  all chord types in the concatenated text.

  Finally, the concatenated text will be split via
  the chosen separator character, and the progressions
  will be assigned to their respective scrapped songs.

  Note that incorrect chord type translations could 
  occur, depending on the order in which some chord
  type is being replaced.

  For example, if the chord type '7' gets converted
  to 'X', and then the chord type '79' tries to get
  converted to '9', a chord type conversion was lost.

  Therefore, the chord type replacement should be in
  such a way that there are no pair of replacement 
  strings which satisfy that one is included in the other.

  For these specific scrapped progression strings, 
  every chord ends in either ', ] or one space.
  Therefore, let's use such characters in order to make
  sure that the property described in the previous
  paragraph, holds.
*/

// Set a separator character
console.log(
  // Does every progression string start with '[['?
  scrappedProgressions.every(
    progression => progression.slice(0, 2) === '[['
  )
)

const progressionsSeparator = "[["
// Check absence of separator for chord type translations
console.log(
  JSON.stringify(chordTypesTranslator).includes(progressionsSeparator)
);

// Therefore, '[[' is a valid separator for the progressions.

/*
  This method of translating chord types has
  an issue when converting major chords of 
  the form C to CM, because the chord 
  type to be translated is an empty string.

  Therefore, such chord type translation
  will be dealt with later.
*/
// Remove special chord type
delete chordTypesTranslator[""];

// Avoid issue about order associated
// with the order of chord type translation
const chordTypeSeparators = ["'", "]", " ", "/"];

// Translate each chord type (major triads)
let translatedProgressions = JSON.stringify(scrappedProgressions);
chordTypeSeparators.forEach(chordTypeSeparator => {
  Object.keys(chordTypesTranslator).forEach(chordType => {
    translatedProgressions = 
      translatedProgressions
        .replaceAll(
          chordType + chordTypeSeparator,
          chordTypesTranslator[chordType] + chordTypeSeparator
        )
  })
});

// Translate each major triad
const majorTriads = [
  "C", "D", "E", "F", "G", "A", "B",
  "C#", "D#", "E#", "F#", "G#", "A#", "B#",
  "Cb", "Db", "Eb", "Fb", "Gb", "Ab", "Bb"
];
// Deal with slash chords
["'", "[", " "].forEach(anotherChordSeparator => {
  chordTypeSeparators.forEach(chordTypeSeparator => {
    majorTriads.forEach(majorTriad => {
      translatedProgressions = 
        translatedProgressions
          .replaceAll(
            anotherChordSeparator + majorTriad + chordTypeSeparator,
            anotherChordSeparator + majorTriad + 'M' + chordTypeSeparator
          )
    })
  })
});

// Undo progressions concatenation
translatedProgressions = JSON.parse(translatedProgressions);

// Update chord progressions
Object.keys(scrappedData).forEach(
  (key, index) => scrappedData[key] = translatedProgressions[index]
);

// Save JSON file
fs.writeFileSync(
  './data/translated-scrapped-chord-progressions.json', 
  JSON.stringify(scrappedData)
);


/*
function extractUniqueChords(progression) {
  let chords = progression
    // Remove quotes and commas
    .replaceAll(/[',]/g, "")
    // Remove extra space (should be spaces) after bar start
    .replaceAll(/\[\s/g, "[")
    // Remove bar separators
    .replaceAll(/[\[\]]/g, "")
    // Remove section separators
    .replaceAll(/\n/g, " ")
    // Remove possible extra spaces 
    .replaceAll(/[\s]+/g, " ")
    .split(" ");

  // Return array of unique chords
  chords = new Set(chords);
  return [...chords];
}

function extractChordType(chord) {
  // Deal with no chord case
  if (chord === '~') return null;

  // Deal with slash chords
  const extractedChord = chord.includes("/")
    ? chord.split("/")[0] 
    : chord;

  // Remove root
  return extractedChord
    // Remove the flat or sharp roots
    .replaceAll(/[A-G][b#]/g, "")
    // Remove natural roots
    .replaceAll(/[A-G]/g, "")
}

function translateChordType(chordType) {
  // Deal with no chord case ('~')
  if (chordType === null) return '';

  // '' gets turned to "M"
  // ...
}

// Translate each chord progression
const translatedProgressions = [];

// progressions.forEach(progression => {
//   console.log(
//     extractChords(progression)
//   )
// })

const test = progressions[0];

console.log(
  extractUniqueChords(test)
)

const chordTypeTranslations = [];
extractUniqueChords(test).forEach(
  chord => {
    const chordType = extractChordType(chord);
    const chordTransformation = chord.split(chordType);
    chordTransformation[1] = chordType;
    chordTransformation.push("translated chord type");
    
    chordTypeTranslations.push(chordTransformation);
  }
)


  // IMPORTANT INDICES TO CHECK: n = 2, 5 .
  // const n = 120;
  // console.table(extractChords(progressions[n]));



*/