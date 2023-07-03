$(function() {
  /* Toggle between musical degrees and note names */
  document.querySelector("#toggle-scale-degrees")
    .addEventListener("click", () => {
      // Update value for such button's toggle
      const toggleScaleDegrees = document.querySelector("#toggle-scale-degrees");
      toggleScaleDegrees.setAttribute(
        "toggle",
        ((parseInt(toggleScaleDegrees.getAttribute("toggle")) + 1) % 2).toString()
      );
      
      // Toggle between notes or degrees
      toggleDegreesAndNotes();
    }
  );
});

function toggleDegreesAndNotes() {
  const toggleValue = parseInt(
    document.querySelector("#toggle-scale-degrees").getAttribute("toggle")
  );
  
  if (toggleValue > 0) {
    // For every row of notes
    for (let row=0; row<window.musicData.scalesRoots.length; row++) {
      // Get note cells of row of notes to update
      const notesOfSelectedRow = Array.from(
        document.querySelectorAll("#rows-container .notes-row")
          [row].children
      );
      // Ignore chord cell in row of notes
      notesOfSelectedRow.shift();

      const root = window.musicData.scalesRoots[row];
      
      notesOfSelectedRow.forEach( (note, index) => {
        // Reset previous degree
        const degree = getDegree(root, index);
        
        if (note.classList.contains("out-of-key")) {
          note.classList = ["note"];
          note.classList.add("out-of-key");
        } else {
          note.classList = ["note"];
        }
        
        // Add class to note, based on its musical degree
        note.classList.add("degree-" + degree);

        // Change note text to its scale degree
        note.innerText = degree;

      });
    }
  } else {
    // For every row of notes
    for (let row=0; row<window.musicData.scalesRoots.length; row++) {
      // Get note cells of row of notes to update
      const notesOfSelectedRow = Array.from(
        document.querySelectorAll("#rows-container .notes-row")
          [row].children
      );
      // Ignore chord cell in row of notes
      notesOfSelectedRow.shift();
      
      // Convert pitch class to note "name"
      const notes = [
        'C', 'Db', 'D', 'Eb',
        'E', 'F', 'Gb', 'G',
        'Ab', 'A', 'Bb', 'B'
      ];

      notesOfSelectedRow.forEach( (note, index) => {
        note.innerText = notes[index % 12];
      });
    }
  }
}

// Section for toggling scale degrees to every row of notes
function getDegree(root, nonRoot) {
  // Transform distance to integer in [0; 11]
  let interval = (nonRoot - root) % 12;
  if (interval < 0) { interval += 12; }

  // Transform interval to its possibly best
  // candidate in scale degree form 
  // (possible issue with #4 and b5 case)
  // (also with Lydian #2 scale)
  if ([...Array(12).keys()].includes(interval)) {
    const mapDegree = {
      0: "1", 1: "b2", 2: "2",
      3: "b3", 4: "3", 5: "4",
      6: "b5", 7: "5", 8: "b6",
      9: "6", 10: "b7", 11: "7"
    };
    return mapDegree[interval];
  }
  return "error";
}
