function updateNotesRowsFromMusicData() {
  // Update rows of notes in user interface
  const addRowOfNotes = document.getElementById('add-row-of-notes');
  addRowOfNotes.value = globalThis.musicData.chords.length;
  addRowOfNotes.dispatchEvent(new Event('input', { bubbles: false }));
  
  globalThis.updateNumberOfRows();

  /* Color the appropiate notes in each row */
  // For every row of notes
  for (let row = 0; row < globalThis.musicData.scalesRoots.length; row++) {
    // Get note cells of row of notes to update
    const notesOfSelectedRow = globalThis["rows-container"]
      .children[row].querySelectorAll(".note");
    
    // Uncolor all notes in this row
    notesOfSelectedRow.forEach(note => {
      note.classList.add("out-of-key");
    });
    
    const root = globalThis.musicData.scalesRoots[row];
    // Deal with "no chord" case 
    if (isNaN(root)) { continue; }

    const notesSelected = [root].concat(
      globalThis.musicData.scalesNotes[row]
    );

    // Only color the scale's notes, accross all octaves
    /* 
      We assume that the notes in each row are
      integer (full) repetitions of "C Db ... Bb B"
    */
    const numOctaves = globalThis["rows-container"]
      .firstElementChild
      .querySelectorAll(".note")
      .length / 12;

    for (let octave = 0; octave < numOctaves; octave++) {
      notesSelected.forEach( note => {
        notesOfSelectedRow[
          (note + (12*octave))
        ].classList.remove("out-of-key");
      })
    }
  }

  // Refresh notes rows
  const toggleScaleDegrees = document.querySelector("#toggle-scale-degrees");
  toggleScaleDegrees.click();
  toggleScaleDegrees.click();
}
