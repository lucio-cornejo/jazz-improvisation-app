document.addEventListener("click", function(event) {
  /*
    Add interactivy to every chord cell in rows of notes
  */
  if (event.target.classList.contains("chord")) {
    // Toggle class of chord cell
    event.target.classList.toggle("selected");

    /* 
      Change value in "row of notes" to modify,
      in order to change the selected row
    */
    const selectedChordsContainer = event.target.parentElement;
    const rowsOfNotes = Array.from(
      selectedChordsContainer.parentElement.children
    );

    const rowIndex = rowsOfNotes.indexOf(selectedChordsContainer);
    if (rowIndex >= 0) { 
      document.getElementById("row-of-notes").value = rowIndex + 1;
    }
  }
});
