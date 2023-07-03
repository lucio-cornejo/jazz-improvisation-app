$(function() {
  document.querySelector("#code-text")
    .addEventListener("input", function () {
      const strudelProgression = globalThis["code-text"].value;
      globalThis.musicData.progressionString = strudelProgression;

      const extractedChords  = strudelProgression
        .replaceAll(/[\[\]]/g, "")
        .replaceAll(/\n/g, " ")
        // User may have added extra spaces 
        .replaceAll(/[\s]+/g, " ")
        .split(" ");

      updateMusicDataAndChordContainers(extractedChords);
    });
})
