// Trigger respective action when pressing
// space after "tabbing" specific icons
$(function() {
  ["play", "stop"].forEach(action => {
    document.querySelector(".fa-" + action)
      .addEventListener("keydown", 
        function(event) {
          if (event.key === ' ') globalThis[action+"-chords"].click();
        }
      );
  });
});

$(function() {
  document.getElementById("stop-chords")
    .addEventListener("click", () => clearTimeout(globalThis.looping));

  document.getElementById("play-chords")
    .addEventListener("click", function () {
      // Get current chord progression
      let progressionString = 
        globalThis.scrappedProgressions[
          Object.keys(globalThis.scrappedProgressions)[
            parseInt(globalThis["jazzStandards"].value-1)
          ]
        ]

      let progression = getProgressionBars(progressionString);

      globalThis.musicData.chordsInverseTimePerBar = progression.map(
        function(barString) {
          const numChords = barString.split(" ").length;
          return Array(numChords).fill(numChords);
        }
      ).flat(1);
    
      // Remove "playing" class from all relevant HTML elements
      Array.from(document.querySelectorAll(".playing"))
        .forEach(e => e.classList.remove("playing"));
      
      globalThis.currentChord = 0;
      const numberOfNotesRows = globalThis["add-row-of-notes"].valueAsNumber;
      
      // Time (ms) between consecutive music bars
      globalThis.chordsDelay = 
        // Convert to miliseconds
        1000 * 
        // Length of one beat
        ((globalThis["tempo"].valueAsNumber / 60) ** (-1))
        // Times the number of beats per bar 
        // (Assume a 4/4 time signature)
        * 4;

      let routine = (loop, limit, current) => {
        globalThis.playChords(current, numberOfNotesRows);
        if (current < limit) {
          current++;
          const idealWaitingTime = globalThis.chordsDelay / 
            globalThis.musicData.chordsInverseTimePerBar[
              (current - 1) % numberOfNotesRows
            ];

          // 110 ms seems best for arbitrary bpm
          const lagFixingValue = 110;
          if (globalThis.currentChord === 
            numberOfNotesRows - 1
          ) {
            globalThis.looping = setTimeout(loop, 
              idealWaitingTime - lagFixingValue,
              loop, limit, current
            )
          } else {
            globalThis.looping = setTimeout(loop,
              idealWaitingTime, 
              loop, limit, current
            );
          }
        } else {
          // globalThis["stop-chords"].click();
          // globalThis["play-chords"].click();
          console.log("Done");
        }
      };

      // Start toggle of notes of rows "playing" status
      globalThis.looping = setTimeout(
        routine, 
        globalThis.chordsDelay, 
        routine, 
        Infinity,
        0
      );
    });
});

// Repeat every globalThis.chordsDelay number of seconds
// Start updating which notes row is "playing"
function playChords(row, numberOfNotesRows) {
  globalThis.currentChord = row;
  globalThis.currentChord = globalThis.currentChord %
    numberOfNotesRows;

  // Style row of notes whose chord is being played
  const notesRows = Array.from(
    document.querySelectorAll("#rows-container .notes-row")
  );
  
  notesRows[globalThis.currentChord].classList.add("playing");
  if (notesRows.length > 1) {
    notesRows.at(globalThis.currentChord - 1).classList.remove("playing");
  }

  // Hide all but some number (5) of notes rows,
  // to avoid using the lag inducing .scrollBy method.
  const numRowsToShow = Math.min(5, numberOfNotesRows);

  if (globalThis.currentChord > 0) {
    if (globalThis.currentChord <=
      numberOfNotesRows - numRowsToShow
    ) {
      [
        globalThis.currentChord - 1, 
        globalThis.currentChord + numRowsToShow - 1
      ].forEach(
        rowIndex => hideShowRow(notesRows[rowIndex])
      );
    }
  } else {
    // When song starts playing (row 0),
    // hide all but the first numRowsToShow row
    notesRows.slice(0, numRowsToShow).forEach(
      rowIndex => rowIndex.style.display = "flex"
    );
    notesRows.slice(numRowsToShow).forEach(
      rowIndex => rowIndex.style.display = "none"
    );
  }
}

// Change display of notes row
function hideShowRow(rowElement) {
  if (
    getComputedStyle(rowElement).display !== "none"
  ) {
    rowElement.style.display = "none"
  } else {
    rowElement.style.display = "flex";
  }
}
