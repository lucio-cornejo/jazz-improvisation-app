function updateMusicDataAndChordContainers(newChords) {
  globalThis.musicData.chords = newChords;

  globalThis.musicData.scalesRoots = newChords
    .map(chord => globalThis.pitchClasses[extractRoot(chord)]);

  // Update the scales of globalThis.musicData simply
  // as the notes which define the chords
  globalThis.musicData.scalesNotes = newChords.map(
    guessScaleIntervalsFromChord
  );
  
  globalThis.updateNotesRowsFromMusicData();
  
  /*
    Display chord progression of selected jazz standard
  */
  const chordsContainers = Array.from(
    document.querySelectorAll("#rows-container .chord")
  );
  
  chordsContainers.forEach(
    // We assume equal number of chords containers
    // and elements in the chord progression
    // array from scrappedProgressions
    (container, index) => {
      // Write chord in row
      container.innerText = newChords[index];
      // Undo possible display property change
      // due to play and stop buttons
      container.parentElement.style.display = "flex";
    }
  );
}

function guessScaleIntervalsFromChord(chord) {
  const scaleGuess = 
  // Let's assume ionian
  chord.includes("^") 
  ? "ionian"
  // Let's assume dorian
  : chord.includes("m") && !chord.includes("m7b5")
  ? "dorian"
  // Let's assume locrian
  : chord.includes("m7b5")
  ? "locrian"
  // "no chord" case
  : chord.includes("~")
  ? "no-chord"
  // Let's assume mixolydian
  : "mixolydian"

  const intervals = scaleGuess === "no-chord"
    ? [NaN]
    : scaleIntervals(scaleGuess);

  const root = globalThis.pitchClasses[extractRoot(chord)];
    
  return intervals.map(interval => 
    isNaN(root) ? root : (root + interval) % 12
  );
}

globalThis.pitchClasses = {
  "~": NaN,
  "B#": 0+0, "C": 0, "Db": 2-1,
  "C#": 0+1, "D": 2, "Eb": 4-1,
  "D#": 2+1, "E": 4, "Fb": 5-1,
  "E#": 4+1, "F": 5, "Gb": 7-1,
  "F#": 5+1, "G": 7, "Ab": 9-1,
  "G#": 7+1, "A": 9, "Bb":  11-1,
  "A#": 9+11, "B": 11, "Cb": 11-0
}

// Get roots of the chords 
function extractRoot(chordString) {
  return chordString
    .slice(0, 2)
    .replaceAll(/[^A-G#b~]/g, "");
}

// Convert the string of bars in the values
// of the globalThis.scrappedProgressions object,
// into an array whose elements are each
// bar in the song's progression, as a string.
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

// Convert an array of pitch class values into a trivial
// but potential 'good enough sounding' chord voicing
function pitchClassToNote(pitchesArray) {
  // Convert array to increasing sequence
  for (let i = 1; i < pitchesArray.length; i++) {
    while (pitchesArray[i] < pitchesArray[i-1]) {
      pitchesArray[i] += 12;
    }
  }
  // Convert notes' numbers to note form like C3
  return pitchesArray.map(
    pseudoPitchClass => globalThis.availableNotes[pseudoPitchClass]
  );
}

// Set the chords from a jazz standard selected
Shiny.addCustomMessageHandler(
  type = 'selectJazzStandard',
  function (message) {
    // Use try only due to this message being
    // sent when the Shiny app starts
    /*
      Retrieve pitch class data from selected jazz standard
    */
    const progressionString = globalThis.scrappedProgressions[
      Object.keys(globalThis.scrappedProgressions)[
        parseInt(globalThis["jazzStandards"].value - 1)
      ]
    ]
      // Change chord notation for Strudel to recognize
      .replaceAll("j", "^")    // major
      .replaceAll("-", "m")    // minor
      .replaceAll("+", "aug")  // augmented
      .replaceAll("9b", "b9")  // flat nine (tension)

    // Transform string in the form of Array, to an Array
    let progression = progressionString.replace(/'/g, '"');
    progression = JSON.parse(progression);

    // Convert such array into the text for textarea
    progression = progression.map(
      section => section.reduce((a, b) => a+' '+b)
    );
    progression = progression.reduce((a, b) => a+'\n'+b);

    globalThis["code-text"].value = progression;

    /*
      Retrieve pitch class data from selected jazz standard.
      (still not doing that, only chords so far)
    */

    // Convert chord progression text into an array whose
    // elements are each chord in the chord progression
    const newChords = getProgressionBars(progressionString)
      .map(bar => bar.split(" "))
      .flat(1);

    updateMusicDataAndChordContainers(newChords);
  }
);
