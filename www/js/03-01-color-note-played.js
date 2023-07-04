function pitchDistCents(pitch1, pitch2) {
  return 1200 * Math.log2(pitch2 / pitch1);
}

// Retun the indices of the notes to hide or show
// due to being close to the played note, in 
// order to avoid lag cause by .scroll methods.
function notesNearPlayed(noteIndex) {
  // How many notes to show per row
  // should depend on how many notes were
  // visible at the start of the app.

  // However, such calculation may involve
  // using laggy methods, such as 
  // .getBoundingClientRect.

  // Therefore, a range of the form
  // [index - delta; index + delta]
  // will be established to set which
  // notes to hide or show.
  window.delta = 10;
  const numNotes = document.querySelectorAll(
    "#rows-container .notes-row:first-child .note"
  ).length;

  // Central note
  if (
    noteIndex >= window.delta && 
    noteIndex + window.delta <= numNotes -1
  ) {
    // Only show notes with index in
    // [noteIndex - delta; noteIndex + delta]
    return Array.from(
      Array(noteIndex + window.delta + 1).keys()
    ).slice(noteIndex - window.delta);
  } else if (noteIndex < window.delta) {
    // Only show notes with index in
    // [0; 2 * delta]
    return [...Array(2*window.delta + 1).keys()];
  } else {
    // Only show notes with index in
    // [numNotes - 2*delta - 1; numNotes - 1]
    return [...Array(numNotes).keys()]
      .slice(numNotes - 2*window.delta - 1);
  }
}

function colorNotePlayed() {
  // const filteredHistory = window.history
    // .filter(window.matchesConditions);

  // if (filteredHistory.length == 0) return;

  // let [lastPitch, lastClarityPercent] = filteredHistory.at(-1);
  // lastPitch = Math.round(lastPitch * 10) / 10;
  // lastClarityPercent = Math.round(lastClarityPercent * 1000) / 10;
  let lastPitch = window.freqHistory.at(-1);

  /*
    C2: 65.4 Hz  (lowest note in rows of notes)
  */
 // Assumme this pitch offset is positive
  let pitchOffset = window.pitchDistCents(65.4, lastPitch)  
  const notePosition = Math.round(pitchOffset / 100);

  // Check if there are enough notes in row of notes,
  // to color the appropriate cell for note played
  if (
    notePosition > 
    Array.from(document.querySelectorAll(
      "#rows-container .notes-row:first-child .note"
    )).length
  ) { return; }

  // Update array where the pitchOffset is stored
  Shiny.setInputValue(
    "pitchOffsets", 
    [].concat(
      Shiny.shinyapp.$inputValues.pitchOffsets,
      pitchOffset
    )
  );

  // Set to value in [0, 100] for CSS relevant variable
  pitchOffset = pitchOffset % 100;

  let notePlaying;
  try {
    // Get notes in 'row of notes' whose chord is currently being played
    notePlaying = Array.from(
      document.querySelectorAll("#rows-container .notes-row.playing .note")
    );
  } catch(error) {
    // Due to global removal of .playing class,
    // because "play-chords" was clicked,
    // assume that the first 'row of notes' has class "playing"
    notePlaying = Array.from(
      document.querySelectorAll(
        "#rows-container .notes-row:first-child .note"
      )
    );
  }
  
  // Reset note cell that was highlighted due to pitch detection
  try {
    Array.from(
      document.querySelectorAll("#rows-container .note.playing")
    ).forEach(noteCell => noteCell.classList.remove("playing"));
  } catch (error) {
    console.log(error)
  }

  notePlaying = notePlaying[notePosition];
  notePlaying.classList.add("playing");

  // Draw pitch offset line in note being played
  document.documentElement.style.setProperty(
    "--pitch-offset", String(pitchOffset) + '%'
  );

  // Hide and show some note cells to simulate 
  // horizontal scrolling, only if the last two
  // notes registered are far apart (semitones) enough.
  const semitonesDiff = 0.01 * Math.abs(
    Shiny.shinyapp.$inputValues.pitchOffsets.at(-2)
    - Shiny.shinyapp.$inputValues.pitchOffsets.at(-1)
  );

  // Fail due to not comparing the notes far apart
  // enough, but when they are veeery close, due to
  // how frequent the pitches get registered.

  /*
  // if (semitonesDiff > window.delta / 2) {
    const indexOfNotesToShow = notesNearPlayed(notePosition);

    document.querySelectorAll("#rows-container .notes-row")
      .forEach(notesRow => {
        notesRow.querySelectorAll(".note").forEach(
          (noteCell, noteIndex) => {
            noteCell.style.display = 
              indexOfNotesToShow.includes(noteIndex)
              ? "flex" : "none";
          }
        )
      });
  // }
  */

  
  // /*
  notePlaying.scrollIntoViewIfNeeded();
  // notePlaying.scrollIntoView( {block: "center", inline: "center"} );
  // notePlaying.scrollIntoView( {block: "center"} );

  const currentScroll = notePlaying.parentElement.scrollLeft;
  Array.from(document.getElementById("rows-container").children)
    .forEach(row => { row.scrollTo({ left: currentScroll }) });
  // */
}
