const fs = require("fs");

const rawData = fs.readFileSync("./data/web-scrapped-chord-progressions.json");
const scrappedProgressions = JSON.parse(rawData);

const progressions = Object.values(scrappedProgressions);
let uniqueChordTypes = new Set();

progressions.forEach(progression => {
  let chordTypes = progression
    // Only filter the chords symbols
    .replaceAll(/['\[\],]/g, "")
    // Remove the flat or sharp roots
    .replaceAll(/[A-G][b#]/g, "")
    // Remove the other roots and non-chord
    .replaceAll(/[A-G~]/g, "")
    // Remove slash chord notation
    .replaceAll(/\//g, "")
    // Split into array and get unique values
    .split(" ");
  
  // Get unique values
  chordTypes = new Set(chordTypes);
  uniqueChordTypes = new Set([...uniqueChordTypes, ...chordTypes]);
});

// Unique scrapped chord types
console.table(uniqueChordTypes);

// Save JSON file
fs.writeFileSync(
  './chord-types/unique-chord-types.json', 
  JSON.stringify([...uniqueChordTypes])
);
