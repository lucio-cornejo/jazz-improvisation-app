  $(function() {
    /* 
      Update notes selected when scale's root changes 
    */
      Shiny.addCustomMessageHandler(type = 'scale-root',
        function (message) {
        // Was any chord cell selected?
        if (document.querySelector(".chord.selected")) {
          // Get (child) index of every selected chord
          const selectedChordsContainer = Array.from(
            document.querySelectorAll(".chord.selected")
          ).map(chord => chord.parentElement);

          const rowsOfNotes = Array.from(
            selectedChordsContainer[0].parentElement.children
          );

          for (const selectedRow of selectedChordsContainer) {
            const rowIndex = rowsOfNotes.indexOf(selectedRow);
            if (rowIndex >= 0) { updateNotesSelected(rowIndex) }
          }
        } else {
          // Get index for row of cells to update
          const rowIndex = document.getElementById("row-of-notes").valueAsNumber - 1;
          updateNotesSelected(rowIndex);
        }

        // Toggle twice to update notes or degrees
        toggleDegreesAndNotes();
        toggleDegreesAndNotes();
      });

    /*
      Get data from scale selection dropdown
    */
    let scales = Array.from(document.querySelectorAll(
      "#scales + ul.dropdown-menu ul.dropdown-menu li"
    ));
    // scales = scales.map(e => e.parentElement);
    scales.forEach(scale => {
      scale.addEventListener("click", function () {
        globalThis.scaleSelected = this.innerText;
        
        // Was any chord cell selected?
        if (document.querySelector(".chord.selected")) {
          // Get (child) index of every selected chord
          const selectedChordsContainer = Array.from(
            document.querySelectorAll(".chord.selected")
          ).map(chord => chord.parentElement);

          const rowsOfNotes = Array.from(
            selectedChordsContainer[0].parentElement.children
          );

          for (const selectedRow of selectedChordsContainer) {
            const rowIndex = rowsOfNotes.indexOf(selectedRow);
            if (rowIndex >= 0) { updateNotesSelected(rowIndex) }
          }
        } else {
          // Get index for row of cells to update
          const rowIndex = document.getElementById("row-of-notes").value - 1;
          updateNotesSelected(rowIndex);
        }
        
        // Toggle twice to update notes or degrees
        toggleDegreesAndNotes();
        toggleDegreesAndNotes();
      })
    });

    /*
      Get data from voicing selection dropdown
    */
    let voicings = Array.from(document.querySelectorAll(
      "#chords span.voicing-selection"
    ));
    voicings = voicings.map(e => e.parentElement);
    voicings.forEach(voicing => {
      voicing.addEventListener("click", function () {
        // Get the intervals of the selected voicing
        const selectedVoicingIntervals = 
          voicingIntervals(this.firstElementChild.innerText);

        // Get selected scale root's pitch class
        const root = [
          "C", "Db", "D", "Eb",
          "E", "F", "Gb", "G",
          "Ab", "A", "Bb", "B"
        ][parseInt(
          document.querySelector("#scale-root").value
        )];

      /*
        // Get the checkboxes for the chord's notes
        const checkBoxes = Array.from(
          document.querySelectorAll("#chords-notes input[type='checkbox']")
        );
        // Get the first instance where there is a pitch class
        // equivalency betwwen the root and the note in the
        // related to a checkbox
        const firstPitchInstance = checkBoxes
          .map(e => e.name.slice(0, -1)).indexOf(root);

        // Uncheck all boxes and click on the appropriate ones
        checkBoxes.forEach( (box, index) => {
          // Uncheck all boxes
          box.checked = false;

          // Click boxes according to the chord's voicing
          if (index === firstPitchInstance) {
            box.click();

            // Uset setTimeout so that the multiple clicks occur
            for (let i=0; i<selectedVoicingIntervals.length; i++) {
              setTimeout(function() {
                const note = (index + selectedVoicingIntervals[i]) % checkBoxes.length;
                checkBoxes[note].click();
              }, 10 * (i+1))
            }
          }
        });
      */
      });
    });
});

/* 
  Get intervals of scale selected
*/
function scaleIntervals(scaleName) {
  scaleName = scaleName.toLowerCase();

  // Check if selected scale is in this app's list of scales
  for (const modeType of Object.keys(globalThis.scalesIntervals)) {
    for (const modeName of Object.keys(globalThis.scalesIntervals[modeType])) {
      if (modeName === scaleName) {
        return globalThis.scalesIntervals[modeType][modeName];
      }
    }
  }
  // Error message
  alert("Scale selected is not available in this app");
  return;
}

/*
  Get intervals of voicing selected
*/
function voicingIntervals(voicing) {
  // Check if selected voicing is in this app's list of scales
  for (const chordType of Object.keys(globalThis.chordsIntervals)) {
    for (const chordName of Object.keys(globalThis.chordsIntervals[chordType])) {
      for (const chordVoicing of Object.keys(globalThis.chordsIntervals[chordType][chordName])) {
        if (chordVoicing === voicing) {
          return globalThis.chordsIntervals[chordType][chordName][chordVoicing];
        }
      }
    }
  }
  // Error message
  alert("Voicing selected is not available in this app");
  return;
}
function updateNotesSelected(rowIndex) {
  /* 
    Update globalThis.musicData object based on the
    web page's manually defined user settings
  */
  // Get note cells of row of notes to update
  let notesOfSelectedRow = Array.from(
    document.querySelectorAll("#rows-container .notes-row")
      [rowIndex].children
  );

  /* Update root of chord in respective notes row */
  const selectedRoot = document.querySelector("#scale-root > option").innerText;
  const rowChord = notesOfSelectedRow[0].innerText;
  notesOfSelectedRow[0].innerText =
    rowChord
      .replace(extractRoot(rowChord), selectedRoot);

  /* Update root of respective chord in Strudel progression text */
  const StrudelChordsText = globalThis["code-text"]
    .value
    .replaceAll(/[\s]+/g, " ")
    .split(" ");
  // Update root of chord
  StrudelChordsText[rowIndex] = StrudelChordsText[rowIndex]
    .replace(extractRoot(StrudelChordsText[rowIndex]), selectedRoot);
  // Update Strudel progression
  globalThis["code-text"].value = StrudelChordsText.join(" ");

  /* Update note cells */
  // Drop chord
  notesOfSelectedRow.shift();
  notesOfSelectedRow.forEach(note => note.classList.add("out-of-key"));
  
  const root = parseInt(document.getElementById("scale-root").value);

  let intervals;
  if (!globalThis.scaleSelected) {
    // Use scale set by guessing the one from the chord
    intervals = globalThis.musicData.scalesNotes[rowIndex]
      // Make sure each interval is non negative
      .map(note => ((note - globalThis.musicData.scalesRoots[rowIndex])%12 + 12)%12);
  } else {
    // Use scale selecte by user
    intervals = scaleIntervals(globalThis.scaleSelected);
  }
  
  const notesSelected = intervals.map(interval => (root + interval) % 12);
  // Add scale roots and intervals to main data
  globalThis.musicData.scalesNotes[rowIndex] = [...notesSelected];
  globalThis.musicData.scalesRoots[rowIndex] = root;
  
  // Add root to scale
  notesSelected.unshift(root);

  for (let octave=0; octave<5; octave++) {
    notesSelected.forEach(note => {
      notesOfSelectedRow[
        (note + (12*octave)) % notesOfSelectedRow.length
      ].classList.remove("out-of-key");
    })
  }
}
