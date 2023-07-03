$(function () {
  /* Toggle display of color inputs for musical degrees */
  $('#toggle-degree-colors-palette').on('click', function() {
    // Update value for such button's toggle
    const togglePalettes = $("#toggle-degree-colors-palette")[0];
    togglePalettes.setAttribute(
      "toggle",
      (parseInt(togglePalettes.getAttribute("toggle") + 1) % 2).toString()
    );
    
    // Toggle display
    const palettesContainer = $("#degree-colors")[0].parentElement.parentElement;
    if (palettesContainer.style.display === "") {
      palettesContainer.style.display = "block";
    } else {
      palettesContainer.style.display = "";
    }
  });

  /* Let user choose color for musical degrees */
  Array.from(document.querySelectorAll("#degree-colors input"))
  .forEach(degreeColor => {
    degreeColor.addEventListener("input", 
      function() {
        document.documentElement.style.setProperty(
          "--" + this.id,
          document.getElementById(this.id).value
        );
      }
    )
  });
});
