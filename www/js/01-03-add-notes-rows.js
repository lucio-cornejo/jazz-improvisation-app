/* Update number of rows of notes */
function updateNumberOfRows() {
  const selectedNumberOfRows = parseInt(
    document.getElementById("add-row-of-notes").value
  );
  
  const rowsContainer = document.getElementById("rows-container");
  const currentNumberOfRows = rowsContainer.childElementCount;
  
  if (selectedNumberOfRows === currentNumberOfRows) { return; }
  if (selectedNumberOfRows > currentNumberOfRows) { 
    // Add new rows
    for(let i=0; i<selectedNumberOfRows-currentNumberOfRows ; i++) {
      const newRow = rowsContainer.lastElementChild.cloneNode(true);

      // Set default values for row of notes
      newRow.classList.remove("playing");
      Array.from(newRow.children).forEach(
        element => element.classList.remove("out-of-key")
      );

      // Add row of notes to container
      rowsContainer.appendChild(newRow);
    }
  } else {
    // Remove any extra row(s)
    for(let i=0; i<currentNumberOfRows-selectedNumberOfRows ; i++) {
      rowsContainer.removeChild(rowsContainer.lastElementChild);
    }
  }

  // Update max value for "row of notes" input
  document.getElementById("row-of-notes").max = rowsContainer.children.length;
}

/* Create new rows of notes */
$(function () {
  document.querySelector("#add-row-of-notes").addEventListener(
    "input", 
    function (event) {
      if (event.originalEvent) { return; }

      window.updateNumberOfRows();
      
      // Update value in numeric input and its maximum
      const rowsContainer = document.getElementById("rows-container");
      const rowOfNotes = document.getElementById("row-of-notes");
      rowOfNotes.max = rowsContainer.children.length;
      rowOfNotes.value = rowsContainer.children.length;
    }
  );    
});
